import Image from "next/image";

const BG_URL =
  "https://utfs.io/f/nsz3ps3WUZRLNLRuHm9rk45hJIB6UAVERY1S0Po7cOimTtlD";

export function IsteHeroSection() {
  return (
    <div className="w-full overflow-hidden text-justify">
      {/* Banner */}
      <section
        className="bg-gradient-to-t from-slate-900 to-slate-50"
        style={{
          backgroundImage: `url(${BG_URL})`,
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
        }}
      >
        <div className="inset-0 bg-gradient-to-t from-black via-gray-800/25 opacity-100">
          <div className="mx-auto max-w-screen-xl px-4 py-8 text-center lg:px-12 lg:py-9">
            {/* animated top line */}
            <div className="relative mx-auto h-44 w-[2px] overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 w-1/2 bg-white"
                style={{ animation: "lineForward 1.5s ease-in-out infinite alternate" }}
              />
            </div>

            <div className="mx-auto max-w-screen-xl px-4 py-8 text-center lg:px-12 lg:py-12">
              <h1 className="mb-2 text-2xl font-bold leading-none tracking-tight text-white md:text-3xl lg:text-4xl">
                WELCOME TO{" "}
                <span className="text-[#ff9602]">ISTE SVIET</span>
              </h1>
              <p className="mb-2 text-lg font-normal text-white sm:px-16 xl:px-48 lg:text-xl">
                Uniting students, educators, and professionals to advance
                technical education and create future leaders.
              </p>
            </div>

            {/* animated bottom line */}
            <div className="relative mx-auto h-44 w-[2px] overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 w-1/2 bg-white"
                style={{ animation: "lineBackward 1.5s ease-in-out infinite alternate-reverse" }}
              />
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes lineForward {
          from { height: 0%; }
          to   { height: 100%; }
        }
        @keyframes lineBackward {
          from { height: 100%; }
          to   { height: 0%; }
        }
      `}</style>

      {/* About / Mission strip */}
      <section className="body-font bg-black pb-24 text-white">
        <div className="mx-auto w-10/12 py-24">
          <div className="mb-20 flex w-full flex-wrap">
            <div className="mb-6 w-full lg:mb-0 lg:w-1/2">
              <h1 className="title-font mb-5 text-2xl font-semibold leading-10 text-white sm:text-3xl lg:text-6xl">
                OUR MISSION
              </h1>
              <div className="h-1 w-20 rounded bg-[#ff9602]" />
            </div>
            <p className="w-full leading-relaxed text-white lg:w-1/2">
              At ISTE SVIET, we aim to bridge the gap between education and
              industry, offering workshops, seminars, and hands-on projects to
              prepare students for the professional world.
            </p>
          </div>
        </div>

        <div className="mx-auto grid w-10/12 grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="w-full">
            <h1 className="title-font mb-5 text-2xl font-semibold leading-10 text-white sm:text-3xl lg:text-4xl">
              Who We Are
            </h1>
            <p className="leading-relaxed text-white/80">
              ISTE SVIET is the newest chapter of the Indian Society for
              Technical Education at SVIET. We are committed to advancing
              technical knowledge and enhancing students' career prospects
              through collaborative efforts and innovative programs.
            </p>
          </div>
          <div className="w-full">
            <div className="relative mx-auto h-64 w-10/12 lg:w-1/2">
              <Image
                src="/Logo.png"
                alt="ISTE SVGOI Logo"
                fill
                className="object-contain"
                style={{ marginTop: "-59px" }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
