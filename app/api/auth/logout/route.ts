import { NextRequest, NextResponse } from "next/server";

import { withApiHandler } from "@/services/api-handler";
import { logoutSessionByToken } from "@/modules/auth/auth.service";

export async function POST(request: NextRequest) {
  return withApiHandler(async () => {
    const token = request.cookies.get("sviet_session")?.value;

    if (token) {
      await logoutSessionByToken(token);
    }

    const response = NextResponse.json({
      ok: true,
      data: { loggedOut: true },
    });

    response.cookies.set("sviet_session", "", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      expires: new Date(0),
      path: "/",
    });

    return response;
  });
}
