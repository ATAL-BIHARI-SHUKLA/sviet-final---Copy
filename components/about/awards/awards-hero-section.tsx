import Image from "next/image";

export function AwardsHeroSection() {
  return (
    <section className="w-full overflow-hidden ">
      <Image
        src="/assets/img/banner/awardsbanner.jpeg"
        alt="Awards and recognitions banner"
        width={2048}
        height={551}
        priority
        sizes="100vw"
        className="block h-auto w-full object-contain"
      />
    </section>
  );
}
