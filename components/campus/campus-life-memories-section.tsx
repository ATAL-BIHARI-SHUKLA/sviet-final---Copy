import Image from "next/image";

export function CampusLifeMemoriesSection() {
  return (
    <section className="w-full bg-[#241a6b] py-14 text-white md:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <h2 className="max-w-3xl text-3xl font-bold leading-tight md:text-5xl">
          Helping you turn every moment into lifetime memories
        </h2>
        <p className="mt-6 max-w-4xl text-sm leading-relaxed text-white/85 md:text-lg">
          Welcome to your journey at SVGOI, where student life transcends academics. We transform it into an extraordinary
          experience brimming with excitement, exploration, and rich cultural flair. With thrilling concerts and vibrant
          student clubs, SVGOI stands as the premier destination for enjoyment and involvement.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <div className="relative overflow-hidden rounded-xl">
            <Image
              src="/assets/img/campus-life/r1c1.png"
              alt="Students enjoying campus dining"
              width={1200}
              height={760}
              className="h-72 w-full object-cover md:h-96"
            />
          </div>
          <div className="relative overflow-hidden rounded-xl">
            <Image
              src="/assets/img/section_card/LifetimeMemory.jpeg"
              alt="Campus activities and sports"
              width={1200}
              height={760}
              className="h-72 w-full object-cover md:h-96"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
