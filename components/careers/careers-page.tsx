"use client";

import { useRef, useState, type FormEvent } from "react";

const RESUME_MAX_BYTES = 3 * 1024 * 1024; // 3 MB
const RESUME_ACCEPT =
  ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";
const RESUME_ALLOWED_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

/** Reads a File and returns its raw base64 (without the data-URI prefix). */
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      resolve(result.split(",")[1] ?? "");
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

const OPENINGS = [
  "Head of Department – Physiotherapy",
  "Assistant Professor – Cardiac Care Technology",
  "Assistant Professor – Operation Theatre / Anaesthesia Technology",
  "Assistant Professor – Electrical Engineering",
  "Assistant Professor – Mechanical Engineering",
  "Assistant Professor – Mechanical Engineering (AutoCAD)",
  "Assistant Professor – Maths",
  "Assistant Professor – English",
  "Assistant Professor – Physics",
  "Assistant Professor – Chemistry",
  "Assistant Professor – M.Tech CSE",
  "Assistant Professor – BCA / MCA",
  "Technical Trainer – Computer Science & Engineering (CSE)",
  "Soft Skills Trainer",
  "Aptitude Trainer",
  "Hostel Warden – Male / Female",
];

const WHY_US = [
  {
    title: "Innovative Environment",
    body: "Collaborate with forward-thinking educators and professionals.",
  },
  {
    title: "Professional Growth",
    body: "Opportunities for career advancement, training, and development.",
  },
  {
    title: "Inclusive Culture",
    body: "A diverse and inclusive workplace where ideas thrive.",
  },
  {
    title: "State-of-the-art Facilities",
    body: "Modern infrastructure and cutting-edge technology.",
  },
  {
    title: "Recognition",
    body: "Your contributions are valued and celebrated.",
  },
];

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  position: string;
  qualifications: string;
  yearsExperience: string;
  coverLetter: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

const empty: FormState = {
  fullName: "",
  email: "",
  phone: "",
  position: "",
  qualifications: "",
  yearsExperience: "",
  coverLetter: "",
};

function validate(f: FormState): Errors {
  const e: Errors = {};
  if (!f.fullName.trim() || f.fullName.trim().split(/\s+/).length < 2)
    e.fullName = "Enter your full name (first and last).";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email))
    e.email = "Enter a valid email address.";
  if (!/^[6-9]\d{9}$/.test(f.phone.trim()))
    e.phone = "Enter a valid 10-digit Indian mobile number.";
  if (!f.position.trim()) e.position = "Select or enter a position.";
  if (!f.qualifications.trim()) e.qualifications = "Enter your qualifications.";
  if (
    f.yearsExperience === "" ||
    isNaN(Number(f.yearsExperience)) ||
    Number(f.yearsExperience) < 0
  )
    e.yearsExperience = "Enter valid years of experience.";
  return e;
}

