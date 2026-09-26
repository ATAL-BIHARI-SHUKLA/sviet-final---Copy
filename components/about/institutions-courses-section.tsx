"use client";

import { useMemo, useState } from "react";
import { FileText } from "lucide-react";

import { SectionHeader } from "@/components/about/section-header";
import { getCollegeAffiliations } from "@/lib/affiliationData";

type CourseLevel =
  | "UG"
  | "PG"
  | "DIPLOMA"
  | "VOCATIONAL"
  | "PROFESSIONAL"
  | "CERTIFICATE";

export type InstitutionCourse = {
  id: string;
  slug: string;
  title: string;
  durationMonths: number;
  level: CourseLevel;
};

export type InstitutionCoursesData = {
  id: string;
  name: string;
  description: string;
  coursesByCategory: {
    category: string;
    courses: InstitutionCourse[];
  }[];
};

// Institution-specific documents, revealed under the institution once selected.
const INSTITUTION_DOCUMENTS: Record<string, { label: string; href: string }[]> = {
  svcmt: [
    {
      label: "Mandatory Disclosure",
      href: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790446643/sviet_assets/rest/pkitegda2ocakvmgjt1y.pdf",
    },
    {
      label: "Committees",
      href: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790446639/sviet_assets/rest/qw6qvspbi3vwv352g4ml.pdf",
    },
  ],
};

function formatDuration(durationMonths: number) {
  const years = durationMonths / 12;
  return `${Number.isInteger(years) ? years : years.toFixed(1)} Years`;
}

export function InstitutionsCoursesSection({
  institutions,
}: {
  institutions: InstitutionCoursesData[];
}) {
  const [activeInstitutionId, setActiveInstitutionId] = useState<string>(
    institutions[0]?.id ?? "",
  );

  const activeInstitution = useMemo(
    () =>
      institutions.find(
        (institution) => institution.id === activeInstitutionId,
      ) ?? institutions[0],
    [institutions, activeInstitutionId],
  );

  if (institutions.length === 0 || !activeInstitution) {
    return null;
  }

  return (
    <div>
      <SectionHeader
        id="institutions-programs-heading"
        eyebrow="Academics"
        title="Institutions & Programs"
        description="Select an institution to explore live, database-backed courses grouped by category."
        className="mb-8"
        titleClassName="text-[#000000]"
      />

      <div className="grid gap-0 overflow-hidden border border-[#D1D5DB] bg-white shadow-[0_12px_30px_rgba(15,23,42,0.08)] lg:grid-cols-[320px_1fr]">
        <aside className="bg-[#031A4A] p-5">
          <h3 className="text-xl font-semibold text-white">Our Institutions</h3>
          <ul className="mt-4 space-y-2" aria-label="Institution list">
            {institutions.map((institution) => {
              const isActive = institution.id === activeInstitution.id;
              const documents = INSTITUTION_DOCUMENTS[institution.id] ?? [];

              return (
                <li key={institution.id}>
                  <button
                    type="button"
                    onClick={() => setActiveInstitutionId(institution.id)}
                    className={`w-full border px-4 py-3 text-left text-sm transition ${
                      isActive
                        ? "border-[#f7941d] bg-white text-[#111827]"
                        : "border-white/20 bg-white/5 text-white hover:bg-white/10"
                    }`}
                    aria-pressed={isActive}
                  >
                    <span className="font-semibold">{institution.name}</span>
                    <p
                      className={`mt-1 text-xs ${isActive ? "text-[#4B5563]" : "text-white/70"}`}
                    >
                      {institution.description}
                    </p>
                  </button>

                  {isActive && documents.length > 0 ? (
                    <ul
                      className="mt-2 space-y-2 border-l-2 border-[#f7941d]/60 pl-3"
                      aria-label={`${institution.name} documents`}
                    >
                      {documents.map((doc) => (
                        <li key={doc.href}>
                          <a
                            href={doc.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 border border-white/20 bg-white/5 px-3 py-2 text-xs font-semibold text-white transition hover:border-[#f7941d] hover:bg-white/10"
                          >
                            <FileText className="h-4 w-4 shrink-0 text-[#f7941d]" />
                            {doc.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </aside>

        <div className="p-5 sm:p-7">
          <h3 className="text-3xl font-semibold text-[#1F2937]">
            {activeInstitution.name}
          </h3>
          <p className="mt-2 text-sm text-[#6B7280]">
            {activeInstitution.description}
          </p>

          {/* College affiliation badges */}
          {(() => {
            const unis = getCollegeAffiliations(activeInstitution.name);
            if (unis.length === 0) return null;
            return (
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                  Affiliated to:
                </span>
                {unis.map((uni) => (
                  <span
                    key={uni}
                    className="rounded border border-[#BFDBFE] bg-[#EEF4FF] px-2.5 py-1 text-xs font-semibold text-[#1D4ED8]"
                  >
                    {uni}
                  </span>
                ))}
              </div>
            );
          })()}

          {activeInstitution.coursesByCategory.length === 0 ? (
            <p className="mt-6 border border-dashed border-[#D1D5DB] bg-[#F9FAFB] px-4 py-3 text-sm text-[#6B7280]">
              No active courses found for this institution yet.
            </p>
          ) : (
            <div className="mt-6 space-y-8">
              {activeInstitution.coursesByCategory.map((category) => (
                <section
                  key={category.category}
                  aria-label={`${category.category} courses`}
                >
                  <div className="mb-3 flex items-center justify-between border-b border-[#E5E7EB] pb-2">
                    <h4 className="text-sm font-bold uppercase tracking-[0.18em] text-[#f7941d]">
                      {category.category}
                    </h4>
                    <span className="text-xs font-medium text-[#6B7280]">
                      {category.courses.length} courses
                    </span>
                  </div>

                  <ul className="space-y-2">
                    {category.courses.map((course) => (
                      <li key={course.id}>
                        <div className="flex items-center justify-between border border-[#E5E7EB] bg-white px-4 py-3">
                          <div>
                            <p className="font-medium text-[#111827]">
                              {course.title}
                            </p>
                            <p className="mt-1 text-sm text-[#6B7280]">
                              Duration: {formatDuration(course.durationMonths)}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
