import Image from "next/image";

export function CampusLifeGallerySection() {
  return (
    <section className="mt-15 mb-15 mx-auto w-full max-w-[1280px] px-2 pt-6 md:px-5 md:pt-8">
      <div className="mb-15 rounded-[10px] bg-black px-4 py-6 text-white md:px-8 md:py-20">
        <h3 className="text-[46px] font-extrabold leading-none md:text-[58px]">
          GALLERY HIGHLIGHTS
        </h3>
        <p className="mt-3 max-w-[760px] text-[10px] leading-[1.4] text-white/85 md:text-[14px]">
          Explore our collection of memorable moments and events that capture
          the vibrant life at Swami Vivekanand Group of Institutions.
        </p>
      </div>

      <div className="mt-15 grid grid-cols-2 gap-2 md:gap-3">
        <Image
          src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80"
          alt="Gallery highlight"
          width={1200}
          height={800}
          className="h-[130px] w-full rounded-md object-cover md:h-[400px]"
        />
        <Image
          src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=80"
          alt="Gallery highlight"
          width={1200}
          height={800}
          className="h-[130px] w-full rounded-md object-cover md:h-[400px]"
        />
        <Image
          src="https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&w=1200&q=80"
          alt="Gallery highlight"
          width={1200}
          height={800}
          className="h-[130px] w-full rounded-md object-cover md:h-[400px]"
        />
        <div className="relative overflow-hidden rounded-md">
          <Image
            src="https://images.unsplash.com/photo-1503428593586-e225b39bddfe?auto=format&fit=crop&w=1200&q=80"
            alt="Gallery highlight"
            width={1200}
            height={800}
            className="h-[130px] w-full object-cover md:h-[400px]"
          />
          <div className="absolute inset-0 bg-black/35" />
          <p className="absolute bottom-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 text-sm font-medium text-white md:bottom-5 md:text-[27px]">
            <span>›</span> View More
          </p>
        </div>
      </div>
    </section>
  );
}
