import { NextRequest, NextResponse } from "next/server";

import { withApiHandler } from "@/services/api-handler";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";
import { ContactEnquirySchema } from "@/validators/leads";

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

  const body = ContactEnquirySchema.parse(await req.json());

  const lead = await prisma.$transaction(async (tx) => {
    const created = await tx.lead.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone,
        source: "CONTACT_ENQUIRY",
        status: "NEW",
      },
    });

    await tx.contactEnquiry.create({
      data: {
        leadId: created.id,
        subject: body.subject,
        message: body.message,
      },
    });

    return created;
  });

  return NextResponse.json(
    {
      success: true,
      data: { leadId: lead.id, message: "Message received. We will get back to you shortly." },
    },
    { status: 201 },
  );
});
