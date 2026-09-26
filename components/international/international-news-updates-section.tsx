import Image from "next/image";
import Link from "next/link";

const NEWS_ITEMS = [
  {
    title: "Reporting for freshers students",
    description: "Reporting for freshers students will commence from the 10th of July onwards.",
    imageSrc: "/assets/img/college/management/shubham-sir..jpg",
  },
  {
    title: "SVGOI Welcomes Canadian Delegation from Humber College for Enhancing Global Ties",
    description:
      "SVGOI is set to welcome a distinguished delegation from The Humber College Institute of Technology and Advanced Learning, Canada, as part of its visit...",
    imageSrc: "/assets/img/campus-life/image2.png",
  },
  {
    title: "Inspiring the Next Generation: A Strategic Dialogue with Dr. Tanu Jain IAS",
    description: "Dr. Tanu Jain, physician and former IAS officer, inspired students with practical insights.",
    imageSrc: "/assets/img/campus-life/image1.png",
  },
] as const;

export function InternationalNewsUpdatesSection() {
  return (
    <section className="bg-background py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <h2 className="text-xl font-semibold leading-tight text-[#111827] md:text-5xl">
          Stay Up To Date With the
          <br />
          <span className=" ">
            International Community News & Updates
          </span>
        </h2>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative">
            <div className="max-h-150 overflow-y-auto pr-5 [scrollbar-color:#b7b7d5_transparent] [scrollbar-width:thin]">
              {NEWS_ITEMS.map((item, index) => (
                <article
                  key={item.title}
                  className={`grid gap-5 py-8 md:grid-cols-[1fr_auto] md:items-center ${index < NEWS_ITEMS.length - 1 ? "border-b border-[#c9cce0]" : ""}`}
                >
                  <div>
                    <h3 className="flex items-start gap-3 text-[1rem] font-medium leading-[1.3] text-[#111827]">
                      {/* <span className="mt-0.5 text-md leading-none text-[#5aaab2]">▸</span> */}
                      <span>{item.title}</span>
                    </h3>
                    <p className="mt-6 max-w-2xl  font-normal leading-[1.3] text-[#111827]">{item.description}</p>
                    <Link
                      href="/international"
                      className="mt-5 inline-flex items-center gap-2 text-[1.25rem] font-bold leading-[1.3] text-[#4c4bcf] transition hover:text-[#3635b5]"
                    >
                      Read more <span aria-hidden="true" className="text-[1.5rem] leading-none">›</span>
                    </Link>
                  </div>
                  <div className="relative h-28 w-44 overflow-hidden rounded-2xl md:h-32 md:w-50">
                    <Image src={item.imageSrc} alt={item.title} fill sizes="200px" className="object-cover" />
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <article className="relative min-h-85 overflow-hidden rounded-3xl bg-linear-to-br from-[#2f2a98] via-[#3933a1] to-[#4e48ad] p-7 text-white md:p-8">
              <div className="pointer-events-none absolute -bottom-32 -right-16 h-88 w-88 rounded-full border border-white/12" />
              <div className="pointer-events-none absolute -bottom-20 -right-8 h-64 w-64 rounded-full bg-white/6" />
              <div className="pointer-events-none absolute right-6 top-6 inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-white/12 text-4xl">💡</div>

              <h3 className="max-w-xl text-[1.25rem] font-bold leading-[1.3]">
                SVGOI Welcomes Canadian Delegation from Humber College for Enhancing Global Ties
              </h3>
              <p className="mt-6 max-w-2xl text-base font-normal leading-[1.3] text-white/90">
                SVGOI is set to welcome a distinguished delegation from The Humber College Institute of Technology and Advanced Learning, Canada, as part of its visit...
              </p>
              <Link href="/international" className="mt-6 inline-flex items-center gap-2 text-[1.25rem] font-bold leading-[1.3] text-white hover:text-[#e6e8ff]">
                Read more <span aria-hidden="true" className="text-[1.5rem] leading-none">›</span>
              </Link>
            </article>

            <article className="min-h-72.5 rounded-3xl border border-[#b8bbd4] bg-white p-7 md:p-8">
              <span className="inline-flex rounded-full bg-[#d3a654] px-5 py-1.5 text-base font-semibold text-white md:text-[22px]">Upcoming events</span>
              <h3 className="mt-5 text-[1.25rem] font-bold leading-[1.3] text-[#111827]">Reporting for freshers students</h3>
              <p className="mt-6 max-w-2xl text-base font-normal leading-[1.3] text-[#111827]">
                Reporting for freshers students will be commencing from the 10th of July onwards.
              </p>
              <Link href="/international" aria-label="Read more about reporting for freshers" className="mt-5 inline-flex text-[1.5rem] font-bold leading-none text-[#5b53d7] hover:text-[#4a43c0]">
                ›
              </Link>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}


