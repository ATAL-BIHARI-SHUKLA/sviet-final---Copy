import { NextRequest } from "next/server";

import { prisma } from "@/lib/prisma";
import { withApiHandler } from "@/services/api-handler";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  return withApiHandler(async () => {
    const { slug } = await params;

    const event = await prisma.event.findUnique({
      where: { slug },
      include: { speakers: { orderBy: { displayOrder: "asc" } } },
    });

    if (!event) {
      throw Object.assign(new Error("Event not found"), { status: 404 });
    }

    return event;
  });
}
