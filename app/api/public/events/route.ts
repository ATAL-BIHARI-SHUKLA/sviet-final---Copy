import { NextRequest } from "next/server";

import { dedupeEvents } from "@/lib/dal/events";
import { prisma } from "@/lib/prisma";
import { withApiHandler } from "@/services/api-handler";

export async function GET(request: NextRequest) {
  return withApiHandler(async () => {
    const params = request.nextUrl.searchParams;
    const featured = params.get("featured");
    const take = Math.min(Number(params.get("take") ?? "50"), 100);

    const events = await prisma.event.findMany({
      where: featured === "true" ? { isFeatured: true } : undefined,
      orderBy: [{ startDate: "desc" }, { createdAt: "desc" }],
      take,
      include: {
        speakers: { orderBy: { displayOrder: "asc" } },
      },
    });

    return dedupeEvents(events);
  });
}
