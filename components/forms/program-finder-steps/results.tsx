import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, IndianRupee, RefreshCw, TrendingUp } from "lucide-react";

const programMap: Record<
  string,
  { title: string; duration: string; department: string; slug: string }[]
> = {
  engineering: [
    {
      title: "B.Tech Computer Science Engineering",
      duration: "4 Years",
      department: "Engineering",
      slug: "btech-computer-science-engineering",
    },
    {
      title: "B.Tech Artificial Intelligence",
      duration: "4 Years",
      department: "Engineering",
      slug: "btech-artificial-intelligence",
    },
    {
      title: "B.Tech Electronics & Communication Engineering",
      duration: "4 Years",
      department: "Engineering",
      slug: "btech-electronics-communication-engineering",
    },
    {
      title: "B.Tech Mechanical Engineering",
      duration: "4 Years",
      department: "Engineering",
      slug: "btech-mechanical-engineering",
    },
    {
      title: "B.Tech Civil Engineering",
      duration: "4 Years",
      department: "Engineering",
      slug: "btech-civil-engineering",
    },
    {
      title: "M.Tech Computer Science Engineering",
      duration: "2 Years",
      department: "Engineering",
      slug: "mtech-computer-science-engineering",
    },
  ],
  management: [
    {
      title: "Master of Business Administration",
      duration: "2 Years",
      department: "Management",
      slug: "master-of-business-administration",
    },
    {
      title: "Bachelor of Business Administration",
      duration: "3 Years",
      department: "Management",
      slug: "bachelor-of-business-administration",
    },
    {
      title: "Masters of Commerce",
      duration: "2 Years",
      department: "Commerce",
      slug: "masters-of-commerce",
    },
  ],
  pharmacy: [
    {
      title: "B.Pharmacy",
      duration: "4 Years",
      department: "Pharmacy",
      slug: "bpharmacy",
    },
    {
      title: "Pharma.D",
      duration: "6 Years",
      department: "Pharmacy",
      slug: "pharmad",
    },
    {
      title: "M.Pharmaceutics",
      duration: "2 Years",
      department: "Pharmacy",
      slug: "mpharmaceutics",
    },
  ],
  computer: [
    {
      title: "Bachelor of Computer Applications",
      duration: "3 Years",
      department: "Computer Applications",
      slug: "bachelor-of-computer-applications",
    },
    {
      title: "Master of Computer Applications",
      duration: "2 Years",
      department: "Computer Applications",
      slug: "master-of-computer-applications",
    },
    {
      title: "B.Sc Information Technology",
      duration: "3 Years",
      department: "Computer Applications",
      slug: "bsc-information-technology",
    },
  ],
  hospitality: [
    {
      title: "Bachelor of Hotel Management & Catering Technology",
      duration: "4 Years",
      department: "Hotel Management",
      slug: "bachelor-of-hotel-management-catering-technology",
    },
    {
      title: "B.Voc (Hospitality & Catering Management)",
      duration: "3 Years",
      department: "Hotel Management",
      slug: "bvoc-hotel-management-catering",
    },
  ],
  law: [
    { title: "LLB", duration: "3 Years", department: "Law", slug: "llb" },
    {
      title: "B.A. L.L.B",
      duration: "5 Years",
      department: "Law",
      slug: "ba-llb",
    },
  ],
  education: [
    {
      title: "Bachelor in Education",
      duration: "2 Years",
      department: "Education",
      slug: "bachelor-in-education",
    },
    {
      title: "Bachelor of Arts",
      duration: "3 Years",
      department: "Arts & Education",
      slug: "bachelor-of-arts",
    },
  ],
  paramedical: [
    {
      title: "Bachelor of Physiotherapy",
      duration: "4.5 Years",
      department: "Medical Sciences & Allied Health",
      slug: "bachelor-of-physiotherapy",
    },
    {
      title: "B.Sc Medical Lab Sciences",
      duration: "3 Years",
      department: "Medical Sciences & Allied Health",
      slug: "bsc-medical-lab-sciences",
    },
    {
      title: "B.Sc Radiology & Imaging Technology",
      duration: "3 Years",
      department: "Medical Sciences & Allied Health",
      slug: "bsc-radiology-imaging-technology",
    },
  ],
};

export interface UserSelections {
  interest?: string;
  career?: string;
  academicPreference?: string;
  location?: string;
  budget?: string;
}

