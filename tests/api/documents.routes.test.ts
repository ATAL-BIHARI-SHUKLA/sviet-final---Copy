import { beforeEach, describe, expect, it, vi } from "vitest";

const requireAuthUser = vi.fn();
const createDocumentMetadata = vi.fn();
const reviewDocument = vi.fn();

vi.mock("@/services/auth-context", () => ({ requireAuthUser }));
vi.mock("@/modules/documents/documents.service", () => ({ createDocumentMetadata, reviewDocument }));

describe("document routes", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("student can upload document metadata", async () => {
    requireAuthUser.mockResolvedValue({ id: "s1", role: "APPLICANT", status: "ACTIVE" });
    createDocumentMetadata.mockResolvedValue({ id: "d1" });

    const { NextRequest } = await import("next/server");
    const { POST } = await import("@/app/api/documents/route");

    const response = await POST(
      new NextRequest("http://localhost/api/documents", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          applicationId: "86062374-c52b-4147-a4b7-7f37909b7dbf",
          applicantUserId: "ad2b0f1f-4f5f-469f-9f76-d0f4d5098db1",
          type: "TRANSCRIPT",
          storageKey: "documents/transcript.pdf",
          originalFileName: "transcript.pdf",
          mimeType: "application/pdf",
          sizeBytes: 4096,
          sha256: "b".repeat(64),
        }),
      }),
    );

    expect(response.status).toBe(200);
  });

  it("rejects invalid document payload", async () => {
    requireAuthUser.mockResolvedValue({ id: "s1", role: "APPLICANT", status: "ACTIVE" });

    const { NextRequest } = await import("next/server");
    const { POST } = await import("@/app/api/documents/route");

    const response = await POST(
      new NextRequest("http://localhost/api/documents", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          applicationId: "invalid",
        }),
      }),
    );

    expect(response.status).toBe(400);
  });

  it("counselor can approve document", async () => {
    requireAuthUser.mockResolvedValue({ id: "c1", role: "COUNSELOR", status: "ACTIVE" });
    reviewDocument.mockResolvedValue({ id: "d1", status: "VERIFIED" });

    const { NextRequest } = await import("next/server");
    const { PATCH } = await import("@/app/api/documents/[documentId]/review/route");

    const response = await PATCH(
      new NextRequest("http://localhost/api/documents/d1/review", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ status: "VERIFIED" }),
      }),
      { params: Promise.resolve({ documentId: "d1" }) },
    );

    expect(response.status).toBe(200);
  });

  it("requires rejection reason for rejected docs", async () => {
    requireAuthUser.mockResolvedValue({ id: "c1", role: "COUNSELOR", status: "ACTIVE" });

    const { NextRequest } = await import("next/server");
    const { PATCH } = await import("@/app/api/documents/[documentId]/review/route");

    const response = await PATCH(
      new NextRequest("http://localhost/api/documents/d1/review", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ status: "REJECTED" }),
      }),
      { params: Promise.resolve({ documentId: "d1" }) },
    );

    expect(response.status).toBe(400);
  });

  it("student cannot review documents", async () => {
    requireAuthUser.mockResolvedValue({ id: "s1", role: "APPLICANT", status: "ACTIVE" });

    const { NextRequest } = await import("next/server");
    const { PATCH } = await import("@/app/api/documents/[documentId]/review/route");

    const response = await PATCH(
      new NextRequest("http://localhost/api/documents/d1/review", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ status: "VERIFIED" }),
      }),
      { params: Promise.resolve({ documentId: "d1" }) },
    );

    expect(response.status).toBe(403);
  });
});
