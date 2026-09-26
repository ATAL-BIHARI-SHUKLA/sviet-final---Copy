"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

const leaders = [
  {
    name: "Aman Gupta",
    role: "Co-Founder, boAt",
    image: "/assets/img/college/guests/aman_gupta.png",
    quote: "Build products that solve real problems",
    stars: 5,
    feedback:
      "An inspiring visit that energized our entrepreneurship ecosystem and motivated students to think beyond conventional careers.",
  },
  {
    name: "Ashneer Grover",
    role: "Co-Founder, BharatPe",
    image: "/assets/img/college/guests/ashneer_groveer.png",
    quote: "Entrepreneurship is about creating value at scale",
    stars: 5,
    feedback:
      "His candid insights on startups gave students a real-world perspective that no classroom could replicate.",
  },
  {
    name: "Anand Kumar",
    role: "Distinguished Guest",
    image: "/assets/img/college/guests/anand_kumar_sir.png",
    quote: "Education has the power to transform lives",
    stars: 5,
    feedback:
      "A transformative address on the power of perseverance — students left the hall with renewed belief in their own potential.",
  },
  {
    name: "PK Desai",
    role: "Distinguished Guest",
    image: "/assets/img/college/guests/pkdesaisir.jpeg",
    quote: "Discipline and consistency drive long-term success",
    stars: 5,
    feedback:
      "Shared invaluable wisdom on discipline and institutional leadership that resonated deeply with our faculty and students alike.",
  },
  {
    name: "Rajeev Ahuja",
    role: "Distinguished Guest",
    image: "/assets/img/college/guests/rajeev_ahuja_sir.jpg.jpeg",
    quote: "Innovation begins when curiosity meets execution",
    stars: 5,
    feedback:
      "Brought deep industry insights on innovation and execution — exactly the kind of exposure our students need before entering the workforce.",
  },
  {
    name: "Susheel Mital",
    role: "Distinguished Guest",
    image: "/assets/img/college/guests/susheel_mital_sir.jpg.jpeg",
    quote: "Leadership is about enabling others to excel",
    stars: 5,
    feedback:
      "Guided students on leadership and enabling high-performance teams, drawing from decades of real corporate experience.",
  },
];

export function DistinguishedLeadersSection() {
  return (
    <>
      <style>{`
        .leaders-swiper-pagination.swiper-pagination {
          position: relative !important;
          margin-top: 16px;
        }
        
        .leaders-swiper-pagination .swiper-pagination-bullet {
          background: #D1D5DB;
          opacity: 1;
        }
        
        .leaders-swiper-pagination .swiper-pagination-bullet-active {
          background: #f7941d;
        }
      `}</style>
      <section className="bg-[#FFFFFF] px-6 py-16">
        <div className="mx-auto max-w-[1280px]">
          {/* Header Area */}
          <div className=" w-[80%] max-md:w-[92%] space-y-2">
            <p className="text-xl font-medium leading-tight text-[#6B7280] md:text-2xl">
              Meet visionary leaders
            </p>
            <h2 className="mt-2 text-3xl font-bold leading-tight tracking-tight text-[#f7941d] md:text-5xl">
              Distinguished Leaders & Changemakers
            </h2>
            <p className="mt-3 text-2xl font-medium leading-tight text-[#111827] md:text-4xl">
              Driving innovation and transformation
            </p>
            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-[#6B7280] md:text-lg">
              Meet leaders and changemakers who share practical insights from
              their industries.
            </p>
          </div>

          {/* Main Carousel */}
          <div className="mt-10">
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={24}
              slidesPerView={1.1}
              centeredSlides={false}
              pagination={{ clickable: true, el: ".leaders-swiper-pagination" }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              allowTouchMove={true}
              loop={true}
              grabCursor={true}
              breakpoints={{
                768: {
                  slidesPerView: 2,
                  spaceBetween: 32,
                },
              }}
              className="leaders-swiper"
            >
              {leaders.map((leader, index) => (
                <SwiperSlide key={`${leader.name}-${index}`} className="h-full">
                  <article className="flex h-full flex-col items-start md:min-h-[320px] md:items-stretch md:flex-row">
                    {/* Left Side - Image */}
                    <div className="w-full overflow-hidden md:w-[45%]">
                      <div className="h-64 w-full overflow-hidden md:h-100">
                        <Image
                          src={leader.image}
                          alt={leader.name}
                          className="h-full w-full object-cover grayscale"
                          width={400}
                          height={320}
                        />
                      </div>
                    </div>

                    {/* Right Side - Content */}
                    <div className="flex h-full w-full flex-col p-4 md:min-h-[320px] md:w-[55%]">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold md:pl-6 text-[#111827]">
                          {leader.name}
                        </h3>
                        <span className="mt-2 inline-block md:ml-[-16px] md:pl-9 bg-[#f7941d] px-4 py-1.5 text-sm font-medium text-white">
                          {leader.role}
                        </span>
                        {/* Star rating */}
                        <div className="mt-3 flex items-center gap-0.5 md:pl-6">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <svg
                              key={i}
                              viewBox="0 0 20 20"
                              className="h-4 w-4"
                              fill={i < leader.stars ? "#f7941d" : "none"}
                              stroke={i < leader.stars ? "#f7941d" : "#d1d5db"}
                              strokeWidth={1.5}
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <p className="mt-3 text-sm leading-relaxed md:pl-6 text-[#6B7280]">
                          {leader.quote}
                        </p>
                        <p className="mt-2 text-sm leading-relaxed md:pl-6 text-[#9ca3af] italic">
                          {leader.feedback}
                        </p>
                      </div>
                      {/* <button className="mt-8 flex w-full justify-center gap-2 bg-[#f7941d] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#2563EB] md:mt-6 md:w-auto md:justify-start md:pl-6">
                      View event
                      <span>→</span>
                    </button> */}
                    </div>
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="leaders-swiper-pagination mt-6 flex justify-center">
              {/* pagination will render here */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
