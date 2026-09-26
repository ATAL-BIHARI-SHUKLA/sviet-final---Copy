import Image from "next/image";

const ACHIEVERS = [
  {
    name: "ZimFest Winners | Zimbabwe",
    program: "Cultural & Talent Fest",
    description: "Prize winners and cultural performers at ZimFest 2024.",
    imageSrc: "/assets/img/international/zimfest-01.jpg",
  },
  {
    name: "Afro Masala — Launch",
    program: "Student Entrepreneurship",
    description: "On-campus launch and community engagement moments.",
    imageSrc: "/assets/img/international/afro-masala-02.jpg",
  },
  {
    name: "Spontania Community Event",
    program: "Cultural Exchange",
    description:
      "Spontania cultural meetup and community dining at campus cafe.",
    imageSrc: "/assets/img/international/spotania-01.jpg",
  },
  {
    name: "Curación Conference",
    program: "International Research",
    description:
      "International students presenting at Curación 2026 and receiving recognition.",
    imageSrc: "/assets/img/international/curacion-01.jpg",
  },
  {
    name: "Campus Salon — Student Startup",
    program: "Entrepreneurship",
    description:
      "Student-run salon and vocational project showcasing skills and enterprise.",
    imageSrc: "/assets/img/international/salon-01.jpg",
  },
  {
    name: "Girls Volleyball Team",
    program: "Sports",
    description:
      "International students participating and competing in volleyball tournaments.",
    imageSrc: "/assets/img/international/girls-volleyball-01.jpg",
  },
] as const;

export function InternationalAchievementsSection() {
  return (
    <section className="bg-[#111c6b] py-12 text-white md:py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <h2 className="text-3xl font-semibold leading-tight md:text-5xl">
          Meet Our{" "}
          <span className="font-extrabold">International Students</span>
          <br />
          Who Have Made{" "}
          <span className="font-extrabold">Remarkable Achievements</span>
        </h2>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {ACHIEVERS.map((item) => (
            <article
              key={item.name}
              className="overflow-hidden rounded-2xl bg-[#1c2a86] shadow-sm"
            >
              <div className="relative h-44 w-full md:h-56">
                <Image
                  src={item.imageSrc}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 600px, 400px"
                  className="object-cover"
                />
              </div>

              <div className="p-5 md:p-6">
                <h3 className="text-xl font-bold md:text-2xl">{item.name}</h3>
                <p className="mt-1 text-lg font-semibold text-[#f7941d] md:text-xl">
                  {item.program}
                </p>
                <p className="mt-2 text-sm text-white/90 md:text-base">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
