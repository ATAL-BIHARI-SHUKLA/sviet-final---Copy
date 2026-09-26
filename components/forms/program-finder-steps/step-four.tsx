import { motion } from "framer-motion";
import { MapPin, ArrowLeft } from "lucide-react";

const locations = [
  {
    id: "on-campus",
    label: "On Campus",
    desc: "Traditional college experience",
  },
  { id: "online", label: "Online", desc: "Study from anywhere" },
  { id: "hybrid", label: "Hybrid", desc: "Mix of both worlds" },
];

interface StepFourProps {
  selectedLocation?: string;
  onSelectLocation: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
}

export function StepFour({
  selectedLocation,
  onSelectLocation,
  onNext,
  onBack,
  onSkip,
}: StepFourProps) {
  const canProceed = Boolean(selectedLocation);

  const handleNext = () => {
    if (canProceed) {
      onNext();
    }
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

      <div className="flex items-start justify-between mb-3">
        <h2 className="text-lg md:text-xl font-light text-gray-900">
          Learning Environment
        </h2>
        <button
          onClick={onSkip}
          className="text-sm text-gray-600 hover:text-[#FF6A00] transition-colors underline underline-offset-4"
        >
          Skip this step
        </button>
      </div>
      <p className="text-sm text-gray-600 mb-12">
        Optional: Help us narrow down your options
      </p>

      <div className="space-y-10 max-w-3xl">
        {/* Location Selection */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-[#FF6A00]/10 rounded-lg">
              <MapPin className="w-5 h-5 text-[#FF6A00]" />
            </div>
            <h3 className="text-base font-medium text-gray-900">
              Learning Environment
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {locations.map((location, index) => {
              const isSelected = selectedLocation === location.id;

              return (
                <motion.button
                  key={location.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onSelectLocation(location.id)}
                  className={`p-5 rounded-xl border-2 transition-all duration-300 text-left ${
                    isSelected
                      ? "border-[#FF6A00] bg-[#FF6A00]/5 shadow-lg shadow-[#FF6A00]/10"
                      : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
                  }`}
                >
                  <h4 className="font-medium mb-1 text-gray-900">
                    {location.label}
                  </h4>
                  <p className="text-sm text-gray-600">{location.desc}</p>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="mt-3 inline-flex items-center gap-1 text-sm text-[#FF6A00] font-medium"
                    >
                      <span className="w-1.5 h-1.5 bg-[#FF6A00] rounded-full" />
                      Selected
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-4 pt-8">
          <button
            onClick={handleNext}
            disabled={!canProceed}
            className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all duration-300 ${
              canProceed
                ? "bg-[#FF6A00] text-white hover:bg-[#E55A00] hover:shadow-lg"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            See Results
          </button>
          <button
            onClick={onSkip}
            className="px-6 py-3 border-2 border-gray-200 rounded-xl font-medium text-gray-900 hover:border-gray-300 transition-all"
          >
            Skip
          </button>
        </div>
      </div>
    </motion.div>
  );
}
