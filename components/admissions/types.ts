export type ProgramOption = {
  id: string;
  slug: string;
  title: string;
  shortDescription?: string | null;
  department?: string | null;
  departmentSlug?: string | null;
  specialization?: string | null;
  specializationSlug?: string | null;
  level?: string | null;
  eligibility?: string | null;
  mode?: string | null;
  durationMonths?: number | null;
  tuitionCents?: number | null;
};

export type ProgramsApiResponse = {
  success?: boolean;
  data?: ProgramOption[];
};

export type ApplyFormState = {
  name: string;
  programId: string;
  phone: string;
  email: string;
};

export type ApplyFormErrors = Partial<Record<keyof ApplyFormState, string>>;

export const initialApplyForm: ApplyFormState = {
  name: "",
  programId: "",
  phone: "",
  email: "",
};
