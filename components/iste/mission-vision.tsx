const SHIELD_ICON = (
  <svg
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    className="h-5 w-5"
    viewBox="0 0 24 24"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const BENEFITS = [
  {
    number: "1",
    title: "Leadership Development",
    description:
      "ISTE provides a platform for students to enhance leadership skills, empowering them to take charge of projects and initiatives.",
  },
  {
    number: "2",
    title: "Networking Opportunities",
    description:
      "Gain access to a vast network of professionals and peers, opening doors to internships, collaborations, and industry insights.",
  },
  {
    number: "3",
    title: "Hands-on Learning",
    description:
      "ISTE chapters conduct workshops, seminars, and hands-on sessions to help students gain practical experience in technical fields.",
  },
  {
    number: "4",
    title: "Career Advancement",
    description:
      "ISTE provides resources and guidance to help students build a successful career by connecting them with experts and industry leaders.",
  },
];

const OPPORTUNITIES = [
  {
    number: "1",
    title: "Technical Competitions",
    description:
      "Participate in various national and international technical competitions to showcase your talent and gain recognition.",
  },
  {
    number: "2",
    title: "Skill Development Workshops",
    description:
      "Attend skill development workshops that focus on the latest technologies, tools, and methodologies.",
  },
  {
    number: "3",
    title: "Research and Innovation",
    description:
      "ISTE encourages students to engage in research activities and innovations that contribute to the advancement of technology.",
  },
  {
    number: "4",
    title: "Collaborative Projects",
    description:
      "Work on collaborative projects with industry experts and fellow students to gain real-world experience and enhance teamwork skills.",
  },
];

function TimelineList({
  items,
}: {
  items: { number: string; title: string; description: string }[];
}) {
  return (
    <div className="container mx-auto flex flex-wrap px-5">
      {items.map((item) => (
        <div
          key={item.number}
          className="relative mx-auto flex py-3 sm:items-center md:w-2/3"
        >
          <div className="absolute inset-0 flex h-full w-6 items-center justify-center">
            <div className="pointer-events-none h-full w-1 bg-gray-300" />
          </div>
          <div className="relative z-10 mt-10 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#ff9602] text-sm font-medium text-white sm:mt-0">
            {item.number}
          </div>
          <div className="flex flex-grow flex-col items-start pl-6 sm:flex-row sm:items-center md:pl-8">
            <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-300 text-[#ff9602]">
              {SHIELD_ICON}
            </div>
            <div className="mt-2 flex-grow sm:mt-0 sm:pl-6">
              <h2 className="title-font mb-1 text-md font-medium text-gray-900">
                {item.title}
              </h2>
              <p className="text-sm leading-relaxed">{item.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function IsteMissionVision() {
  return (
    <>
      {/* Impact header */}
      <div className="container mx-auto flex px-5 py-12 md:w-4/5">
        <div className="flex flex-col justify-center align-middle md:w-1/2">
          <div className="mb-2 flex items-center md:mb-5">
            <span className="mr-3 h-6 border-l-2 border-[#ff9602]" />
            <h1 className="text-lg font-bold">OUR IMPACT</h1>
          </div>
          <h1 className="mb-8 text-lg font-semibold md:text-3xl">
            Elevating Students Through{" "}
            <span className="block text-[#016db6] text-4xl md:py-3 md:text-7xl">
              Opportunities and Benefits
            </span>
          </h1>
          <p className="text-justify">
            As part of ISTE, students get the chance to thrive academically and
            professionally. From leadership roles to hands-on experience, ISTE
            provides unparalleled opportunities to shape the future of technology
            and innovation.
          </p>
        </div>
        {/* decorative block — hidden on mobile */}
        <div className="hidden h-96 w-1/2 items-center justify-center md:flex">
          <div className="grid grid-cols-2 gap-4">
            {["🚀", "🌐", "💡", "🤝"].map((e) => (
              <div
                key={e}
                className="flex h-32 w-32 items-center justify-center rounded-xl bg-[#ff9602]/10 text-5xl"
              >
                {e}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="container mx-auto px-5 pb-24 md:w-4/5 md:px-0">
        <div className="items-center md:flex md:pt-7">
          <div className="flex h-full justify-center pb-7 md:w-1/3 md:pb-0">
            <h1 className="text-2xl font-semibold md:text-5xl">BENEFITS</h1>
          </div>
          <div className="md:w-2/3">
            <TimelineList items={BENEFITS} />
          </div>
        </div>
      </div>

      {/* Opportunities */}
      <div className="container mx-auto px-5 pb-24 md:w-4/5 md:px-0">
        <div className="flex flex-col-reverse items-center justify-center md:flex-row">
          <div className="md:w-2/3">
            <TimelineList items={OPPORTUNITIES} />
          </div>
          <div className="flex h-full justify-center md:w-1/3">
            <h1 className="text-center text-2xl font-semibold md:text-5xl">
              OPPORTUNITIES
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}