export interface ProgramRecommendation {
  id: string;
  slug: string;
  title: string;
  shortDescription?: string | null;
  durationMonths: number;
  tuitionCents: number | null;
  department?: string | null;
  level?: string | null;
}

type DisplayRecommendation = ProgramRecommendation & {
  duration?: string;
  department?: string;
};

interface ResultsProps {
  selections: UserSelections;
  recommendations: ProgramRecommendation[];
  onRestart: () => void;
}

function formatTuitionFromCents(tuitionCents: number | null) {
  if (tuitionCents == null) {
    return "Contact Admissions";
  }

  const rupees = Math.round(tuitionCents / 100);
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(rupees);
}

function formatDuration(durationMonths: number) {
  const years = Math.floor(durationMonths / 12);
  const months = durationMonths % 12;

  if (years > 0 && months > 0) {
    return `${years} year${years > 1 ? "s" : ""} ${months} month${months > 1 ? "s" : ""}`;
  }

  if (years > 0) {
    return `${years} year${years > 1 ? "s" : ""}`;
  }

  return `${durationMonths} months`;
}

export function Results({
  selections,
  recommendations,
  onRestart,
}: ResultsProps) {
  const fallbackRecommendations: DisplayRecommendation[] = (
    programMap[selections.interest ?? ""] ?? []
  ).map((program, index) => ({
    id: `${program.slug}-${index}`,
    slug: program.slug,
    title: program.title,
    shortDescription: `${program.department} program at SVGOI`,
    durationMonths: 0,
    tuitionCents: 0,
    duration: program.duration,
    department: program.department,
  }));

  const displayRecommendations: DisplayRecommendation[] =
    recommendations.length > 0
      ? recommendations.map((recommendation) => ({
          ...recommendation,
          department: recommendation.department ?? undefined,
        }))
      : fallbackRecommendations;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50"
    >
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF6A00]/10 border border-[#FF6A00]/30 mb-6">
              <TrendingUp className="w-4 h-4 text-[#FF6A00]" />
              <span className="text-sm text-[#FF6A00] font-medium">
                Results Ready
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-light mb-4 text-gray-900">
              Your Recommended Programs
            </h1>
            <p className="text-sm text-gray-600 max-w-2xl">
              Based on your selections, we&apos;ve found{" "}
              {displayRecommendations.length} programs that match your goals.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12 p-6 rounded-2xl bg-[#FF6A00]/5 border border-[#FF6A00]/20"
        >
          <h3 className="text-sm font-medium text-[#FF6A00] mb-2">
            WHY THESE PROGRAMS?
          </h3>
          <p className="text-gray-700">
            Based on your interest in{" "}
            <span className="text-[#FF6A00] font-medium capitalize">
              {selections.interest ?? "your selected field"}
            </span>{" "}
            and career goals, these recommendations offer the best fit.
          </p>
        </motion.div>

        {displayRecommendations.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-gray-600">
            No recommendations are available right now. Please try again.
          </div>
        ) : (
          <div className="space-y-6">
            {displayRecommendations.map((program, index) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-[#FF6A00]/50 transition-all hover:shadow-lg"
              >
                <div className="p-8">
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {program.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {program.shortDescription ??
                        `${program.department ?? "Program"} program at SVGOI`}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-[#FF6A00] shrink-0 mt-1" />
                      <div>
                        <p className="text-sm text-gray-600">Duration</p>
                        <p className="font-medium text-gray-900">
                          {program.duration ??
                            formatDuration(program.durationMonths)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <IndianRupee className="w-5 h-5 text-[#FF6A00] shrink-0 mt-1" />
                      <div>
                        <p className="text-sm text-gray-600">Fees</p>
                        <p className="font-medium text-gray-900">
                          {program.tuitionCents != null &&
                          program.tuitionCents > 0
                            ? formatTuitionFromCents(program.tuitionCents)
                            : "Contact Admissions"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <a
                    href="https://admission.sviet.ac.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#FF6A00] px-6 py-3 text-sm font-medium text-white transition-all shadow-lg hover:bg-[#E55A00] hover:shadow-xl"
                  >
                    Apply Now
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 flex justify-center"
        >
          <button
            type="button"
            onClick={onRestart}
            className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl border-2 border-gray-200 font-medium text-gray-900 hover:border-[#FF6A00] hover:text-[#FF6A00] transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            Start Over
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
