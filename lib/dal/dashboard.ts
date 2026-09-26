import "server-only";

import { prisma } from "@/lib/prisma";
import { safeRead } from "@/lib/dal/safe-read";

export async function getAdminSnapshot() {
  const [leadCount, applicantCount, enrollmentCount, eventCount, blogCount] = await safeRead(
    () =>
      Promise.all([
        prisma.lead.count(),
        prisma.applicant.count(),
        prisma.enrollment.count(),
        prisma.event.count(),
        prisma.blogPost.count(),
      ]),
    [0, 0, 0, 0, 0] as const,
  );

  return {
    leadCount,
    applicantCount,
    enrollmentCount,
    eventCount,
    blogCount,
  };
}
