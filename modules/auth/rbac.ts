import { ApiError } from "@/services/api-errors";

type UserRole = "APPLICANT" | "COUNSELOR" | "ADMIN" | "SUPER_ADMIN";

export function assertHasRole(userRole: UserRole, allowedRoles: UserRole[]) {
  if (!allowedRoles.includes(userRole)) {
    throw new ApiError(403, "Forbidden.", "FORBIDDEN");
  }
}
