"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { FaLinkedinIn, FaInstagram, FaGithub } from "react-icons/fa";

const LEADS = [
  {
    name: "Mr. Niraj Gupta",
    position: "Tech Lead",
    description:
      "As the Tech Lead of the ISTE SVIET Chapter, I am responsible for driving our technological initiatives forward. I lead the development of innovative digital solutions that streamline processes, enhance the member experience, and ensure the seamless integration of emerging technologies into our projects. By fostering a culture of curiosity and problem-solving, I ensure our team remains at the forefront of cutting-edge technological advancements, setting new benchmarks in the industry.",
    image:
      "https://utfs.io/f/nsz3ps3WUZRL7XTsVbyZPFew0cpClJ4f9O3RUWHjaDvbq6AN",
    linkedin: "https://www.linkedin.com/in/niraj-gupta-04b3ba255/",
    instagram: "https://www.instagram.com/nirajgupta851/",
    github: "https://github.com/nirajn45",
  },
  {
    name: "Mr. Nishant Singh",
    position: "Event Lead",
    description:
      "As the Event Lead for ISTE SVIET Chapter, I am dedicated to creating meaningful and impactful events that foster learning, collaboration, and growth within our community. From ideation to execution, I oversee every detail to ensure that each event is not only well-organized but also memorable for our participants. My passion for planning and meticulous attention to detail allow me to curate experiences that bring together academia and industry leaders, inspire innovation, and strengthen the bonds within our chapter.",
    image:
      "https://utfs.io/f/nsz3ps3WUZRLtQODp5h4ehlZSDgBxM8kyvKLcXf74OIbNJuo",
    linkedin:
      "https://www.linkedin.com/in/nishant-singh-14769a208",
    instagram:
      "https://www.instagram.com/nishant.singh_gulu",
    github: "https://github.com/Nishock",
  },
  {
    name: "Ms. Shreya Mishra",
    position: "Management Lead",
    description:
      "In my role as the Management Lead for the ISTE SVIET Chapter, I coordinate across teams to ensure that our initiatives are executed with precision and efficiency. I focus on optimizing workflows, streamlining communication, and driving operational excellence. My responsibility is to create a balanced and productive environment where every team member is empowered to contribute their best. With a keen eye on deadlines and quality, I ensure that our chapter's goals are met.",
    image:
      "https://utfs.io/f/nsz3ps3WUZRL2b7TjIhnayJRkBrloK41heXxTmAVwY3qPIHE",
    linkedin: "https://www.linkedin.com/in/shreya-mishra-471464216/",
    instagram: "https://www.instagram.com/shree_9032/",
    github: "https://github.com/nirajgupta1999",
  },
  {
    name: "Ms. Shakshi",
    position: "Graphic Lead",
    description:
      "As the Graphic Lead of the ISTE SVIET Chapter, I take pride in crafting the visual narrative of our chapter. My role is to design creative assets that not only reflect the values of ISTE but also engage our audience through compelling visuals. Whether it's for events, social media, or internal communications, I ensure that our designs are both innovative and aligned with the latest trends.",
    image:
      "https://utfs.io/f/nsz3ps3WUZRLI8lQxQRcsoLQdRKhpP3Bl8TN9mqkDrUGjaZH",
    linkedin:
      "https://www.linkedin.com/in/sakshi-sharma-621871252",
    instagram:
      "https://www.instagram.com/sakszieee__/",
    github: "https://github.com/saku2342",
  },
];

export function IsteManagementDesk() {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <div className="bg-gradient-to-r from-white to-gray-100 py-12">
      <style>{`
        .iste-mgmt-pagination .swiper-pagination-bullet {
          background: #d1d5db;
          opacity: 1;
        }
        .iste-mgmt-pagination .swiper-pagination-bullet-active {
          background: #ff9602;
        }
      `}</style>

      <div className="mx-auto flex w-10/12 flex-col justify-start">
        <div className="mb-5 flex items-center">
          <span className="mr-3 h-6 border-l-2 border-[#ff9602]" />
          <h1 className="text-sm font-bold md:text-lg">OUR TEAM LEADS</h1>
        </div>
        <h1 className="text-2xl font-semibold md:text-4xl">
          Meet the
          <span className="block py-1 text-2xl text-[#ff9602] md:py-2 md:text-5xl">
            Leadership Team
          </span>
        </h1>
      </div>

      <div className="mx-auto flex w-10/12 flex-wrap items-center">
        {/* Main slider */}
        <div className="w-full lg:w-3/4 lg:pr-8">
          <Swiper
            modules={[Thumbs, Autoplay]}
            thumbs={{
              swiper:
                thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
            }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            className="py-16 md:py-24"
          >
            {LEADS.map((lead) => (
              <SwiperSlide key={lead.name}>
                <div className="flex flex-col items-center gap-8 text-center sm:flex-row sm:items-start sm:text-left">
                  <img
                    src={lead.image}
                    alt={lead.name}
                    className="h-80 w-80 shrink-0 rounded-lg object-cover object-top"
                  />
                  <div className="flex-grow sm:pl-8">
                    <h2 className="title-font text-lg font-medium text-gray-900">
                      {lead.name}
                    </h2>
                    <h3 className="mb-3 text-[#ff9602]">{lead.position}</h3>
                    <p className="mb-4 text-justify text-sm leading-relaxed">
                      {lead.description}
                    </p>
                    <span className="inline-flex gap-3 text-gray-500">
                      {lead.linkedin && (
                        <a
                          href={lead.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="LinkedIn"
                          className="hover:text-[#ff9602] transition-colors"
                        >
                          <FaLinkedinIn />
                        </a>
                      )}
                      {lead.instagram && (
                        <a
                          href={lead.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Instagram"
                          className="hover:text-[#ff9602] transition-colors"
                        >
                          <FaInstagram />
                        </a>
                      )}
                      {lead.github && (
                        <a
                          href={lead.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="GitHub"
                          className="hover:text-[#ff9602] transition-colors"
                        >
                          <FaGithub />
                        </a>
                      )}
                    </span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Thumbnail nav — desktop only */}
        <div className="hidden lg:block lg:w-1/4">
          <Swiper
            modules={[Thumbs]}
            onSwiper={setThumbsSwiper}
            slidesPerView={3}
            direction="vertical"
            watchSlidesProgress
            className="h-[480px]"
          >
            {LEADS.map((lead) => (
              <SwiperSlide
                key={`thumb-${lead.name}`}
                className="cursor-pointer px-4 py-2"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={lead.image}
                    alt={lead.name}
                    className="h-20 w-20 shrink-0 rounded-xl object-cover object-center"
                  />
                  <div>
                    <h2 className="text-md title-font font-medium text-gray-900">
                      {lead.name}
                    </h2>
                    <h3 className="text-sm text-gray-500">{lead.position}</h3>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
