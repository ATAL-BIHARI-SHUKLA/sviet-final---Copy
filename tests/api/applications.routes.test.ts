import { beforeEach, describe, expect, it, vi } from "vitest";

const requireAuthUser = vi.fn();
const createApplication = vi.fn();
const updateApplicationStep = vi.fn();
const submitApplication = vi.fn();
const updateApplicationStatus = vi.fn();

vi.mock("@/services/auth-context", () => ({ requireAuthUser }));
vi.mock("@/modules/applications/applications.service", () => ({
  createApplication,
  updateApplicationStep,
  submitApplication,
  updateApplicationStatus,
}));

describe("application routes", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("student can create application", async () => {
    requireAuthUser.mockResolvedValue({ id: "s1", role: "APPLICANT", status: "ACTIVE" });
    createApplication.mockResolvedValue({ id: "app1" });

    const { NextRequest } = await import("next/server");
    const { POST } = await import("@/app/api/applications/route");

    const response = await POST(
      new NextRequest("http://localhost/api/applications", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          applicantUserId: "abdbff04-64e2-4d59-8037-c6e41c92efde",
          programId: "c17ecf8d-b9f9-48d3-9651-3c61958aacc0",
          intakeId: "5b5f48ae-9bb9-4799-8a87-177878672f89",
        }),
      }),
    );

    expect(response.status).toBe(200);
  });

  it("rejects missing fields on create", async () => {
    requireAuthUser.mockResolvedValue({ id: "s1", role: "APPLICANT", status: "ACTIVE" });
    const { NextRequest } = await import("next/server");
    const { POST } = await import("@/app/api/applications/route");

    const response = await POST(
      new NextRequest("http://localhost/api/applications", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ applicantUserId: "invalid" }),
      }),
    );

    expect(response.status).toBe(400);
  });

  it("student can update step and resume later", async () => {
    requireAuthUser.mockResolvedValue({ id: "s1", role: "APPLICANT", status: "ACTIVE" });
    updateApplicationStep.mockResolvedValue({ id: "app1", status: "IN_PROGRESS" });

    const { NextRequest } = await import("next/server");
    const { PATCH } = await import("@/app/api/applications/[applicationId]/step/route");

    const requestBody = {
      stepCode: "PERSONAL_INFO",
      data: { firstName: "Student", lastName: "One" },
      isCompleted: true,
    };

    const first = await PATCH(
      new NextRequest("http://localhost/api/applications/app1/step", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(requestBody),
      }),
      { params: Promise.resolve({ applicationId: "app1" }) },
    );

    const second = await PATCH(
      new NextRequest("http://localhost/api/applications/app1/step", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...requestBody, stepCode: "ACADEMICS", isCompleted: false }),
      }),
      { params: Promise.resolve({ applicationId: "app1" }) },
    );

    expect(first.status).toBe(200);
    expect(second.status).toBe(200);
    expect(updateApplicationStep).toHaveBeenCalledTimes(2);
  });

  it("counselor can update status", async () => {
    requireAuthUser.mockResolvedValue({ id: "c1", role: "COUNSELOR", status: "ACTIVE" });
    updateApplicationStatus.mockResolvedValue({ id: "app1", status: "UNDER_REVIEW" });

    const { NextRequest } = await import("next/server");
    const { PATCH } = await import("@/app/api/applications/[applicationId]/status/route");

    const response = await PATCH(
      new NextRequest("http://localhost/api/applications/app1/status", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ toStatus: "UNDER_REVIEW", reason: "Initial screening" }),
      }),
      { params: Promise.resolve({ applicationId: "app1" }) },
    );

    expect(response.status).toBe(200);
  });

  it("student cannot directly update status", async () => {
    requireAuthUser.mockResolvedValue({ id: "s1", role: "APPLICANT", status: "ACTIVE" });

    const { NextRequest } = await import("next/server");
    const { PATCH } = await import("@/app/api/applications/[applicationId]/status/route");

    const response = await PATCH(
      new NextRequest("http://localhost/api/applications/app1/status", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ toStatus: "ACCEPTED", reason: "self-approve" }),
      }),
      { params: Promise.resolve({ applicationId: "app1" }) },
    );

    expect(response.status).toBe(403);
  });

  it("student can submit application", async () => {
    requireAuthUser.mockResolvedValue({ id: "s1", role: "APPLICANT", status: "ACTIVE" });
    submitApplication.mockResolvedValue({ id: "app1", status: "SUBMITTED" });

    const { NextRequest } = await import("next/server");
    const { POST } = await import("@/app/api/applications/[applicationId]/submit/route");

    const response = await POST(new NextRequest("http://localhost/api/applications/app1/submit", { method: "POST" }), {
      params: Promise.resolve({ applicationId: "app1" }),
    });

    expect(response.status).toBe(200);
  });
});
