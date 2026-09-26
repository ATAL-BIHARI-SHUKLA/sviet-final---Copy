import { beforeEach, describe, expect, it, vi } from "vitest";

const requireAuthUser = vi.fn();
const createLead = vi.fn();
const listLeads = vi.fn();
const updateLead = vi.fn();
const deleteLead = vi.fn();
const assignLead = vi.fn();
const prismaLeadFindUnique = vi.fn();

vi.mock("@/services/auth-context", () => ({ requireAuthUser }));
vi.mock("@/modules/leads/leads.service", () => ({
  createLead,
  listLeads,
  updateLead,
  deleteLead,
  assignLead,
}));
vi.mock("@/lib/db", () => ({
  prisma: {
    lead: {
      findUnique: prismaLeadFindUnique,
    },
  },
}));

describe("lead routes", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("denies student from listing leads", async () => {
    requireAuthUser.mockResolvedValue({ id: "s1", role: "APPLICANT", status: "ACTIVE" });
    const { NextRequest } = await import("next/server");
    const { GET } = await import("@/app/api/leads/route");

    const response = await GET(new NextRequest("http://localhost/api/leads?take=10"));
    expect(response.status).toBe(403);
  });

  it("allows counselor to list leads", async () => {
    requireAuthUser.mockResolvedValue({ id: "c1", role: "COUNSELOR", status: "ACTIVE" });
    listLeads.mockResolvedValue([{ id: "l1" }]);

    const { NextRequest } = await import("next/server");
    const { GET } = await import("@/app/api/leads/route");

    const response = await GET(new NextRequest("http://localhost/api/leads?take=5&skip=0"));
    expect(response.status).toBe(200);
  });

  it("allows admin to assign lead", async () => {
    requireAuthUser.mockResolvedValue({ id: "a1", role: "ADMIN", status: "ACTIVE" });
    assignLead.mockResolvedValue({ id: "l1", ownerCounselorId: "c1" });

    const { NextRequest } = await import("next/server");
    const { POST } = await import("@/app/api/leads/[leadId]/assign/route");

    const response = await POST(
      new NextRequest("http://localhost/api/leads/l1/assign", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ counselorId: "2cc53dff-6d96-433f-a850-8478f7f4f9af" }),
      }),
      { params: Promise.resolve({ leadId: "l1" }) },
    );

    expect(response.status).toBe(200);
  });

  it("returns 404 for missing lead detail", async () => {
    requireAuthUser.mockResolvedValue({ id: "c1", role: "COUNSELOR", status: "ACTIVE" });
    prismaLeadFindUnique.mockResolvedValue(null);

    const { NextRequest } = await import("next/server");
    const { GET } = await import("@/app/api/leads/[leadId]/route");

    const response = await GET(new NextRequest("http://localhost/api/leads/l404"), {
      params: Promise.resolve({ leadId: "l404" }),
    });

    expect(response.status).toBe(404);
  });
});
