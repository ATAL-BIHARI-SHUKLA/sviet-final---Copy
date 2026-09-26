type BadgeType = "lead" | "application" | "source";

type StatusBadgeProps = {
  status: string;
  type: BadgeType;
};

const leadStatusColors: Record<string, string> = {
  NEW: "bg-blue-100 text-blue-700",
  ASSIGNED: "bg-purple-100 text-purple-700",
  CONTACTED: "bg-yellow-100 text-yellow-700",
  NURTURING: "bg-orange-100 text-orange-700",
  QUALIFIED: "bg-teal-100 text-teal-700",
  CONVERTED: "bg-green-100 text-green-700",
  DISQUALIFIED: "bg-slate-200 text-slate-700",
  LOST: "bg-red-100 text-red-700",
};

const sourceColors: Record<string, string> = {
  APPLY_NOW: "bg-blue-100 text-blue-700",
  SCHOLARSHIP_CHECK: "bg-purple-100 text-purple-700",
  PROGRAM_FINDER: "bg-teal-100 text-teal-700",
  CONTACT_ENQUIRY: "bg-orange-100 text-orange-700",
  EVENT_REGISTRATION: "bg-green-100 text-green-700",
};

const applicationStatusColors: Record<string, string> = {
  DRAFT: "bg-slate-200 text-slate-700",
  IN_PROGRESS: "bg-blue-100 text-blue-700",
  SUBMITTED: "bg-purple-100 text-purple-700",
  UNDER_REVIEW: "bg-yellow-100 text-yellow-700",
  ACCEPTED: "bg-green-100 text-green-700",
  REJECTED: "bg-red-100 text-red-700",
  WAITLISTED: "bg-orange-100 text-orange-700",
};

function getColorClass(type: BadgeType, normalizedStatus: string) {
  if (type === "lead") {
    return leadStatusColors[normalizedStatus] ?? "bg-slate-100 text-slate-700";
  }

  if (type === "application") {
    return (
      applicationStatusColors[normalizedStatus] ?? "bg-slate-100 text-slate-700"
    );
  }

  return sourceColors[normalizedStatus] ?? "bg-slate-100 text-slate-700";
}

function formatLabel(status: string) {
  return status
    .toLowerCase()
    .split("_")
    .map((chunk) => `${chunk.charAt(0).toUpperCase()}${chunk.slice(1)}`)
    .join(" ");
}

export function StatusBadge({ status, type }: StatusBadgeProps) {
  const normalizedStatus = status.toUpperCase();
  const colorClass = getColorClass(type, normalizedStatus);

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-sm font-semibold ${colorClass}`}
    >
      {formatLabel(normalizedStatus)}
    </span>
  );
}
