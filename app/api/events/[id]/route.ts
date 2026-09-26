import { NextRequest } from "next/server";

import { assertHasRole } from "@/modules/auth/rbac";
import { prisma } from "@/lib/prisma";
import { withApiHandler } from "@/services/api-handler";
import { requireAuthUser } from "@/services/auth-context";
import { updateEventSchema } from "@/validators/admin-events";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  return withApiHandler(async () => {
    const user = await requireAuthUser(request);
    assertHasRole(user.role, ["ADMIN", "SUPER_ADMIN"]);

    const { id } = await params;
    const payload = updateEventSchema.parse(await request.json());

    const data = {
      ...(payload.title !== undefined ? { title: payload.title } : {}),
      ...(payload.slug !== undefined ? { slug: payload.slug } : {}),
      ...(payload.description !== undefined ? { description: payload.description } : {}),
      ...(payload.image !== undefined ? { image: payload.image } : {}),
      ...(payload.venue !== undefined ? { venue: payload.venue ?? null } : {}),
      ...(payload.images !== undefined ? { images: payload.images } : {}),
      ...(payload.driveGalleryUrl !== undefined ? { driveGalleryUrl: payload.driveGalleryUrl ?? null } : {}),
      ...(payload.startDate !== undefined ? { startDate: new Date(payload.startDate) } : {}),
      ...(payload.endDate !== undefined ? { endDate: payload.endDate ? new Date(payload.endDate) : null } : {}),
      ...(payload.category !== undefined ? { category: payload.category } : {}),
      ...(payload.isFeatured !== undefined ? { isFeatured: payload.isFeatured } : {}),
    };

    const event = await prisma.event.update({ where: { id }, data });

    if (payload.speakers !== undefined) {
      await prisma.eventSpeaker.deleteMany({ where: { eventId: id } });
      if (payload.speakers.length > 0) {
        await prisma.eventSpeaker.createMany({
          data: payload.speakers.map((s) => ({
            eventId: id,
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
    }

    return prisma.event.findUnique({
      where: { id },
      include: { speakers: { orderBy: { displayOrder: "asc" } } },
    });
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  return withApiHandler(async () => {
    const user = await requireAuthUser(request);
    assertHasRole(user.role, ["ADMIN", "SUPER_ADMIN"]);

    const { id } = await params;

    await prisma.event.delete({ where: { id } });

    return { deleted: true };
  });
}
