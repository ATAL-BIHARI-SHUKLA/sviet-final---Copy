import { ZodError } from "zod";
import { NextResponse } from "next/server";

import { ApiError } from "@/services/api-errors";

export function withApiHandler<T>(handler: () => Promise<T>) {
  return handler()
    .then((payload) => {
      if (payload instanceof Response) {
        return payload;
      }

      return NextResponse.json({ ok: true, data: payload });
    })
    .catch((error: unknown) => {
      if (error instanceof ApiError) {
        return NextResponse.json(
          {
            ok: false,
            error: {
              code: error.code,
              message: error.message,
              details: error.details,
            },
          },
          { status: error.statusCode },
        );
      }

      if (error instanceof ZodError) {
        return NextResponse.json(
          {
            ok: false,
            error: {
              code: "VALIDATION_ERROR",
              message: "Invalid request payload.",
              details: error.flatten(),
            },
          },
          { status: 400 },
        );
      }

      console.error("[API] Unhandled error:", error);

      return NextResponse.json(
        {
          ok: false,
          error: {
            code: "INTERNAL_ERROR",
            message:
              process.env.NODE_ENV === "development" && error instanceof Error
                ? error.message
                : "Unexpected server error.",
          },
        },
        { status: 500 },
      );
    });
}