export function CareersPage() {
  const [form, setForm] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [resume, setResume] = useState<File | null>(null);
  const [resumeError, setResumeError] = useState("");
  const resumeInputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [serverError, setServerError] = useState("");

  const set = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setResumeError("");

    if (!file) {
      setResume(null);
      return;
    }

    const nameOk = /\.(pdf|doc|docx)$/i.test(file.name);
    if (!RESUME_ALLOWED_MIME_TYPES.includes(file.type) && !nameOk) {
      setResume(null);
      if (resumeInputRef.current) resumeInputRef.current.value = "";
      setResumeError("Resume must be a PDF, DOC, or DOCX file.");
      return;
    }

    if (file.size > RESUME_MAX_BYTES) {
      setResume(null);
      if (resumeInputRef.current) resumeInputRef.current.value = "";
      setResumeError("Resume must be under 3 MB.");
      return;
    }

    setResume(file);
  };

  const clearResume = () => {
    setResume(null);
    setResumeError("");
    if (resumeInputRef.current) resumeInputRef.current.value = "";
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setStatus("loading");
    setServerError("");

    const parts = form.fullName.trim().split(/\s+/);
    const firstName = parts[0];
    const lastName = parts.slice(1).join(" ");

    try {
      let resumePayload:
        | { fileName: string; mimeType: string; fileBase64: string }
        | undefined;

      if (resume) {
        const fileBase64 = await fileToBase64(resume);
        resumePayload = {
          fileName: resume.name,
          mimeType: resume.type || "application/octet-stream",
          fileBase64,
        };
      }

      const res = await fetch("/api/leads/career", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email: form.email.trim(),
          phone: form.phone.trim(),
          position: form.position.trim(),
          qualifications: form.qualifications.trim(),
          yearsExperience: Number(form.yearsExperience),
          coverLetter: form.coverLetter.trim() || undefined,
          resume: resumePayload,
        }),
      });

      if (!res.ok) {
        const json = (await res.json()) as { error?: { message?: string } };
        throw new Error(json.error?.message ?? "Submission failed.");
      }

      setStatus("success");
      setForm(empty);
      clearResume();
    } catch (err) {
      setStatus("error");
      setServerError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  return (
    <div className="bg-white">
      {/* Hero */}
      <div className="bg-[#111827] px-4 py-20 text-center text-white md:py-28">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#f7941d]">
          Join Our Team
        </p>
        <h1 className="mt-3 text-4xl font-bold md:text-5xl">Careers at SVGOI</h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/70">
          Welcome to the Career Page of Swami Vivekanand Group of Institutes. We
          are constantly looking for passionate professionals who want to make an
          impact in the academic world.
        </p>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
        {/* Current Openings */}
        <section>
          <h2 className="text-2xl font-bold text-[#111827] md:text-3xl">
            Current Openings
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {OPENINGS.map((role) => (
              <div
                key={role}
                className="flex items-start gap-3 border border-[#e5e7eb] p-4"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center bg-[#f7941d] text-xs font-bold text-white">
                  ✓
                </span>
                <span className="text-sm font-medium text-[#374151]">{role}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Why Work With Us */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-[#111827] md:text-3xl">
            Why Work With Us?
          </h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_US.map((item) => (
              <div key={item.title} className="border-l-4 border-[#f7941d] pl-4">
                <p className="font-bold text-[#111827]">{item.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-[#6b7280]">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* How to Apply */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-[#111827] md:text-3xl">
            How to Apply
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#6b7280]">
            Fill in the form below or email your CV and cover letter to{" "}
            <a
              href="mailto:career@sviet.ac.in"
              className="font-semibold text-[#f7941d] hover:underline"
            >
              career@sviet.ac.in
            </a>{" "}
            with the subject line mentioning the job title you are applying for.
            For queries call{" "}
            <a
              href="tel:+917341198100"
              className="font-semibold text-[#f7941d] hover:underline"
            >
              +91 73411 98100
            </a>
            .
          </p>
        </section>

        {/* Application Form */}
        <section className="mt-10">
          <div className="border border-[#e5e7eb] p-6 md:p-10">
            <h3 className="text-xl font-bold text-[#111827]">Apply Now</h3>

            {status === "success" ? (
              <div className="mt-8 rounded-none border border-green-300 bg-green-50 p-6 text-center">
                <p className="text-lg font-bold text-green-800">
                  Application submitted!
                </p>
                <p className="mt-2 text-sm text-green-700">
                  Thank you for your interest in joining SVGOI. Our HR team will
                  review your application and be in touch shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-4 text-sm font-semibold text-[#f7941d] hover:underline"
                >
                  Submit another application
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Full Name *" error={errors.fullName}>
                    <input
                      type="text"
                      placeholder="First and last name"
                      value={form.fullName}
                      onChange={set("fullName")}
                      className={input(!!errors.fullName)}
                    />
                  </Field>

                  <Field label="Email Address *" error={errors.email}>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={set("email")}
                      className={input(!!errors.email)}
                    />
                  </Field>

                  <Field label="Phone Number *" error={errors.phone}>
                    <input
                      type="tel"
                      placeholder="10-digit mobile number"
                      value={form.phone}
                      onChange={set("phone")}
                      className={input(!!errors.phone)}
                    />
                  </Field>

                  <Field label="Position Applying For *" error={errors.position}>
                    <select
                      value={form.position}
                      onChange={set("position")}
                      className={input(!!errors.position)}
                    >
                      <option value="">Select a position…</option>
                      {OPENINGS.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                      <option value="Other">Other</option>
                    </select>
                  </Field>

                  <Field label="Qualifications *" error={errors.qualifications}>
                    <input
                      type="text"
                      placeholder="e.g. M.Tech, Ph.D, MBA"
                      value={form.qualifications}
                      onChange={set("qualifications")}
                      className={input(!!errors.qualifications)}
                    />
                  </Field>

                  <Field
                    label="Years of Experience *"
                    error={errors.yearsExperience}
                  >
                    <input
                      type="number"
                      min={0}
                      max={60}
                      placeholder="e.g. 3"
                      value={form.yearsExperience}
                      onChange={set("yearsExperience")}
                      className={input(!!errors.yearsExperience)}
                    />
                  </Field>
                </div>

                <Field label="Cover Letter (optional)" error={errors.coverLetter}>
                  <textarea
                    rows={5}
                    placeholder="Tell us why you want to join SVGOI…"
                    value={form.coverLetter}
                    onChange={set("coverLetter")}
                    className={input(!!errors.coverLetter)}
                  />
                </Field>

                <Field label="Resume / CV (optional)" error={resumeError}>
                  {resume ? (
                    <div className="flex items-center justify-between gap-3 border border-[#d1d5db] bg-white px-3 py-2.5 text-sm">
                      <span className="truncate text-[#111827]" title={resume.name}>
                        {resume.name}
                      </span>
                      <button
                        type="button"
                        onClick={clearResume}
                        className="shrink-0 text-xs font-semibold text-[#f7941d] hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <input
                      ref={resumeInputRef}
                      type="file"
                      accept={RESUME_ACCEPT}
                      onChange={handleResumeChange}
                      className={[
                        "w-full border px-3 py-2.5 text-sm text-[#111827] outline-none transition",
                        "file:mr-3 file:border-0 file:bg-[#f7941d] file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white",
                        "focus:border-[#f7941d] focus:ring-1 focus:ring-[#f7941d]",
                        resumeError
                          ? "border-red-400 bg-red-50"
                          : "border-[#d1d5db] bg-white",
                      ].join(" ")}
                    />
                  )}
                  <p className="mt-1 text-xs text-[#9ca3af]">
                    PDF, DOC, or DOCX · up to 3 MB.
                  </p>
                </Field>

                <p className="text-xs text-[#9ca3af]">
                  Prefer email? You can also send your CV / resume to{" "}
                  <a
                    href="mailto:career@sviet.ac.in"
                    className="text-[#f7941d] hover:underline"
                  >
                    career@sviet.ac.in
                  </a>{" "}
                  with the subject line matching the position above.
                </p>

                {status === "error" && (
                  <p className="text-sm text-red-600">{serverError}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex items-center gap-2 bg-[#f7941d] px-8 py-3 text-sm font-bold text-white transition hover:bg-[#e07b10] disabled:opacity-60"
                >
                  {status === "loading" ? "Submitting…" : "Submit Application"}
                </button>
              </form>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold uppercase tracking-wide text-[#374151]">
        {label}
      </label>
      {children}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}

function input(hasError: boolean) {
  return [
    "w-full border px-3 py-2.5 text-sm text-[#111827] outline-none transition",
    "focus:border-[#f7941d] focus:ring-1 focus:ring-[#f7941d]",
    hasError ? "border-red-400 bg-red-50" : "border-[#d1d5db] bg-white",
  ].join(" ");
}
