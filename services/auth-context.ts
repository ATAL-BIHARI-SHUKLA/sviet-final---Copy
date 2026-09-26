import "server-only";

import type { NextRequest } from "next/server";

import { prisma } from "@/lib/db";
import { ApiError } from "@/services/api-errors";

type AuthenticatedUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "APPLICANT" | "COUNSELOR" | "ADMIN" | "SUPER_ADMIN";
  status: "ACTIVE" | "INVITED" | "SUSPENDED";
};

export async function getAuthUserFromRequest(request: NextRequest): Promise<AuthenticatedUser | null> {
  const token = request.cookies.get("sviet_session")?.value;

  if (!token) {
    return null;
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
    return null;
  }

  if (session.expiresAt.getTime() < Date.now()) {
    await prisma.authSession.delete({ where: { id: session.id } }).catch(() => undefined);
    return null;
  }

  return session.user;
}

export async function requireAuthUser(request: NextRequest): Promise<AuthenticatedUser> {
  const user = await getAuthUserFromRequest(request);

  if (!user) {
    throw new ApiError(401, "Authentication required.", "UNAUTHENTICATED");
  }

  if (user.status !== "ACTIVE") {
    throw new ApiError(403, "Account is not active.", "ACCOUNT_INACTIVE");
  }

  return user;
}
