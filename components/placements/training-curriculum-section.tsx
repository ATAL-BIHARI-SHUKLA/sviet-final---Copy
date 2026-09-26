import Link from "next/link";

const TRAINING_MODULES = [
  {
    title: "Soft Skills Training",
    description:
      "Enhancing communication, teamwork, and interpersonal skills for professional success.",
  },
  {
    title: "Technical Skills Development",
    description:
      "Hands-on training in core technical areas relevant to industry demands.",
  },
  {
    title: "Aptitude Training",
    description:
      "Developing problem-solving and analytical abilities for competitive exams and interviews.",
  },
  {
    title: "Interview Preparation",
    description:
      "Mock interviews, group discussions, and resume building workshops.",
  },
  {
    title: "Personality Development",
    description:
      "Guidance on body language, presentation skills, and workplace etiquette to create a strong professional image.",
  },
] as const;

export function TrainingCurriculumSection() {
  return (
    <section className="bg-white px-4 py-16 md:px-6 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#f7941d]">
            Placement Training
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#111827] md:text-4xl">
            Placement Training
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#6B7280]">
            Our placement training programs prepare students to confidently step
            into the professional world with the right mix of skills, knowledge,
            and experience.
          </p>
        </div>

        <div className="mt-4 inline-block rounded-lg border border-[#f7941d]/30 bg-[#f7941d]/5 px-5 py-3">
          <p className="text-sm font-semibold text-[#111827]">
            Training Methodology
          </p>
          <p className="mt-0.5 text-sm text-[#6B7280]">
            Structured, practice-oriented programs focused on real-world
            application and continuous improvement.
          </p>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TRAINING_MODULES.map((module) => (
            <article
              key={module.title}
              className="rounded-2xl border border-[#DCE7FF] bg-[linear-gradient(180deg,#FFFFFF_0%,#F8FAFF_100%)] p-6"
            >
              <h3 className="text-lg font-semibold text-[#111827]">
                {module.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#4B5563]">
                {module.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-8">
          <Link
            href="/contact"
            className="inline-flex items-center rounded-md bg-[#f7941d] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#d97706]"
          >
            Talk to Training Cell
          </Link>
        </div>
      </div>
    </section>
  );
}
