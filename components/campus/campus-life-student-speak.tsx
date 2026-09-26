import Image from "next/image";

const studentSpeak = {
  image: "/assets/img/campus-life/image4.png",
  body: "Great learning experience and the college provided me with practical exposure, faculty guidance and excellent support throughout my journey.",
  name: "Yash Khandelwal",
  avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=150&q=80",
};

export function CampusLifeStudentSpeakSection() {
  return (
    <section className="mx-auto w-full max-w-[1280px] px-2 pt-8 md:px-5 md:pt-12">
      <div className="grid items-center gap-5 md:grid-cols-[1fr_1fr] md:gap-10">
        <Image
          src={studentSpeak.image}
          alt="Auditorium"
          width={1200}
          height={800}
          className="h-[260px] w-full rounded-md object-cover md:h-[350px]"
        />

        <article className="rounded-md bg-[#f5f5f5] p-4 md:p-6">
          <p className="text-right text-[14px] font-semibold text-[#f7941d] md:text-[16px]">Students Speak</p>
          <p className="mt-3 text-right text-[13px] leading-[1.45] text-[#2a2a2a] md:text-[15px] md:leading-[1.6]">
            {studentSpeak.body}
          </p>
          <div className="mt-4 flex items-center justify-end gap-3">
            <Image
              src={studentSpeak.avatar}
              alt="Avatar"
              width={64}
              height={64}
              className="h-8 w-8 rounded-full object-cover"
            />
            <p className="text-right text-[20px] font-semibold text-[#111] md:text-[26px]">{studentSpeak.name}</p>
          </div>
        </article>
      </div>
    </section>
  );
}
