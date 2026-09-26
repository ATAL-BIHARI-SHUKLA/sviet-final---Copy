import { beforeEach, describe, expect, it, vi } from "vitest";

import { createApplication, updateApplicationStatus } from "@/modules/applications/applications.service";

const mockPrisma = vi.hoisted(() => ({
  user: { findUnique: vi.fn() },
  intake: { findUnique: vi.fn() },
  application: {
    findUnique: vi.fn(),
    updateMany: vi.fn(),
    findUniqueOrThrow: vi.fn(),
  },
  applicationStatusHistory: { create: vi.fn() },
  $transaction: vi.fn(),
}));

vi.mock("@/lib/db", () => ({ prisma: mockPrisma }));
vi.mock("@/services/activity-log", () => ({ recordActivity: vi.fn() }));

describe("applications service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("blocks applicant creating application for another user", async () => {
    await expect(
      createApplication(
        {
          applicantUserId: "applicant-2",
          programId: "program-1",
          intakeId: "intake-1",
        },
        {
          id: "applicant-1",
          role: "APPLICANT",
        },
      ),
    ).rejects.toMatchObject({
      code: "FORBIDDEN",
      statusCode: 403,
    });
  });

  it("maps duplicate application to conflict", async () => {
    mockPrisma.user.findUnique.mockResolvedValue({ id: "u1", role: "APPLICANT" });
    mockPrisma.intake.findUnique.mockResolvedValue({ id: "i1", isOpen: true, programId: "p1" });
    mockPrisma.$transaction.mockRejectedValue({ code: "P2002" });

    await expect(
      createApplication(
        {
          applicantUserId: "u1",
          programId: "p1",
          intakeId: "i1",
        },
        {
          id: "admin1",
          role: "ADMIN",
        },
      ),
    ).rejects.toMatchObject({
      code: "DUPLICATE_APPLICATION",
      statusCode: 409,
    });
  });

  it("rejects invalid status transition", async () => {
    mockPrisma.application.findUnique.mockResolvedValue({
      id: "app1",
      applicantUserId: "student1",
      status: "SUBMITTED",
      version: 1,
      submittedAt: null,
      decidedAt: null,
      stepProgress: [],
    });

    await expect(
      updateApplicationStatus(
        "app1",
        "ACCEPTED",
        {
          id: "c1",
          role: "COUNSELOR",
        },
      ),
    ).rejects.toMatchObject({
      code: "INVALID_STATUS_TRANSITION",
      statusCode: 422,
    });
  });
});
