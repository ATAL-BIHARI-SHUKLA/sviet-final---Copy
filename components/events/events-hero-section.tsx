import Image from "next/image";

export function EventsHeroSection() {
  return (
    <section className="w-full bg-[#f5f7fb]">
      <div className="relative w-full overflow-hidden">
        <Image
          src="/assets/img/banner/eventbanner.jpeg"
          alt="SVGOI events banner"
          width={1600}
          draggable={false}
          height={900}
          className="h-90 w-full object-cover md:h-200"
          priority
        />
      </div>
    </section>
  );
}
