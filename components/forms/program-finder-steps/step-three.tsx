import { motion } from 'framer-motion';
import { Brain, BookOpen, Users2, Target, ArrowLeft } from 'lucide-react';

const preferences = [
  {
    id: 'hands-on',
    label: 'Hands-on & Practical',
    icon: Target,
    desc: 'Learn by doing with labs and projects',
  },
  {
    id: 'theoretical',
    label: 'Theoretical & Research',
    icon: Brain,
    desc: 'Deep dive into concepts and analysis',
  },
  {
    id: 'balanced',
    label: 'Balanced Approach',
    icon: BookOpen,
    desc: 'Mix of theory and practical work',
  },
  {
    id: 'collaborative',
    label: 'Team & Collaborative',
    icon: Users2,
    desc: 'Group projects and teamwork focused',
  },
];

interface StepThreeProps {
  selected?: string;
  onSelect: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepThree({ selected, onSelect, onNext, onBack }: StepThreeProps) {
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

      <h2 className="text-lg md:text-xl font-light mb-3 text-gray-900">Academic preference</h2>
      <p className="text-sm text-gray-600 mb-12">How do you learn best?</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
        {preferences.map((pref, index) => {
          const Icon = pref.icon;
          const isSelected = selected === pref.id;

          return (
            <motion.button
              key={pref.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.06 }}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelect(pref.id)}
              className={`group relative p-8 rounded-2xl border-2 transition-all duration-300 text-left overflow-hidden ${
                isSelected
                  ? 'border-[#FF6A00] bg-[#FF6A00]/5 shadow-lg shadow-[#FF6A00]/10'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
              }`}
            >
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'radial-gradient(circle at 50% 50%, #FF6A00 0%, transparent 70%)',
                  filter: 'blur(60px)',
                }}
              />

              <div className="relative z-10 flex items-start gap-4">
                <div
                  className={`shrink-0 p-4 rounded-xl transition-all duration-300 ${
                    isSelected
                      ? 'bg-[#FF6A00] text-white shadow-lg shadow-[#FF6A00]/20'
                      : 'bg-gray-100 text-gray-700 group-hover:bg-[#FF6A00]/10'
                  }`}
                >
                  <Icon className="w-7 h-7" />
                </div>

                <div className="flex-1">
                  <h3 className="text-base font-medium mb-2 text-gray-900">{pref.label}</h3>
                  <p className="text-sm text-gray-600">{pref.desc}</p>

                  {isSelected && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-[#FF6A00] mt-3 font-medium"
                    >
                      Perfect choice! ✓
                    </motion.p>
                  )}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
