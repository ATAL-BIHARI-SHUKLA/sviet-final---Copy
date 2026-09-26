import { describe, expect, it } from "vitest";

import { createLeadSchema } from "@/validators/leads";
import { createApplicationSchema, updateApplicationStatusSchema } from "@/validators/applications";
import { createDocumentMetadataSchema } from "@/validators/documents";

describe("validators", () => {
  it("validates lead payload", () => {
    const parsed = createLeadSchema.parse({
      firstName: "Anu",
      lastName: "Sharma",
      email: "Anu@Example.com",
      source: "WEBSITE",
    });

    expect(parsed.email).toBe("anu@example.com");
  });

  it("rejects missing lead fields", () => {
    const result = createLeadSchema.safeParse({
      firstName: "A",
      source: "WEBSITE",
    });

    expect(result.success).toBe(false);
  });

  it("validates application create payload", () => {
    const result = createApplicationSchema.safeParse({
      applicantUserId: "a8e146a8-7864-4d0e-ac8b-b90e843e8ee7",
      programId: "676e57c8-ac6b-44eb-aed9-b5a558b5f22f",
      intakeId: "f4d32f62-2055-4062-aad5-2058eb08f5c9",
    });

    expect(result.success).toBe(true);
  });

  it("rejects unsupported status", () => {
    const result = updateApplicationStatusSchema.safeParse({
      toStatus: "ENROLLED",
    });

    expect(result.success).toBe(false);
  });

  it("validates document metadata size and hash", () => {
    const result = createDocumentMetadataSchema.safeParse({
      applicationId: "e4b130e5-b40f-4eac-9f86-eb2ab8369254",
      applicantUserId: "19390a5d-4f62-4657-a868-7ace6e9b53f9",
      type: "TRANSCRIPT",
      storageKey: "docs/transcript.pdf",
      originalFileName: "transcript.pdf",
      mimeType: "application/pdf",
      sizeBytes: 2048,
      sha256: "a".repeat(64),
    });

    expect(result.success).toBe(true);
  });
});
