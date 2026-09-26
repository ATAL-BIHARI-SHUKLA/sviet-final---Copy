const CARDS = [
  {
    title: "Inauguration Ceremony",
    imageSrc:
      "https://utfs.io/f/4e6ea4f6-7eb8-4c00-af72-4b34097df548-26ylxr.jpg",
    category: "Ceremony",
    description:
      "Kickstart ISTE SVIET 2024 with our grand inauguration, welcoming students and professionals to a world of innovation and learning.",
  },
  {
    title: "AI/ML Bootcamp",
    imageSrc:
      "https://utfs.io/f/nsz3ps3WUZRL7PEPn5yZPFew0cpClJ4f9O3RUWHjaDvbq6AN",
    category: "Workshops",
    description:
      "A hands-on bootcamp to dive deep into the world of Artificial Intelligence and Machine Learning, led by industry experts.",
  },
  {
    title: "SVIET Innovation Summit",
    imageSrc:
      "https://utfs.io/f/b0059674-8b27-4d09-89ac-d3de018959bc-m5n17e.jpg",
    category: "Conferences",
    description:
      "Explore the latest trends in technology and innovation with global industry leaders at SVIET's annual innovation summit.",
  },
  {
    title: "ISTE Ideathon 2024",
    imageSrc:
      "https://utfs.io/f/nsz3ps3WUZRLNLRuHm9rk45hJIB6UAVERY1S0Po7cOimTtlD",
    category: "Hackathons",
    description:
      "Challenge yourself to bring new ideas to life in this high-energy ideathon focused on solving real-world problems.",
  },
  {
    title: "Tech Quiz Challenge",
    imageSrc:
      "https://utfs.io/f/a2b3518f-f8ab-4a5b-b5b5-93125c1f5509-dyxwz9.jpg",
    category: "Competitions",
    description:
      "Test your knowledge and quick thinking in this fast-paced quiz covering all aspects of technology and innovation.",
  },
  {
    title: "Web Development Workshop",
    imageSrc:
      "https://utfs.io/f/7a2f4a16-c53a-4a38-bd1a-69316339f047-771zuo.jpg",
    category: "Workshops",
    description:
      "Learn the latest web development technologies and best practices in this hands-on workshop led by industry experts.",
  },
];

function cardWidthClass(index: number) {
  const oneIndex = index + 1;
  if ((oneIndex % 3 === 0 && oneIndex !== 6) || (oneIndex % 4 === 0 && index !== 0)) {
    return "lg:w-1/2";
  }
  return "lg:w-1/4";
}

export function IsteBigCards() {
  return (
    <section className="body-font bg-black text-white">
      <div className="container mx-auto flex flex-wrap px-5 py-20">
        {/* Section header */}
        <div className="flex w-full flex-wrap py-20">
          <div className="mb-6 w-full lg:mb-0 lg:w-1/2">
            <h1 className="title-font ml-5 mb-5 text-2xl font-semibold leading-10 sm:text-3xl lg:text-6xl">
              ISTE Events
            </h1>
            <div className="ml-5 h-1 w-20 rounded bg-[#fea700]" />
          </div>
          <p className="w-full leading-relaxed lg:w-1/2" />
        </div>

        {/* Cards grid */}
        <div className="flex flex-wrap">
          {CARDS.map((card, index) => (
            <div
              key={card.title}
              className={`w-full p-1 md:p-2 ${cardWidthClass(index)}`}
            >
              <div className="h-full overflow-hidden rounded-lg border-2 border-gray-200/50 border-opacity-40 hover:border-[#fea700]">
                <img
                  className="w-full object-cover object-center md:h-36 lg:h-60"
                  src={card.imageSrc}
                  alt={card.title}
                />
                <div className="p-6">
                  <h2 className="title-font mb-1 text-sm font-medium tracking-widest text-[#fea700]">
                    {card.category}
                  </h2>
                  <h1 className="title-font text-md mb-3 font-medium text-white">
                    {card.title}
                  </h1>
                  <p className="mb-3 text-justify text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
