import "server-only";

import { prisma } from "@/lib/prisma";
import type { CreateAnnouncementInput } from "@/lib/validation/cms";
import { safeRead } from "@/lib/dal/safe-read";

export async function listPublishedBlogPosts(limit?: number) {
  return safeRead(
    () =>
      prisma.blogPost.findMany({
        where: { status: "PUBLISHED" },
        orderBy: { publishedAt: "desc" },
        take: limit,
      }),
    [],
  );
}

export async function listActiveAnnouncements(limit?: number) {
  const now = new Date();

  return safeRead(
    () =>
      prisma.announcement.findMany({
        where: {
          publishFrom: { lte: now },
          OR: [{ publishTo: null }, { publishTo: { gte: now } }],
        },
        orderBy: [{ pinned: "desc" }, { publishFrom: "desc" }],
        take: limit,
      }),
    [],
  );
}

export async function createAnnouncement(data: CreateAnnouncementInput) {
  return prisma.announcement.create({
    data: {
      title: data.title,
      body: data.body,
      level: data.level,
      pinned: data.pinned,
    },
  });
}
