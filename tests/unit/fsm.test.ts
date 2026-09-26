import { describe, expect, it } from "vitest";

import { ApiError } from "@/services/api-errors";
import { assertValidTransition } from "@/modules/applications/fsm";

describe("application fsm", () => {
  it("allows valid transition", () => {
    expect(() => assertValidTransition("DRAFT", "IN_PROGRESS")).not.toThrow();
  });

  it("rejects invalid transition", () => {
    expect(() => assertValidTransition("DRAFT", "ACCEPTED")).toThrow(ApiError);
  });

  it("allows same status no-op", () => {
    expect(() => assertValidTransition("UNDER_REVIEW", "UNDER_REVIEW")).not.toThrow();
  });
});
