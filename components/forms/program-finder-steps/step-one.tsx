import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const interests = [
  { id: "engineering", label: "Engineering & Technology", icon: "⚙️" },
  { id: "management", label: "Business & Management", icon: "📊" },
  { id: "pharmacy", label: "Pharmacy & Health Sciences", icon: "💊" },
  { id: "computer", label: "Computer Applications & IT", icon: "💻" },
  { id: "hospitality", label: "Hotel Management & Hospitality", icon: "🏨" },
  { id: "law", label: "Law & Legal Studies", icon: "⚖️" },
  { id: "education", label: "Education & Arts", icon: "🎓" },
  { id: "paramedical", label: "Paramedical & Allied Health", icon: "🏥" },
];

interface StepOneProps {
  selected?: string;
  onSelect: (value: string) => void;
  onNext: () => void;
}

export function StepOne({ selected, onSelect, onNext }: StepOneProps) {
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
      <h2 className="text-lg md:text-xl font-light mb-3 text-gray-900">What are you interested in?</h2>
      <p className="text-sm text-gray-600 mb-12">Choose the field that excites you the most</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {interests.map((interest, index) => {
          const isSelected = selected === interest.id;

          return (
            <motion.button
              key={interest.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelect(interest.id)}
              className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 text-left overflow-hidden ${
                isSelected
                  ? 'border-[#FF6A00] bg-[#FF6A00]/5 shadow-lg shadow-[#FF6A00]/10'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
              }`}
            >
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl ${
                  isSelected ? 'opacity-20' : ''
                }`}
                style={{
                  background: 'radial-gradient(circle at center, #FF6A0040, transparent 70%)',
                } as React.CSSProperties}
              />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`p-3 rounded-xl transition-all duration-300 ${
                      isSelected
                        ? 'bg-[#FF6A00] text-white'
                        : 'bg-gray-100 text-gray-700 group-hover:bg-[#FF6A00]/10'
                    }`}
                  >
                    <span className="text-xl leading-none">{interest.icon}</span>
                  </div>
                  <ChevronRight
                    className={`w-5 h-5 transition-all duration-300 ${
                      isSelected ? 'text-[#FF6A00]' : 'text-gray-400 group-hover:text-gray-600'
                    }`}
                  />
                </div>

                <h3 className="text-base font-medium mb-1 text-gray-900">{interest.label}</h3>
                {isSelected && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="text-sm text-[#FF6A00]"
                  >
                    Selected ✓
                  </motion.p>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-8 text-center"
      >
        <button className="text-gray-600 hover:text-[#FF6A00] transition-colors duration-300 text-sm underline underline-offset-4">
          Not sure? Start with any interest
        </button>
      </motion.div>
    </motion.div>
  );
}
