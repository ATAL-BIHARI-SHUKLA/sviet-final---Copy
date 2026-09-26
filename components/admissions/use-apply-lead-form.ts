import { useEffect, useState } from "react";

import { postJson } from "@/lib/form-utils";
import {
  type ApplyFormErrors,
  type ApplyFormState,
  type ProgramOption,
  initialApplyForm,
} from "@/components/admissions/types";

const indianMobilePattern = /^[6-9]\d{9}$/;

function splitApplyName(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const firstName = parts[0] ?? "";
  const lastName = parts.slice(1).join(" ") || ".";

  return { firstName, lastName };
}

export function useApplyLeadForm(programs: ProgramOption[], initialProgramSlug?: string | null) {
  const [form, setForm] = useState<ApplyFormState>(initialApplyForm);
  const [errors, setErrors] = useState<ApplyFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (!initialProgramSlug || form.programId) {
      return;
    }

    const selected = programs.find((program) => program.slug === initialProgramSlug);

    if (selected) {
      setForm((previous) => ({
        ...previous,
        programId: selected.id,
      }));
    }
  }, [form.programId, initialProgramSlug, programs]);

  const handleFieldChange = (field: keyof ApplyFormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
    setSubmitError("");
  };

  const validate = () => {
    const nextErrors: ApplyFormErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = "Name is required.";
    }

    if (!form.programId.trim()) {
      nextErrors.programId = "Program is required.";
    }

    if (!form.phone.trim()) {
      nextErrors.phone = "Phone number is required.";
    } else if (!indianMobilePattern.test(form.phone.trim())) {
      nextErrors.phone = "Enter a valid Indian mobile number.";
    }

    if (!form.email.trim()) {
      nextErrors.email = "Email is required.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const { firstName, lastName } = splitApplyName(form.name);
      const selectedProgram = programs.find((program) => program.id === form.programId);

      const response = await postJson<{ leadId: string; message: string }>("/api/leads/apply", {
        firstName,
        lastName,
        email: form.email.trim(),
        phone: form.phone.trim(),
        programId: form.programId,
        programSlug: selectedProgram?.slug,
        course: selectedProgram?.title,
      });

      const isSuccessful = response.success === true || (response as { ok?: boolean }).ok === true;
      if (!isSuccessful) {
        setSubmitError(response.error?.message ?? "Unable to submit right now. Please try again.");
        return;
      }

      setIsSuccess(true);
    } catch {
      setSubmitError("Unable to submit right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    errors,
    isSubmitting,
    submitError,
    isSuccess,
    handleFieldChange,
    handleSubmit,
  };
}
