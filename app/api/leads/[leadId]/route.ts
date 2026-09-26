import { NextRequest } from "next/server";

import { withApiHandler } from "@/services/api-handler";
import { requireAuthUser } from "@/services/auth-context";
import { assertHasRole } from "@/modules/auth/rbac";
import { prisma } from "@/lib/db";
import { ApiError } from "@/services/api-errors";
import { updateLeadSchema } from "@/validators/leads";
import { deleteLead, updateLead } from "@/modules/leads/leads.service";

type RouteContext = {
  params: Promise<{ leadId: string }>;
};

export async function GET(request: NextRequest, context: RouteContext) {
  return withApiHandler(async () => {
    const user = await requireAuthUser(request);
    assertHasRole(user.role, ["COUNSELOR", "ADMIN", "SUPER_ADMIN"]);

    const { leadId } = await context.params;

    const lead = await prisma.lead.findUnique({
      where: { id: leadId },
      include: {
        intendedProgram: true,
        ownerCounselor: {
          select: { id: true, firstName: true, lastName: true, email: true, role: true },
        },
      },
    });

    if (!lead) {
      throw new ApiError(404, "Lead not found.", "NOT_FOUND");
    }

    return lead;
  });
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  return withApiHandler(async () => {
    const user = await requireAuthUser(request);
    assertHasRole(user.role, ["COUNSELOR", "ADMIN", "SUPER_ADMIN"]);

    const { leadId } = await context.params;
    const payload = updateLeadSchema.parse(await request.json());

    return updateLead(leadId, payload, user);
  });
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  return withApiHandler(async () => {
    const user = await requireAuthUser(request);
    assertHasRole(user.role, ["ADMIN", "SUPER_ADMIN"]);

    const { leadId } = await context.params;
    await deleteLead(leadId, user);

    return { deleted: true };
  });
}
