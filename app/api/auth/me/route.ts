import { NextRequest } from "next/server";

import { withApiHandler } from "@/services/api-handler";
import { prisma } from "@/lib/db";
import { ApiError } from "@/services/api-errors";

export async function GET(request: NextRequest) {
  return withApiHandler(async () => {
    const token = request.cookies.get("sviet_session")?.value;

    if (!token) {
      throw new ApiError(401, "Authentication required.", "UNAUTHENTICATED");
    }

    const session = await prisma.authSession.findUnique({
      where: { token },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            role: true,
            status: true,
          },
        },
      },
    });

    if (!session) {
      throw new ApiError(401, "Authentication required.", "UNAUTHENTICATED");
    }

    if (session.expiresAt.getTime() < Date.now()) {
      await prisma.authSession.delete({ where: { id: session.id } }).catch(() => undefined);
      throw new ApiError(401, "Authentication required.", "UNAUTHENTICATED");
    }

    return {
      user: session.user,
    };
  });
}
