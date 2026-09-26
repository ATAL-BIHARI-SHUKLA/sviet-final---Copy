import Image from "next/image";

const logos = [
  { name: "Amazon", src: "/assets/img/companies/amazon.png" },
  { name: "TCS", src: "/assets/img/companies/tcs.png" },
  { name: "Infosys", src: "/assets/img/companies/infosys.png" },
  { name: "Wipro", src: "/assets/img/companies/wipro.png" },
  { name: "Deloitte", src: "/assets/img/companies/deloitte.png" },
  { name: "Dabur", src: "/assets/img/companies/dabur.png" },
  { name: "JIO Digital", src: "/assets/img/companies/jio_digital.png" },
  { name: "Mamsys", src: "/assets/img/companies/mamsys.png" },
  { name: "Calvin", src: "/assets/img/companies/calvin.png" },
];

export function PlacementsSection() {
  return (
    <section className="bg-[#ffffff] px-4 py-10 md:px-6 md:py-16">
      <div className="mx-auto grid max-w-7xl gap-10">
       <Image src={'/assets/img/college/banner_95.png'} height={100} width={1300} alt={'banner'}/>

        <div className="grid gap-6 text-center md:grid-cols-3">
          <article className="rounded-xl bg-white p-6 transition duration-200">
            <p className="text-4xl font-bold text-foreground md:text-5xl">45 LPA</p>
            <p className="mt-2 text-sm font-medium text-[#4b4b4b]">Highest Package</p>
          </article>
          <article className="rounded-xl bg-white p-6 transition duration-200">
            <p className="text-4xl font-bold text-foreground md:text-5xl">500+</p>
            <p className="mt-2 text-sm font-medium text-[#4b4b4b]">Companies Visited</p>
          </article>
          <article className="rounded-xl bg-white p-6 transition duration-200">
            <p className="text-4xl font-bold text-foreground md:text-5xl">2000+</p>
            <p className="mt-2 text-sm font-medium text-[#4b4b4b]">Students Placed Annually</p>
          </article>
          <article className="rounded-xl bg-white p-6 transition duration-200">
            <p className="text-4xl font-bold text-foreground md:text-5xl">95%+</p>
            <p className="mt-2 text-sm font-medium text-[#4b4b4b]">Placement Rate</p>
          </article>
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {logos.map((logo) => (
            <div
              key={logo.name}
              className="flex h-32 items-center justify-center rounded-xl bg-white p-6 transition duration-200 md:h-36"
            >
              <Image
                src={logo.src}
                alt={logo.name}
                height={64}
                width={180}
                className="h-14 w-auto max-w-45 object-contain grayscale transition duration-200 hover:grayscale-0 md:h-16"
                style={{ width: "auto" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
