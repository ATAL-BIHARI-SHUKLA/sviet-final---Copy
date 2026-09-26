import "server-only";

import { prisma } from "@/lib/prisma";
import type { CreateLeadInput } from "@/lib/validation/admissions";
import { safeRead } from "@/lib/dal/safe-read";

export async function listActivePrograms(limit?: number) {
  return safeRead(
    () =>
      prisma.program.findMany({
        where: { isActive: true },
        orderBy: { title: "asc" },
        take: limit,
      }),
    [],
  );
}

export async function createLead(data: CreateLeadInput) {
  const noteBody = data.notes?.trim();

  return prisma.lead.create({
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      source: data.source,
      notes: noteBody
        ? {
            create: {
              body: noteBody,
            },
          }
        : undefined,
      intendedProgramId:
        data.intendedProgramId && data.intendedProgramId.length > 0
          ? data.intendedProgramId
          : undefined,
    },
  });
}

export async function getAdmissionsFunnelCounts() {
  const [leads, applicants, enrolled] = await safeRead(
    () =>
      Promise.all([
        prisma.lead.count(),
        prisma.applicant.count({ where: { applicationStatus: { not: "DRAFT" } } }),
        prisma.enrollment.count(),
      ]),
    [0, 0, 0] as const,
  );

  return { leads, applicants, enrolled };
}
