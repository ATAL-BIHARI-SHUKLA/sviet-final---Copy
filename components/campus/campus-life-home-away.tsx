import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";

export function CampusLifeHomeAwaySection() {
  return (
    <section className="mx-auto w-full max-w-[1280px] mt-15 mb-15 px-2 pt-8 md:px-5 md:pt-15">
      <div className="grid gap-5 md:grid-cols-[1fr_1fr] md:gap-8">
        <div className="pt-1 md:pt-4">
          <h3 className="text-[46px] font-extrabold leading-[0.96] text-[#111] md:text-[68px]">
            A HOME <span className="text-[#f7941d]">AWAY</span>
            <br />
            FROM HOME
          </h3>
          <p className="mt-4 max-w-[370px] text-[26px] font-medium leading-[1.08] text-[#1f1f1f] md:mt-5 md:text-[24px]">
            Cosmopolitan Campus With Vibrant Cultures, Multilateral Ideas & A Lot More
          </p>
          <button className="mt-5 inline-flex items-center gap-2 rounded-md bg-[#f7941d] px-4 py-2 text-sm font-semibold text-white md:px-5 md:py-3 md:text-[18px]">
            Video Tour
            <FaArrowRight className="text-[11px]" />
          </button>
        </div>

        <div className="overflow-hidden rounded-md">
          <Image
            src="/assets/img/college/admin.png"
            alt="Campus entrance"
            width={1200}
            height={800}
            className="h-[245px] w-full rounded-md object-cover md:h-[360px]"
          />
        </div>
      </div>
    </section>
  );
}
