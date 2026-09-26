import Image from "next/image";

export function CampusLifeHeroSection() {
  return (
    <section className="w-full pt-2 md:pt-3">
      <div className="relative h-[510px] w-full overflow-hidden rounded-[15px] md:h-[600px]">
        <Image
          src="/assets/img/college/auditorium.png"
          alt="Campus Auditorium"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/40 to-black/20" />

        <div className="absolute inset-0">
          <div className="relative mx-auto h-full w-full max-w-[1280px] px-2 md:px-5">
            <div className="absolute left-2 top-10 text-white md:left-6 md:top-8">
              <h1 className="bg-gradient-to-b from-white to-[#99999900] bg-clip-text text-[82px] font-extrabold leading-[0.9] tracking-[1px] text-transparent md:text-[165px] md:tracking-[2px]">
                CAMPUS LIFE
              </h1>
              <h2 className="mt-10 text-[30px] font-extrabold leading-[0.82] md:mt-24 md:text-[66px]">
                PIONEERING
                <br />
                <span className="mt-3 inline-block text-[#f7941d]">
                  POSSIBILITIES
                </span>
              </h2>
              <p className="mt-2 text-xl font-semibold md:text-[30px]">
                Research & Innovation
              </p>
            </div>

            <div className="absolute bottom-12 right-auto ml-2 max-w-[280px] text-white md:bottom-28 md:right-6 md:max-w-[420px]">
              <p className="text-sm leading-tight md:text-[32px] md:leading-[1.12]">
                Technology Enhanced Experimental Learning With Advance Learning
                Centers & Labs.
              </p>
              {/* <button className="mt-3 inline-flex items-center gap-2 rounded-md bg-[#f7941d] px-4 py-2 text-sm font-semibold text-white md:mt-5 md:px-5 md:py-3 md:text-[18px]">
                Video Tour
                <FaArrowRight className="text-[11px]" />
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
