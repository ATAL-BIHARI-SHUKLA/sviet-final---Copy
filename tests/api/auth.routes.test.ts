import { describe, expect, it, vi } from "vitest";

import { ApiError } from "@/services/api-errors";

const loginWithPassword = vi.fn();
const logoutSessionByToken = vi.fn();

vi.mock("@/modules/auth/auth.service", () => ({
  loginWithPassword,
  logoutSessionByToken,
}));

describe("auth routes", () => {
  it("login success sets session cookie", async () => {
    loginWithPassword.mockResolvedValue({
      token: "session-token",
      expiresAt: new Date(Date.now() + 1000 * 60),
      user: {
        id: "u1",
        email: "user@example.com",
        firstName: "User",
        lastName: "One",
        role: "APPLICANT",
      },
    });

    const { POST } = await import("@/app/api/auth/login/route");
    const response = await POST(
      new Request("http://localhost/api/auth/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: "user@example.com", password: "password123" }),
      }),
    );

    expect(response.status).toBe(200);
    expect(response.headers.get("set-cookie") ?? "").toContain("sviet_session=");
  });

  it("login failure returns 401", async () => {
    loginWithPassword.mockRejectedValueOnce(new ApiError(401, "Invalid credentials.", "INVALID_CREDENTIALS"));

    const { POST } = await import("@/app/api/auth/login/route");
    const response = await POST(
      new Request("http://localhost/api/auth/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: "user@example.com", password: "wrongpassword" }),
      }),
    );

    expect(response.status).toBe(401);
  });

  it("logout clears cookie", async () => {
    const { NextRequest } = await import("next/server");
    const { POST } = await import("@/app/api/auth/logout/route");

    const request = new NextRequest("http://localhost/api/auth/logout", {
      method: "POST",
      headers: { cookie: "sviet_session=test-token" },
    });

    const response = await POST(request);

    expect(response.status).toBe(200);
    expect(response.headers.get("set-cookie") ?? "").toContain("sviet_session=");
    expect(logoutSessionByToken).toHaveBeenCalled();
  });
});
