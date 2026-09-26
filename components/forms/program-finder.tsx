"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";

import { postJson } from "@/lib/form-utils";
import { StepOne } from "./program-finder-steps/step-one";
import { StepTwo } from "./program-finder-steps/step-two";
import { StepThree } from "./program-finder-steps/step-three";
import { StepFour } from "./program-finder-steps/step-four";
import {
  Results,
  type ProgramRecommendation,
  type UserSelections,
} from "./program-finder-steps/results";
import { ProgressBar } from "./program-finder-steps/progress-bar";

const TOTAL_STEPS = 5;
const indianMobilePattern = /^[6-9]\d{9}$/;

type ContactStepState = {
  fullName: string;
  email: string;
  phone: string;
};

export type ProgramFinderInitialSelections = {
  interest?: string;
};

type ContactStepErrors = Partial<Record<keyof ContactStepState, string>>;

const initialContactState: ContactStepState = {
  fullName: "",
  email: "",
  phone: "",
};

function splitFullName(fullName: string) {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  const firstName = parts[0] ?? "";
  const lastName = parts.slice(1).join(" ") || ".";

  return { firstName, lastName };
}

type ContactCaptureStepProps = {
  values: ContactStepState;
  errors: ContactStepErrors;
  submitError: string;
  loading: boolean;
  onChange: (field: keyof ContactStepState, value: string) => void;
  onBack: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

function ContactCaptureStep({
  values,
  errors,
  submitError,
  loading,
  onChange,
  onBack,
  onSubmit,
}: ContactCaptureStepProps) {
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
        Almost there! Where should we send your results?
      </h2>
      <p className="text-sm text-gray-600 mb-10">
        Enter your contact details to get your personalized program matches.
      </p>

      <form className="max-w-3xl grid gap-4" onSubmit={onSubmit}>
        <div>
          <input
            type="text"
            placeholder="Full Name"
            value={values.fullName}
            onChange={(event) => onChange("fullName", event.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium outline-none transition focus:border-[#FF6A00]"
          />
          {errors.fullName ? (
            <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
          ) : null}
        </div>

        <div>
          <input
            type="email"
            placeholder="Email Address"
            value={values.email}
            onChange={(event) => onChange("email", event.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium outline-none transition focus:border-[#FF6A00]"
          />
          {errors.email ? (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          ) : null}
        </div>

        <div>
          <input
            type="tel"
            placeholder="Phone Number"
            value={values.phone}
            onChange={(event) => onChange("phone", event.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium outline-none transition focus:border-[#FF6A00]"
          />
          {errors.phone ? (
            <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full rounded-xl bg-[#FF6A00] py-3 text-sm font-medium text-white transition hover:bg-[#E55A00] disabled:opacity-60 md:w-auto md:px-8"
        >
          {loading ? "Getting Matches..." : "Get My Program Matches"}
        </button>
        {submitError ? (
          <p className="text-sm text-red-600">{submitError}</p>
        ) : null}
      </form>
    </motion.div>
  );
}

type ProgramFinderFormProps = {
  initialSelections?: ProgramFinderInitialSelections;
};

export function ProgramFinderForm({
  initialSelections,
}: ProgramFinderFormProps) {
  const searchParams = useSearchParams();
  const urlInterest = searchParams.get("interest") ?? undefined;
  const initialInterest = urlInterest ?? initialSelections?.interest;

  const [currentStep, setCurrentStep] = useState(initialInterest ? 1 : 0);
  const [selections, setSelections] = useState<UserSelections>({
    interest: initialInterest,
  });
  const [contactInfo, setContactInfo] =
    useState<ContactStepState>(initialContactState);
  const [contactErrors, setContactErrors] = useState<ContactStepErrors>({});
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [recommendations, setRecommendations] = useState<
    ProgramRecommendation[]
  >([]);

  useEffect(() => {
    if (!initialInterest) {
      return;
    }

    setSelections((prev) =>
      prev.interest === initialInterest
        ? prev
        : { ...prev, interest: initialInterest },
    );
    setCurrentStep((prev) => (prev === 0 ? 1 : prev));
  }, [initialInterest]);

  const handleSelection = (key: keyof UserSelections, value: string) => {
    setSelections((prev) => ({ ...prev, [key]: value }));
  };

  const nextStep = () => {
    if (currentStep < TOTAL_STEPS - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const skip = () => {
    if (currentStep === 3) {
      setCurrentStep(4);
    } else {
      nextStep();
    }
  };

  const handleContactInfoChange = (
    field: keyof ContactStepState,
    value: string,
  ) => {
    setContactInfo((prev) => ({ ...prev, [field]: value }));
    setContactErrors((prev) => ({ ...prev, [field]: "" }));
    setSubmitError("");
  };

  const validateContactInfo = () => {
    const nextErrors: ContactStepErrors = {};

    if (!contactInfo.fullName.trim()) {
      nextErrors.fullName = "Full name is required.";
    }

    if (!contactInfo.email.trim()) {
      nextErrors.email = "Email is required.";
    }

    if (!contactInfo.phone.trim()) {
      nextErrors.phone = "Phone number is required.";
    } else if (!indianMobilePattern.test(contactInfo.phone.trim())) {
      nextErrors.phone = "Enter a valid Indian mobile number.";
    }

    setContactErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleGetMatches = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateContactInfo()) {
      return;
    }

    if (!selections.interest) {
      setSubmitError("Please complete interest selection before submitting.");
      return;
    }

    setIsLoading(true);
    setSubmitError("");

    try {
      const { firstName, lastName } = splitFullName(contactInfo.fullName);
      const response = await postJson<{
        leadId: string;
        recommendations: ProgramRecommendation[];
      }>("/api/leads/program-finder", {
        firstName,
        lastName,
        email: contactInfo.email.trim(),
        phone: contactInfo.phone.trim(),
        interests: [selections.interest],
        careers: selections.career ? [selections.career] : [],
        academicPreference: selections.academicPreference,
        preferredMode: selections.location,
        budgetRange: selections.budget,
      });

      const isSuccessful =
        response.success === true || (response as { ok?: boolean }).ok === true;
      if (!isSuccessful) {
        setSubmitError(
          response.error?.message ?? "Unable to fetch your matches right now.",
        );
        return;
      }

      setRecommendations(response.data?.recommendations ?? []);
      setShowResults(true);
    } catch {
      setSubmitError("Unable to fetch your matches right now.");
    } finally {
      setIsLoading(false);
    }
  };

  const restart = () => {
    setCurrentStep(0);
    setSelections({});
    setContactInfo(initialContactState);
    setContactErrors({});
    setSubmitError("");
    setRecommendations([]);
    setIsLoading(false);
    setShowResults(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="inline-block mb-6"
          >
            <Sparkles className="w-12 h-12 text-[#FF6A00]" />
          </motion.div>
          <h2 className="text-lg font-light text-gray-900">
            Finding your perfect programs...
          </h2>
        </motion.div>
      </div>
    );
  }

  if (showResults) {
    return (
      <Results
        selections={selections}
        recommendations={recommendations}
        onRestart={restart}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="py-8 px-4 border-b border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl md:text-2xl font-light mb-2 text-gray-900"
          >
            Find Your Perfect Program
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-sm text-gray-600"
          >
            Answer a few quick questions to discover programs tailored to your
            goals
          </motion.p>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <ProgressBar currentStep={currentStep + 1} totalSteps={TOTAL_STEPS} />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {currentStep === 0 && (
              <StepOne
                key="step-1"
                selected={selections.interest}
                onSelect={(value) => handleSelection("interest", value)}
                onNext={nextStep}
              />
            )}
            {currentStep === 1 && (
              <StepTwo
                key="step-2"
                selected={selections.career}
                onSelect={(value) => handleSelection("career", value)}
                onNext={nextStep}
                onBack={prevStep}
              />
            )}
            {currentStep === 2 && (
              <StepThree
                key="step-3"
                selected={selections.academicPreference}
                onSelect={(value) =>
                  handleSelection("academicPreference", value)
                }
                onNext={nextStep}
                onBack={prevStep}
              />
            )}
            {currentStep === 3 && (
              <StepFour
                key="step-4"
                selectedLocation={selections.location}
                onSelectLocation={(value) => handleSelection("location", value)}
                onNext={nextStep}
                onBack={prevStep}
                onSkip={skip}
              />
            )}
            {currentStep === 4 && (
              <ContactCaptureStep
                key="step-5"
                values={contactInfo}
                errors={contactErrors}
                submitError={submitError}
                loading={isLoading}
                onChange={handleContactInfoChange}
                onBack={prevStep}
                onSubmit={handleGetMatches}
              />
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-4 py-8 border-t border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto text-center text-sm text-gray-600">
          <p>
            All programs at SVGOI are designed with industry standards and
            placement excellence in mind
          </p>
        </div>
      </footer>
    </div>
  );
}
