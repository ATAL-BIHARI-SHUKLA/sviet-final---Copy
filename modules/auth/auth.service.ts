import "server-only";

import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

import { prisma } from "@/lib/db";
import { ApiError } from "@/services/api-errors";
import { recordActivity } from "@/services/activity-log";

type BasicLoginInput = {
  email: string;
  password: string;
};

const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

function verifyPassword(password: string, passwordHash: string): boolean {
  const [scheme, saltHex, hashHex] = passwordHash.split("$");

  if (scheme !== "scrypt" || !saltHex || !hashHex) {
    return false;
  }

  const sourceHash = Buffer.from(hashHex, "hex");
  const computedHash = scryptSync(password, Buffer.from(saltHex, "hex"), sourceHash.length);

  return timingSafeEqual(sourceHash, computedHash);
}

export function makePasswordHash(password: string): string {
  const salt = randomBytes(16);
  const hash = scryptSync(password, salt, 64);
  return `scrypt$${salt.toString("hex")}$${hash.toString("hex")}`;
}

export async function loginWithPassword(input: BasicLoginInput) {
  const user = await prisma.user.findUnique({ where: { email: input.email } });

  if (!user || !user.passwordHash || !verifyPassword(input.password, user.passwordHash)) {
    throw new ApiError(401, "Invalid credentials.", "INVALID_CREDENTIALS");
  }

  if (user.status !== "ACTIVE") {
    throw new ApiError(403, "Account is not active.", "ACCOUNT_INACTIVE");
  }

  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS);

  await prisma.$transaction([
    prisma.authSession.create({
      data: {
        token,
        userId: user.id,
        expiresAt,
      },
    }),
    prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    }),
  ]);

  await recordActivity({
    actorType: "USER",
    actorUserId: user.id,
    entityType: "USER",
    entityId: user.id,
    action: "AUTH_LOGIN",
  });

  return {
    token,
    expiresAt,
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    },
  };
}

export async function logoutSessionByToken(token: string) {
  const deleted = await prisma.authSession.deleteMany({ where: { token } });
  return deleted.count > 0;
}
