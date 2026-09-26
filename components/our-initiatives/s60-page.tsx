import Image from "next/image";
import { Star, BookOpen, Target, Sparkles } from "lucide-react";

export function S60Page() {
  return (
    <div className="text-foreground">
      <section className="w-full">
        <div className="w-full overflow-hidden">
          <Image
            src="/assets/img/banner/s60.jpeg"
            alt="S60 Banner"
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto w-full"
          />
        </div>
      </section>

      <section className=" py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left */}
            <div>
              <p className="text-sm font-medium uppercase tracking-widest text-[#111827]">
                A Community of
              </p>
              <p className="mt-1 text-lg font-medium uppercase leading-tight tracking-wide text-[#f7941d] md:text-2xl">
                Visionaries, Creators and Leaders
              </p>

              <blockquote className="mt-6 border-l-4 border-[#f7941d] pl-4 italic text-[#374151]">
                &ldquo;Step into your potential with Super60 — where learning
                meets real-world execution and excellence becomes a
                habit.&rdquo;
              </blockquote>

              <div className="mt-10 select-none">
                <p className="text-[72px] font-black uppercase leading-none tracking-tighter text-[#111827] md:text-[96px]">
                  SUPER
                </p>
                <p className="text-[72px] font-black uppercase leading-none tracking-tighter text-[#111827] md:text-[96px]">
                  SI
                  <span className="text-[#f7941d]">✕</span>
                  TY
                </p>
              </div>
            </div>

            {/* Right */}
            <div className="relative">
              <div className="relative">
                <div className="mb-3 flex items-center gap-3">
                  <span className="h-px w-8 bg-[#f7941d]" />
                  <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#f7941d]">
                    Section 01
                  </p>
                </div>

                <h2 className="text-3xl font-medium leading-tight text-[#111827] md:text-5xl">
                  Shaping tomorrow,
                  <br />
                  today
                </h2>

                <p className="mt-5 max-w-sm text-sm leading-relaxed text-[#6B7280] md:text-base">
                  In a world of constant change, continuous learning is the
                  ultimate strategy. That&apos;s why we empower students with
                  real-world projects and a culture of excellence to rewrite the
                  rules of growth and innovation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <h3 className="text-2xl font-medium text-[#111827] md:text-3xl">
            Our Main Focus
          </h3>

          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#003087]">
                <Star className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="text-base font-bold text-[#111827]">
                  Academic Excellence
                </h4>
                <p className="mt-1 text-sm leading-relaxed text-[#6B7280]">
                  Empowering students to achieve their highest potential through
                  structured learning, performance-driven assessments, and
                  continuous mentorship from experienced guides.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#003087]">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="text-base font-bold text-[#111827]">
                  Peer Learning
                </h4>
                <p className="mt-1 text-sm leading-relaxed text-[#6B7280]">
                  Creating a powerful environment where students uplift and
                  inspire one another, share knowledge, and grow stronger
                  together.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#003087]">
                <Target className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="text-base font-bold text-[#111827]">
                  Goal-Oriented Training
                </h4>
                <p className="mt-1 text-sm leading-relaxed text-[#6B7280]">
                  Empowering every student with personalized strategies and
                  focused guidance designed to turn their ambitions into
                  achievements and their goals into reality.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#003087]">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="text-base font-bold text-[#111827]">
                  Holistic Development
                </h4>
                <p className="mt-1 text-sm leading-relaxed text-[#6B7280]">
                  Beyond academics — enhancing soft skills, confidence, and
                  problem-solving for all-round growth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F6F6F6] py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-10">
            <p className="text-[11px] font-bold uppercase tracking-[0.45em] text-[#f7941d]">
              Gallery
            </p>
            <h2 className="mt-3 text-3xl font-medium tracking-tighter text-[#101828] md:text-5xl">
              Moments That Define Us
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-4">
            <div className="flex flex-col gap-3 lg:gap-4">
              <div className="group relative h-52 overflow-hidden border border-[#E4DED4] md:h-64">
                <Image
                  src="/assets/img/s60/P_ncagda.jpg"
                  alt="Super 60 batch"
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/20" />
              </div>
              <div className="group relative h-52 overflow-hidden border border-[#E4DED4] md:h-64">
                <Image
                  src="/assets/img/s60/blog_1765605754312.jpg"
                  alt="Super 60 session"
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/20" />
              </div>
            </div>

            <div className="group relative row-span-2 min-h-105 overflow-hidden border border-[#E4DED4]">
              <Image
                src="/assets/img/s60/Third-ChX5EUkj.jpg"
                alt="Super 60 community"
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/20" />
            </div>

            <div className="flex flex-col gap-3 lg:gap-4">
              <div className="group relative h-52 overflow-hidden border border-[#E4DED4] md:h-64">
                <Image
                  src="/assets/img/s60/batch_8.0_h3ycn5.jpg"
                  alt="Super 60 workshop"
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/20" />
              </div>
              <div className="group relative h-52 overflow-hidden border border-[#E4DED4] md:h-64">
                <Image
                  src="/assets/img/s60/one-DakvQVQ8.jpg"
                  alt="Super 60 members"
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f8f4ee_100%)] py-16 md:py-24">
        <div className="our-initiatives-founder-grid pointer-events-none absolute inset-0 opacity-60" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.45em] text-[#f7941d]">
              The Founders
            </p>
            <h2 className="mt-4 text-3xl font-medium tracking-tighter text-[#101828] md:text-5xl">
              Visionary Leadership,{" "}
              <span className="text-[#003087]">Inspiring Generations</span>
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Vishal Garg */}
            <div className="grid gap-0 border border-[#e4d7c6] bg-white shadow-[0_18px_42px_rgba(16,24,40,0.08)] lg:grid-cols-[200px_1fr]">
              <div className="relative min-h-64 overflow-hidden lg:min-h-full">
                <Image
                  src="/assets/img/college/management/vishal-sir.jpg"
                  alt="Vishal Garg — Founder, Super 60"
                  fill
                  sizes="(max-width: 1024px) 100vw, 200px"
                  className="object-cover object-top"
                />
              </div>
              <div className="flex flex-col justify-center space-y-3 p-6">
                <div>
                  <p className="text-xl font-medium text-[#101828]">
                    Vishal Garg
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[#f7941d]">
                    Director Secretarial and Administration
                  </p>
                </div>
                <p className="text-sm leading-relaxed text-[#475467]">
                  A passionate educator and mentor who built Super 60 to bridge
                  the gap between campus learning and industry expectations.
                  Under his vision, students are trained with real-world rigour,
                  discipline, and purpose.
                </p>
              </div>
            </div>

            {/* Ankur Gill */}
            <div className="grid gap-0 border border-[#e4d7c6] bg-white shadow-[0_18px_42px_rgba(16,24,40,0.08)] lg:grid-cols-[200px_1fr]">
              <div className="relative min-h-64 overflow-hidden lg:min-h-full">
                <Image
                  src="/assets/img/college/management/ankur-sir.jpg"
                  alt="Ankur Gill — Director of Operations, Founder UNIQUE ZONE"
                  fill
                  sizes="(max-width: 1024px) 100vw, 200px"
                  className="object-cover object-top"
                />
              </div>
              <div className="flex flex-col justify-center space-y-3 p-6">
                <div>
                  <p className="text-xl font-medium text-[#101828]">
                    Ankur Gill
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[#f7941d]">
                    Director of Operations
                  </p>
                </div>
                <p className="text-sm leading-relaxed text-[#475467]">
                  A distinguished instructional management specialist with over
                  a decade of expertise across Academics, Research &amp;
                  Innovation, and Corporate Relations. Founder of UNIQUE ZONE —
                  SVIET&apos;s pioneering on-campus IT incubation center.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
