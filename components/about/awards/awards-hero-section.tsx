import Image from "next/image";

export function AwardsHeroSection() {
  return (
    <section className="w-full overflow-hidden ">
      <Image
        src="https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443532/sviet_assets/banner/awardsbanner.jpg"
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
