"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";

const BG_URL =
  "https://res.cloudinary.com/startup-grind/image/upload/c_limit,dpr_2,f_auto,g_center,h_1440,q_auto:good,w_2048/v1/gcs/platform-data-goog/event_wrapup/DSC05771.JPG";

type Card = {
  title: string;
  name: string;
  description: string;
  image: string;
};

const CARDS: Card[] = [
  {
    title: "Guiding Excellence: Leadership Behind the Scenes",
    name: "Er. Ankur Gill",
    description:
      "As the Director of Operations at ISTE Swami Vivekanand Institute of Engineering and Technology, I am passionately committed to cultivating an environment of excellence, innovation, and growth within our institution. My focus is on delivering exceptional educational experiences and creating opportunities for our students to excel in their academic and professional pursuits. I am privileged to collaborate with a dedicated team of professionals who share a profound passion for academic advancement and student success. Our mission at ISTE SVIET is to empower students with the knowledge, skills, and values necessary to thrive in an ever-changing world.",
    image: "/assets/img/college/management/ankur-sir.jpg",
  },
  {
    title: "Strategic Vision: Leadership Working Behind the Scenes",
    name: "Er. Vishal Garg",
    description:
      "As the Director of Administration at ISTE Swami Vivekanand Institute of Engineering and Technology, I oversee the operational framework that enables our institute to run efficiently and effectively. My role is to ensure that our students and faculty have access to the best resources, facilities, and support systems, enabling them to thrive in an environment conducive to learning and innovation. Together, we are building an institution that stands at the forefront of educational excellence, with a focus on leadership, sustainability, and continuous improvement.",
    image: "/assets/img/college/management/vishal-sir.jpg",
  },
  {
    title: "Leadership and Insight from the Desk of the Faculty Adviser",
    name: "Ms. Shivani Guleria",
    description:
      "As the Faculty Adviser of the ISTE SVIET Chapter, I am committed to fostering an environment that promotes innovation, creativity, and excellence in our students. Our mission is to equip students with the technical skills and practical knowledge required for successful careers, while also preparing them to contribute meaningfully to society. We aim to build future leaders who are not only proficient in their field but also conscious of the role they play in sustainable development.",
    image: "/assets/img/college/management/ashwani-sir.jpg",
  },
];

function DepartmentCard({ title, name, description, image }: Card) {
  return (
    <div className="grid grid-cols-1 gap-3 py-12 md:gap-4 lg:grid-cols-2 lg:gap-8">
      <div className="flex flex-col justify-center">
        <p className="text-3xl font-medium text-white">{title}</p>
        <p className="mt-3 border-l-4 border-[#fea700] pl-2 text-lg text-white">
          {name}
        </p>
        <p className="pt-6 text-justify text-white">{description}</p>
      </div>
      <div className="flex items-center justify-center">
        <div className="relative h-[460px] w-4/5">
          <Image
            src={image}
            alt={name}
            fill
            className="rounded-[10%_0%_10%_0%] border-b-8 border-[#fea700] object-cover shadow-md"
          />
        </div>
      </div>
    </div>
  );
}

export function IsteDepartment() {
  return (
    <div
      className="mt-16"
      style={{
        backgroundImage: `url(${BG_URL})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundColor: "rgba(0,0,0,0.9)",
        backgroundBlendMode: "overlay",
      }}
    >
      <style>{`
        .dept-swiper .swiper-button-next,
        .dept-swiper .swiper-button-prev {
          color: #fea700;
        }
        .dept-swiper .swiper-pagination-bullet { background: #d1d5db; opacity: 1; }
        .dept-swiper .swiper-pagination-bullet-active { background: #fea700; }
      `}</style>

      <div className="mx-auto w-10/12 py-12 lg:mt-[-120px]">
        <Swiper
          modules={[Navigation, Autoplay, Pagination]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          className="dept-swiper w-full"
        >
          {CARDS.map((card) => (
            <SwiperSlide key={card.name} className="mx-auto w-[95%] px-2">
              <DepartmentCard {...card} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
