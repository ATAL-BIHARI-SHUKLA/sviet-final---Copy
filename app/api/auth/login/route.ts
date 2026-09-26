import { NextResponse } from "next/server";

import { withApiHandler } from "@/services/api-handler";
import { basicLoginSchema } from "@/validators/auth";
import { loginWithPassword } from "@/modules/auth/auth.service";

export async function POST(request: Request) {
  return withApiHandler(async () => {
    const body = basicLoginSchema.parse(await request.json());
    const result = await loginWithPassword(body);

    const response = NextResponse.json({
      ok: true,
      data: {
        user: result.user,
      },
    });

    response.cookies.set("sviet_session", result.token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      expires: result.expiresAt,
      path: "/",
    });

    return response;
  });
}
