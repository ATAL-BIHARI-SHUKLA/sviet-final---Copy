import Image from "next/image";

const educationPillars = [
  {
    title: "Flagship Innovation & Tech Events",
    description:
      "Initiatives like Elevate and BharatTechXperience bring together innovation, technology, and collaboration—giving students a platform to build, compete, and showcase their skills.",
    image: "/assets/img/section_card/BharatTech.JPG.jpeg",
  },
  {
    title: "Global & Future-Focused Platforms",
    description:
      "Through programs like the Global Future Summit, students engage with emerging ideas, global perspectives, and forward-thinking discussions shaping tomorrow's industries.",
    image: "/assets/img/section_card/GFS.JPG",
  },
  {
    title: "Insights from Industry Leaders",
    description:
      "SVGOI has hosted renowned entrepreneurs like Aman Gupta and Ashneer Grover, offering students direct exposure to real-world business insights, leadership journeys, and startup ecosystems.",
    image: "/assets/img/section_card/AmanGupta.JPG.jpeg",
  },
  {
    title: "Student Leadership & Professional Bodies",
    description:
      "With active chapters like ISTE, students take the lead in organizing technical events, workshops, and knowledge-driven sessions—building leadership alongside technical expertise.",
    image: "/assets/img/section_card/ISTE25.JPG.jpeg",
  },
];

export function PivotEducationSection() {
  return (
    <section className="bg-[#000000e7] px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-14 space-y-4">
          <h2 className="text-3xl font-bold text-[#ffffff] md:text-4xl lg:text-5xl">
            Where Learning Meets Real-World Exposure
          </h2>
          <h3 className="text-2xl font-bold leading-tight text-white md:text-3xl">
            Beyond the Classroom
          </h3>
          <p className="max-w-2xl text-sm leading-relaxed text-gray-300 md:text-base">
            At SVGOI, growth extends far beyond classrooms. Through high-impact
            events, industry interactions, and student-led initiatives, we
            create an environment where ideas turn into action.
          </p>
        </div>

        {/* Grid of Cards - Asymmetrical 8-4, 4-8 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {educationPillars.map((pillar, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-2xl h-96 w-full bg-black ${
                index === 0 || index === 3 ? "md:col-span-2" : "md:col-span-1"
              }`}
            >
              {/* Background Image */}
              <Image
                src={pillar.image}
                alt={pillar.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110 saturate-0 grayscale"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/60 to-transparent" />

              {/* Text Content - Positioned at bottom */}
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <h4 className="text-xl font-bold text-[#f7941d]">
                  {pillar.title}
                </h4>
                <p className="mt-4 text-base leading-relaxed text-white/90">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
