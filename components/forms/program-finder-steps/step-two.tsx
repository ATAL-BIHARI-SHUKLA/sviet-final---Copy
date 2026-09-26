import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const careers = [
  {
    id: "software-engineer",
    label: "Software Engineer / Developer",
    icon: "💻",
  },
  { id: "entrepreneur", label: "Entrepreneur / Startup Founder", icon: "🚀" },
  { id: "manager", label: "Business Manager / MBA Professional", icon: "📈" },
  { id: "researcher", label: "Researcher / Scientist", icon: "🔬" },
  {
    id: "doctor-pharma",
    label: "Pharmaceutical / Healthcare Professional",
    icon: "💊",
  },
  { id: "hotelier", label: "Hospitality & Tourism Professional", icon: "🏨" },
  { id: "legal", label: "Lawyer / Legal Professional", icon: "⚖️" },
  { id: "educator", label: "Teacher / Educator", icon: "📚" },
];

interface StepTwoProps {
  selected?: string;
  onSelect: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepTwo({ selected, onSelect, onNext, onBack }: StepTwoProps) {
  const handleSelect = (id: string) => {
    onSelect(id);
    setTimeout(() => onNext(), 300);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4 }}
    >
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm">Back</span>
      </button>

      <h2 className="text-lg md:text-xl font-light mb-3 text-gray-900">
        Preferred career outcome
      </h2>
      <p className="text-sm text-gray-600 mb-12">
        What role do you see yourself in?
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {careers.map((career, index) => {
          const isSelected = selected === career.id;

          return (
            <motion.button
              key={career.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelect(career.id)}
              className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                isSelected
                  ? "border-[#FF6A00] bg-[#FF6A00]/5 shadow-lg shadow-[#FF6A00]/10"
                  : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
              }`}
            >
              <div className="absolute inset-0 bg-linear-to-br from-gray-50/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10">
                <div
                  className={`inline-flex p-3 rounded-xl mb-4 transition-all duration-300 ${
                    isSelected
                      ? "bg-[#FF6A00] text-white shadow-lg shadow-[#FF6A00]/20"
                      : "bg-gray-100 text-gray-700 group-hover:bg-[#FF6A00]/10"
                  }`}
                >
                  <span className="text-xl leading-none">{career.icon}</span>
                </div>

                <h3 className="font-medium mb-1 text-gray-900">
                  {career.label}
                </h3>

                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-4 right-4 w-6 h-6 bg-[#FF6A00] rounded-full flex items-center justify-center"
                  >
                    <span className="text-white text-sm">✓</span>
                  </motion.div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
