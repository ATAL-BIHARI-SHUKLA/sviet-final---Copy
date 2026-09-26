import { NextRequest } from "next/server";

import { assertHasRole } from "@/modules/auth/rbac";
import { dedupeEvents } from "@/lib/dal/events";
import { prisma } from "@/lib/prisma";
import { getEventStatus } from "@/lib/events/status";
import { withApiHandler } from "@/services/api-handler";
import { requireAuthUser } from "@/services/auth-context";
import {
  createEventSchema,
  listEventsQuerySchema,
} from "@/validators/admin-events";

function toSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function GET(request: NextRequest) {
  return withApiHandler(async () => {
    const user = await requireAuthUser(request);
    assertHasRole(user.role, ["ADMIN", "SUPER_ADMIN"]);

    const query = Object.fromEntries(request.nextUrl.searchParams.entries());
    const { take, category } = listEventsQuerySchema.parse(query);

    const events = await prisma.event.findMany({
      where: category ? { category } : undefined,
      orderBy: [{ startDate: "desc" }, { createdAt: "desc" }],
      take,
      include: { speakers: { orderBy: { displayOrder: "asc" } } },
    });

    return dedupeEvents(events).map((event) => ({
      ...event,
      status: getEventStatus(event),
    }));
  });
}

export async function POST(request: NextRequest) {
  return withApiHandler(async () => {
    const user = await requireAuthUser(request);
    assertHasRole(user.role, ["ADMIN", "SUPER_ADMIN"]);

    const payload = createEventSchema.parse(await request.json());
    const slug = payload.slug ?? toSlug(payload.title);

    const event = await prisma.event.create({
      data: {
        slug,
        title: payload.title,
        description: payload.description,
        image: payload.image,
        venue: payload.venue ?? null,
        images: payload.images ?? [],
        driveGalleryUrl: payload.driveGalleryUrl ?? null,
        startDate: new Date(payload.startDate),
        endDate: payload.endDate ? new Date(payload.endDate) : null,
        category: payload.category,
        isFeatured: payload.isFeatured ?? false,
      },
    });

    if (payload.speakers && payload.speakers.length > 0) {
      await prisma.eventSpeaker.createMany({
        data: payload.speakers.map((s) => ({
          eventId: event.id,
          name: s.name,
          photo: s.photo ?? null,
          bio: s.bio ?? null,
          company: s.company ?? null,
          designation: s.designation ?? null,
          linkedin: s.linkedin ?? null,
          twitter: s.twitter ?? null,
          displayOrder: s.displayOrder ?? 0,
        })),
      });
    }

    return prisma.event.findUnique({
      where: { id: event.id },
      include: { speakers: { orderBy: { displayOrder: "asc" } } },
    });
  });
}
