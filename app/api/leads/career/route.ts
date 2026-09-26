import { NextRequest, NextResponse } from "next/server";

import { withApiHandler } from "@/services/api-handler";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";
import { uploadFileToDrive } from "@/lib/drive/upload";
import { sendCareerApplicationEmail } from "@/lib/mail/send";
import { CareerApplicationSchema } from "@/validators/leads";

function withPublicApiHandler(handler: (req: NextRequest) => Promise<Response>) {
  const wrapped = withApiHandler as unknown as (
    handler: () => Promise<Response>,
    options: { isPublic: boolean },
  ) => Promise<Response>;

  return (req: NextRequest) => wrapped(() => handler(req), { isPublic: true });
}

export const POST = withPublicApiHandler(async (req: NextRequest) => {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";
  const limit = rateLimit(`lead:${ip}`, 5, 60 * 60 * 1000);

  if (!limit.allowed) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "RATE_LIMITED",
          message: "Too many submissions. Please try again later.",
        },
      },
      {
        status: 429,
        headers: { "Retry-After": String(Math.ceil(limit.resetIn / 1000)) },
      },
    );
  }

  const body = CareerApplicationSchema.parse(await req.json());

  // Upload the resume to Drive first (outside the DB transaction) so a slow
  // upstream call never holds a database connection open.
  let resumeFileId: string | undefined;
  let resumeUrl: string | undefined;
  let resumeFileName: string | undefined;

  if (body.resume) {
    const uploaded = await uploadFileToDrive({
      fileName: body.resume.fileName,
      mimeType: body.resume.mimeType,
      fileBase64: body.resume.fileBase64,
    });
    resumeFileId = uploaded.fileId;
    resumeUrl = uploaded.viewUrl;
    resumeFileName = body.resume.fileName;
  }

  const lead = await prisma.$transaction(async (tx) => {
    const created = await tx.lead.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone,
        source: "CAREER_APPLICATION",
        status: "NEW",
      },
    });

    await tx.careerApplication.create({
      data: {
        leadId: created.id,
        position: body.position,
        qualifications: body.qualifications,
        yearsExperience: body.yearsExperience,
        coverLetter: body.coverLetter,
        resumeFileId,
        resumeUrl,
        resumeFileName,
      },
    });

    return created;
  });

  // Notify the careers inbox. Best-effort: a mail failure must not fail the
  // applicant's submission, which is already safely persisted above.
  try {
    await sendCareerApplicationEmail({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
      position: body.position,
      qualifications: body.qualifications,
      yearsExperience: body.yearsExperience,
      coverLetter: body.coverLetter,
      resumeFileId,
      resumeFileName,
    });
  } catch (err) {
    console.error("Failed to send career application notification email:", err);
  }

  return NextResponse.json(
    {
      success: true,
      data: {
        leadId: lead.id,
        message: "Application received. We will be in touch shortly.",
      },
    },
    { status: 201 },
  );
});
