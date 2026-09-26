import { ApiError } from "@/services/api-errors";

export type ApplicationStatus =
  | "DRAFT"
  | "IN_PROGRESS"
  | "SUBMITTED"
  | "UNDER_REVIEW"
  | "DOCS_PENDING"
  | "INTERVIEW_SCHEDULED"
  | "DECISION_PENDING"
  | "ACCEPTED"
  | "REJECTED"
  | "WAITLISTED"
  | "WITHDRAWN";

const ALLOWED_TRANSITIONS: Record<ApplicationStatus, ApplicationStatus[]> = {
  DRAFT: ["IN_PROGRESS", "SUBMITTED", "WITHDRAWN"],
  IN_PROGRESS: ["SUBMITTED", "WITHDRAWN"],
  SUBMITTED: ["UNDER_REVIEW", "WITHDRAWN"],
  UNDER_REVIEW: ["DOCS_PENDING", "INTERVIEW_SCHEDULED", "DECISION_PENDING", "ACCEPTED", "REJECTED", "WAITLISTED"],
  DOCS_PENDING: ["UNDER_REVIEW", "DECISION_PENDING", "REJECTED", "WITHDRAWN"],
  INTERVIEW_SCHEDULED: ["DECISION_PENDING", "REJECTED", "WITHDRAWN"],
  DECISION_PENDING: ["ACCEPTED", "REJECTED", "WAITLISTED"],
  WAITLISTED: ["ACCEPTED", "REJECTED", "WITHDRAWN"],
  ACCEPTED: [],
  REJECTED: [],
  WITHDRAWN: [],
};

export function assertValidTransition(from: ApplicationStatus, to: ApplicationStatus) {
  if (from === to) {
    return;
  }

  if (!ALLOWED_TRANSITIONS[from].includes(to)) {
    throw new ApiError(422, `Invalid application status transition: ${from} -> ${to}.`, "INVALID_STATUS_TRANSITION");
  }
}
