import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import { DbNull } from "../generated/prisma/internal/prismaNamespace";
import type { CourseLevel } from "../generated/prisma/enums";
import courseCatalog from "../data/courses.json";

const adapter = new PrismaPg({ connectionString: process.env.DIRECT_URL! });
const prisma = new PrismaClient({ adapter });

type NormalizedCourse = (typeof courseCatalog)[number];

async function seedDepartments(courses: NormalizedCourse[]) {
  const departments = new Map<string, { slug: string; name: string }>();

  for (const course of courses) {
    departments.set(course.department.slug, course.department);
  }

  for (const department of departments.values()) {
    await prisma.department.upsert({
      where: { slug: department.slug },
      update: { name: department.name, isActive: true },
      create: department,
    });
  }

  return new Map(
    (
      await prisma.department.findMany({
        where: { slug: { in: [...departments.keys()] } },
        select: { id: true, slug: true },
      })
    ).map((department) => [department.slug, department.id] as const),
  );
}

async function seedSpecializations(
  courses: NormalizedCourse[],
  departmentIdsBySlug: Map<string, string>,
) {
  const specializations = new Map<
    string,
    { slug: string; name: string; departmentSlug: string | null }
  >();

  for (const course of courses) {
    for (const specialization of course.specializations) {
      specializations.set(specialization.slug, {
        slug: specialization.slug,
        name: specialization.name,
        departmentSlug: course.department.slug,
      });
    }
  }

  for (const specialization of specializations.values()) {
    const departmentId = specialization.departmentSlug
      ? (departmentIdsBySlug.get(specialization.departmentSlug) ?? null)
      : null;

    await prisma.specialization.upsert({
      where: { slug: specialization.slug },
      update: { name: specialization.name, departmentId, isActive: true },
      create: {
        slug: specialization.slug,
        name: specialization.name,
        departmentId,
      },
    });
  }

  return new Map(
    (
      await prisma.specialization.findMany({
        where: { slug: { in: [...specializations.keys()] } },
        select: { id: true, slug: true },
      })
    ).map(
      (specialization) => [specialization.slug, specialization.id] as const,
    ),
  );
}

async function seedPrograms(
  courses: NormalizedCourse[],
  departmentIdsBySlug: Map<string, string>,
  specializationIdsBySlug: Map<string, string>,
) {
  for (const course of courses) {
    const departmentId =
      departmentIdsBySlug.get(course.department.slug) ?? null;

    const program = await prisma.program.upsert({
      where: { slug: course.slug },
      update: {
        title: course.title,
        shortDescription: course.shortDescription,
        departmentId,
        level: course.level as CourseLevel,
        mode: course.mode,
        fullDescription: course.fullDescription,
        highlights: course.highlights ?? DbNull,
        eligibility: course.eligibility,
        curriculum: course.curriculum ?? DbNull,
        outcomes: course.outcomes ?? DbNull,
        facilities: course.facilities ?? DbNull,
        faqs: course.faqs ?? DbNull,
        seoTitle: course.seoTitle,
        seoDescription: course.seoDescription,
        metadata: course.metadata ?? DbNull,
        isFeatured: course.isFeatured,
        durationMonths: course.durationMonths,
        tuitionCents: course.tuitionCents,
        isActive: true,
      },
      create: {
        slug: course.slug,
        title: course.title,
        shortDescription: course.shortDescription,
        departmentId,
        level: course.level as CourseLevel,
        mode: course.mode,
        fullDescription: course.fullDescription,
        highlights: course.highlights ?? DbNull,
        eligibility: course.eligibility,
        curriculum: course.curriculum ?? DbNull,
        outcomes: course.outcomes ?? DbNull,
        facilities: course.facilities ?? DbNull,
        faqs: course.faqs ?? DbNull,
        seoTitle: course.seoTitle,
        seoDescription: course.seoDescription,
        metadata: course.metadata ?? DbNull,
        isFeatured: course.isFeatured,
        durationMonths: course.durationMonths,
        tuitionCents: course.tuitionCents,
        isActive: true,
      },
    });

    await prisma.programSpecialization.deleteMany({
      where: { programId: program.id },
    });

    if (course.specializations.length > 0) {
      await prisma.programSpecialization.createMany({
        data: course.specializations.map((specialization, index) => {
          const specializationId = specializationIdsBySlug.get(
            specialization.slug,
          );

          if (!specializationId) {
            throw new Error(
              `Missing specialization seed for ${specialization.name}`,
            );
          }

          return {
            programId: program.id,
            specializationId,
            isPrimary: index === 0,
            sortOrder: index,
          };
        }),
      });
    }
  }
}

async function main() {
  const courses = courseCatalog as NormalizedCourse[];
  const departmentIdsBySlug = await seedDepartments(courses);
  const specializationIdsBySlug = await seedSpecializations(
    courses,
    departmentIdsBySlug,
  );

  await seedPrograms(courses, departmentIdsBySlug, specializationIdsBySlug);

  console.log(`Seeded ${courses.length} normalized programs.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
