import Image from "next/image";
import Link from "next/link";

export default function EntrepreneurshipPage() {
  return (
    <main className="min-h-screen bg-[#FFFFFF] text-[#111827]">
      {/* Page Header */}
      <section className="-mt-30 w-full pt-30">
        <div className="bg-black px-4 py-16 md:px-6 md:py-20">
          <div className="mx-auto max-w-7xl">
            <nav className="mb-4 flex items-center gap-2 text-xs text-white/50">
              <Link
                href="/international"
                className="transition hover:text-white"
              >
                International
              </Link>
              <span>/</span>
              <span className="text-white">
                Entrepreneurship &amp; Startup Support
              </span>
            </nav>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#f7941d]">
              Innovation &amp; Enterprise
            </p>
            <h1 className="mt-3 text-3xl font-black leading-tight text-white md:text-5xl">
              Entrepreneurship &amp;
              <br />
              Startup Support
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80">
              Empowering international students to build, grow, and lead ventures
              that create real-world impact.
            </p>
          </div>
        </div>
      </section>

      {/* Section 1 — SVGOI Global Seed */}
      <section className="border-b border-black/10 py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid items-center gap-8 md:grid-cols-[1fr_1.2fr] md:gap-14">
            <div>
              <div className="relative mb-6 h-20 w-auto max-w-xs">
                <Image
                  src="/assets/img/inter/03%20Entrepreneurship%20%26%20Startup%20Support/01%20Global%20Seed/GLOBAL%20SEED%20LOGO.png"
                  alt="SVGOI Global Seed logo"
                  fill
                  sizes="320px"
                  className="object-contain object-left"
                  loading="lazy"
                />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#f7941d]">
                Programme 01
              </p>
              <h2 className="mt-2 text-2xl font-bold text-[#111827] md:text-3xl">
                SVGOI Global Seed
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#374151]">
                Global Seed is SVGOI's flagship startup incubation programme
                for international students. It provides seed funding, mentorship,
                co-working space, and a structured launchpad for students who
                arrive with entrepreneurial ambitions and leave as founders.
              </p>
              <p className="mt-4 text-base leading-relaxed text-[#374151]">
                From ideation workshops to investor pitch days, Global Seed
                walks every aspiring entrepreneur through a complete venture
                building journey — validated by real market feedback and
                supported by SVGOI's industry network.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {[
                  { stat: "Seed Funding", desc: "For promising ideas" },
                  { stat: "Mentorship", desc: "Industry experts" },
                  { stat: "Co-working Space", desc: "On campus" },
                  { stat: "Pitch Days", desc: "Investor access" },
                  { stat: "Legal Support", desc: "Business registration" },
                  { stat: "Market Access", desc: "Network & distribution" },
                ].map((item) => (
                  <div
                    key={item.stat}
                    className="border border-black/10 bg-background p-4"
                  >
                    <p className="text-sm font-bold text-[#111827]">
                      {item.stat}
                    </p>
                    <p className="mt-1 text-xs text-[#6b7280]">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                "/assets/img/inter/01%20Collage,%20shubham%20sir,%20soni%20sir/Collage/DSC07057%20(1).JPG",
                "/assets/img/inter/01%20Collage,%20shubham%20sir,%20soni%20sir/Collage/DSC09384.JPG",
                "/assets/img/inter/01%20Collage,%20shubham%20sir,%20soni%20sir/Collage/IMG_1197.JPG",
                "/assets/img/inter/01%20Collage,%20shubham%20sir,%20soni%20sir/Collage/IMG_3178.JPG",
              ].map((src, i) => (
                <div
                  key={i}
                  className="relative min-h-52 overflow-hidden border border-black/10"
                >
                  <Image
                    src={src}
                    alt={`Global Seed programme ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover object-top"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 2A — Afro Masala Restaurant */}
      <section className="border-b border-black/10 bg-background py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#f7941d]">
            Student Startup — Success Story
          </p>
          <h2 className="mt-2 text-2xl font-bold text-[#111827] md:text-3xl">
            Afro Masala Restaurant
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#374151]">
            Born from a passion for authentic African cuisine and nurtured by
            the Global Seed programme, Afro Masala Restaurant is a thriving
            student-founded eatery that fuses African and Indian flavours. The
            founders — international students at SVGOI — identified a gap in
            the local food market and turned it into a successful venture that
            today serves the campus and surrounding community.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "/assets/img/inter/03%20Entrepreneurship%20%26%20Startup%20Support/01%20Global%20Seed/3%2CA%20(Afro%20Masala)/WhatsApp%20Image%202026-05-06%20at%2011.0.49%20AM.jpeg",
              "/assets/img/inter/03%20Entrepreneurship%20%26%20Startup%20Support/01%20Global%20Seed/3%2CA%20(Afro%20Masala)/WhatsApp%20Image%202026-05-06%20at%2011.10..jpeg",
              "/assets/img/inter/03%20Entrepreneurship%20%26%20Startup%20Support/01%20Global%20Seed/3%2CA%20(Afro%20Masala)/WhatsApp%20Image%202026-05-06%20at%2011.10.46%20AM.jpeg",
              "/assets/img/inter/03%20Entrepreneurship%20%26%20Startup%20Support/01%20Global%20Seed/3%2CA%20(Afro%20Masala)/WhatsApp%20Image%202026-05-06%20at%2011.10.47%20AM.jpeg",
            ].map((src, i) => (
              <div
                key={i}
                className="relative min-h-52 overflow-hidden border border-black/10"
              >
                <Image
                  src={src}
                  alt={`Afro Masala Restaurant ${i + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-top"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {/* Video showcase */}
          <div className="mt-6">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.15em] text-[#111827]">
              Watch Their Story
            </p>
            <div className="max-w-2xl overflow-hidden border border-black/10 bg-black">
              <video
                src="/assets/img/inter/03%20Entrepreneurship%20%26%20Startup%20Support/01%20Global%20Seed/3%2CA%20(Afro%20Masala)/GLOBAL%20SEED%20AFRO.mp4"
                controls
                preload="metadata"
                playsInline
                className="w-full"
                aria-label="Afro Masala Restaurant story video"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2B — Aziben Hair & Beauty Salon */}
      <section className="border-b border-black/10 py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#f7941d]">
            Student Startup — Success Story
          </p>
          <h2 className="mt-2 text-2xl font-bold text-[#111827] md:text-3xl">
            Aziben Hair &amp; Beauty Salon
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#374151]">
            Aziben Hair &amp; Beauty Salon was launched by an SVGOI international
            student who recognised an unmet demand for professional African hair
            care and beauty services in the region. Backed by Global Seed's
            mentorship and funding support, Aziben has grown from a campus
            side-hustle into a fully operational salon with a loyal customer
            base — a testament to the transformative power of SVGOI's startup
            ecosystem.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "/assets/img/inter/03%20Entrepreneurship%20%26%20Startup%20Support/01%20Global%20Seed/3%2CB%20(Salon)/WhatsApp%20Image%202026-05-06%20at%2011.10.26%20AM.jpeg",
              "/assets/img/inter/03%20Entrepreneurship%20%26%20Startup%20Support/01%20Global%20Seed/3%2CB%20(Salon)/WhatsApp%20Image%202026-05-06%20at%2011.10.27%20AM.jpeg",
              "/assets/img/inter/03%20Entrepreneurship%20%26%20Startup%20Support/01%20Global%20Seed/3%2CB%20(Salon)/WhatsApp%20Image%202026-05-06%20at%2011.10.28%20AM.jpeg",
              "/assets/img/inter/03%20Entrepreneurship%20%26%20Startup%20Support/01%20Global%20Seed/3%2CB%20(Salon)/WhatsApp%20Image%202026-05-06%20at%2011.10.29%20AM.jpeg",
            ].map((src, i) => (
              <div
                key={i}
                className="relative min-h-52 overflow-hidden border border-black/10"
              >
                <Image
                  src={src}
                  alt={`Aziben Salon ${i + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-top"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {/* Video showcase */}
          <div className="mt-6">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.15em] text-[#111827]">
              Watch Their Story
            </p>
            <div className="max-w-2xl overflow-hidden border border-black/10 bg-black">
              <video
                src="/assets/img/inter/03%20Entrepreneurship%20%26%20Startup%20Support/01%20Global%20Seed/3%2CB%20(Salon)/GLOBAL%20SEED%20SALOON.mp4"
                controls
                preload="metadata"
                playsInline
                className="w-full"
                aria-label="Aziben Salon story video"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 — Earn While Learn */}
      <section className="border-b border-black/10 bg-background py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid items-center gap-8 md:grid-cols-[1.2fr_1fr] md:gap-14">
            <div>
              <div className="relative mb-5 h-16 w-auto max-w-xs">
                <Image
                  src="/assets/img/inter/03%20Entrepreneurship%20%26%20Startup%20Support/02%20Earn%20while%20learn/Earn%20while%20Learn.png"
                  alt="Earn While Learn programme logo"
                  fill
                  sizes="320px"
                  className="object-contain object-left"
                  loading="lazy"
                />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#f7941d]">
                Programme 03
              </p>
              <h2 className="mt-2 text-2xl font-bold text-[#111827] md:text-3xl">
                Earn While Learn
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#374151]">
                The Earn While Learn programme bridges the gap between
                education and financial independence. International students
                can take up on-campus roles, project-based assignments, and
                skill-monetisation opportunities without compromising their
                academic schedule.
              </p>
              <p className="mt-4 text-base leading-relaxed text-[#374151]">
                From campus store management to digital marketing projects and
                language tutoring, the programme builds professional experience,
                generates income, and strengthens your CV — all while you study.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {[
                  "On-campus part-time roles",
                  "Project-based freelance work",
                  "Skill-monetisation opportunities",
                  "Flexible hours around classes",
                  "Professional experience certificates",
                  "Income support for living expenses",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-2 text-sm text-[#374151]"
                  >
                    <span className="mt-0.5 text-[#f7941d]">✓</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                "/assets/img/inter/03%20Entrepreneurship%20%26%20Startup%20Support/02%20Earn%20while%20learn/IMG_9762.jpg",
                "/assets/img/inter/03%20Entrepreneurship%20%26%20Startup%20Support/02%20Earn%20while%20learn/IMG_9782.jpg",
                "/assets/img/inter/03%20Entrepreneurship%20%26%20Startup%20Support/02%20Earn%20while%20learn/WhatsApp%20Image%202026-06-06%20at%202.14.17%20PM.jpeg",
                "/assets/img/inter/03%20Entrepreneurship%20%26%20Startup%20Support/02%20Earn%20while%20learn/WhatsApp%20Image%202026-06-06%20at%202.14.19%20PM.jpeg",
              ].map((src, i) => (
                <div
                  key={i}
                  className="relative min-h-56 overflow-hidden border border-black/10"
                >
                  <Image
                    src={src}
                    alt={`Earn While Learn programme ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover object-top"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 — InterVents */}
      <section className="border-b border-black/10 py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid items-start gap-8 md:grid-cols-2 md:gap-12">
            <div>
              <div className="relative mb-5 h-16 w-auto max-w-xs">
                <Image
                  src="/assets/img/inter/03%20Entrepreneurship%20%26%20Startup%20Support/03%20INTERVENTS/intervents-removebg-preview.png"
                  alt="InterVents logo"
                  fill
                  sizes="320px"
                  className="object-contain object-left"
                  loading="lazy"
                />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#f7941d]">
                Programme 04
              </p>
              <h2 className="mt-2 text-2xl font-bold text-[#111827] md:text-3xl">
                InterVents
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#374151]">
                InterVents is SVGOI's international student events platform —
                a space where ideas, talent, and enterprise come together.
                From startup showcases and innovation hackathons to cultural
                summits and networking evenings, InterVents creates the
                platform for international students to be seen, heard, and
                celebrated.
              </p>
              <p className="mt-4 text-base leading-relaxed text-[#374151]">
                InterVents has launched several student ventures and connected
                aspiring entrepreneurs with mentors, investors, and industry
                leaders from across India and beyond.
              </p>

              {/* Owen success story */}
              <div className="mt-8 border border-[#f7941d]/30 bg-[#f7941d]/5 p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#f7941d]">
                  Success Story
                </p>
                <div className="mt-3 flex items-start gap-4">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden border border-black/10">
                    <Image
                      src="/assets/img/inter/03%20Entrepreneurship%20%26%20Startup%20Support/03%20INTERVENTS/OWEN.jpg"
                      alt="Owen — InterVents success story"
                      fill
                      sizes="80px"
                      className="object-cover object-top"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-[#111827]">Owen</p>
                    <p className="mt-1 text-sm leading-relaxed text-[#374151]">
                      Owen joined InterVents as a first-year international
                      student with a business idea and left as a founder.
                      His venture — launched through the platform — now
                      serves hundreds of customers and employs fellow students,
                      making him one of SVGOI's most celebrated alumni
                      entrepreneurs.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              {/* Participant spotlight */}
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.15em] text-[#111827]">
                Meet Our Participants
              </p>
              <div className="flex flex-wrap gap-5">
                {[
                 
                  "/assets/img/inter/03%20Entrepreneurship%20%26%20Startup%20Support/03%20INTERVENTS/WhatsApp%20Image%202026-06-08%20at%2010.31.09%20AM.jpeg",
                  "/assets/img/inter/03%20Entrepreneurship%20%26%20Startup%20Support/03%20INTERVENTS/WhatsApp%20Image%202026-06-08%20at%2010.31.09%20AM%20(1).jpeg",
                  "/assets/img/inter/03%20Entrepreneurship%20%26%20Startup%20Support/03%20INTERVENTS/WhatsApp%20Image%202026-06-08%20at%2010.31.10%20AM.jpeg",
                  "/assets/img/inter/03%20Entrepreneurship%20%26%20Startup%20Support/03%20INTERVENTS/WhatsApp%20Image%202026-06-08%20at%2010.31.10%20AM%20(1).jpeg",
                ].map((src, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-[#f7941d]/40 shadow-md">
                      <Image
                        src={src}
                        alt={`InterVents participant ${i + 1}`}
                        fill
                        sizes="80px"
                        className="object-cover object-top"
                        loading="lazy"
                      />
                    </div>
                    <span className="text-xs text-[#6b7280]">
                      Participant {i + 1}
                    </span>
                  </div>
                ))}
              </div>

              {/* Programme highlights */}
              <div className="mt-8 space-y-3">
                {[
                  "Startup Showcases",
                  "Innovation Hackathons",
                  "Cultural Summits",
                  "Networking Events",
                  "Mentorship Sessions",
                  "Investor Pitches",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 border border-black/10 bg-white px-4 py-3"
                  >
                    <span className="text-[#f7941d]">→</span>
                    <span className="text-sm font-medium text-[#111827]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5 — Faculty Exchange Programme */}
      <section className="border-b border-black/10 bg-background py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#f7941d]">
            Programme 05
          </p>
          <h2 className="mt-2 text-2xl font-bold text-[#111827] md:text-3xl">
            Faculty Exchange Programme
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#374151]">
            The Faculty Exchange Programme brings international academics and
            industry experts to SVGOI's campus — and sends SVGOI faculty to
            partner institutions around the world. This cross-pollination of
            knowledge, teaching methodologies, and research perspectives
            directly enriches the international student experience.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-[1fr_1fr]">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.15em] text-[#111827]">
                Programme Benefits
              </p>
              <div className="space-y-3">
                {[
                  {
                    title: "Global Perspectives in the Classroom",
                    desc: "International visiting faculty bring diverse academic traditions, industry experiences, and research insights directly to your course.",
                  },
                  {
                    title: "Research Collaboration",
                    desc: "Joint research projects and co-authored publications between SVGOI and partner university faculty create new knowledge and career pathways.",
                  },
                  {
                    title: "Expanded Network",
                    desc: "Students gain exposure to visiting professors from across the globe, expanding their professional network from day one.",
                  },
                  {
                    title: "Cultural Exchange",
                    desc: "Visiting faculty participate in campus cultural events, creating genuine cross-cultural dialogue in and out of the classroom.",
                  },
                ].map((item) => (
                  <div key={item.title} className="border border-black/10 bg-white p-4">
                    <p className="font-semibold text-[#111827]">{item.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-[#6b7280]">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Gallery */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                "/assets/img/inter/03%20Entrepreneurship%20%26%20Startup%20Support/04%20Faculty%20Exchange%20Program/481282101_1103452121825813_5481451174076530903_n.jpg",
                "/assets/img/inter/03%20Entrepreneurship%20%26%20Startup%20Support/04%20Faculty%20Exchange%20Program/482225338_1106414794862879_466762468571305345_n.jpg",
                "/assets/img/inter/03%20Entrepreneurship%20%26%20Startup%20Support/04%20Faculty%20Exchange%20Program/486406024_1120487196788972_3655098940765369689_n.jpg",
              ].map((src, i) => (
                <div
                  key={i}
                  className="relative min-h-80 overflow-hidden  "
                >
                  <Image
                    src={src}
                    alt={`Faculty Exchange Programme ${i + 1}`}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-contain"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Video */}
          <div className="mt-8">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.15em] text-[#111827]">
              Featured: International Faculty Collaboration
            </p>
            <div className="max-w-2xl overflow-hidden border border-black/10 bg-black">
              <video
                src="/assets/img/inter/03%20Entrepreneurship%20%26%20Startup%20Support/04%20Faculty%20Exchange%20Program/LORENZ%20INTERN.mp4"
                controls
                preload="metadata"
                playsInline
                className="w-full"
                aria-label="Faculty Exchange Programme collaboration video"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6 — Beat Breakers */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid items-start gap-8 md:grid-cols-[1fr_1.2fr] md:gap-14">
            <div>
              <div className="relative mb-5 h-16 w-auto max-w-xs">
                <Image
                  src="/assets/img/inter/03%20Entrepreneurship%20%26%20Startup%20Support/05%20Beatbreakers/beat_breakers-removebg-preview.png"
                  alt="Beat Breakers logo"
                  fill
                  sizes="320px"
                  className="object-contain object-left"
                  loading="lazy"
                />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#f7941d]">
                Programme 06
              </p>
              <h2 className="mt-2 text-2xl font-bold text-[#111827] md:text-3xl">
                Beat Breakers
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#374151]">
                Beat Breakers is SVGOI's international performance and arts
                collective — a platform where music, dance, and cultural
                expression converge. International students bring the rhythms
                and traditions of their home countries to the stage, creating
                electrifying performances that celebrate diversity and build
                confidence.
              </p>
              <p className="mt-4 text-base leading-relaxed text-[#374151]">
                Beyond the stage, Beat Breakers functions as a creative
                enterprise — managing events, building partnerships, and
                developing the business skills of every participating student
                alongside their artistic craft.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-[#374151]">
                {[
                  "Live performances & cultural showcases",
                  "Music, dance & spoken word",
                  "Event management & enterprise skills",
                  "Inter-college & national collaborations",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-0.5 text-[#f7941d]">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Performance gallery */}
            <div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  "/assets/img/inter/03%20Entrepreneurship%20%26%20Startup%20Support/05%20Beatbreakers/DSC09373.JPG",
                  "/assets/img/inter/03%20Entrepreneurship%20%26%20Startup%20Support/05%20Beatbreakers/DSC09378.JPG",
                  "/assets/img/inter/03%20Entrepreneurship%20%26%20Startup%20Support/05%20Beatbreakers/DSC09384.JPG",
                  "/assets/img/inter/03%20Entrepreneurship%20%26%20Startup%20Support/05%20Beatbreakers/DSC09412.JPG",
                ].map((src, i) => (
                  <div
                    key={i}
                    className="relative min-h-52 overflow-hidden border border-black/10"
                  >
                    <Image
                      src={src}
                      alt={`Beat Breakers performance ${i + 1}`}
                      fill
                      sizes="(max-width: 768px) 50vw, 30vw"
                      className="object-cover object-top"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 text-center md:px-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#f7941d]">
            Get Involved
          </p>
          <h2 className="mt-3 text-2xl font-bold text-white md:text-3xl">
            Ready to build your venture at SVGOI?
          </h2>
          <p className="mt-3 max-w-xl mx-auto text-base text-white/75">
            Join our entrepreneurship ecosystem and turn your ideas into
            impactful ventures — with the full backing of SVGOI's Global Seed
            programme.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/admissions"
              className="inline-flex items-center bg-[#f7941d] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#d97706]"
            >
              Apply for Admission
            </Link>
            <Link
              href="/international"
              className="inline-flex items-center border border-white/35 bg-white/10 px-8 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              Back to International
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
