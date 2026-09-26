import { NextRequest, NextResponse } from "next/server";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: RouteContext) {
  const { id } = await params;

  const driveUrl = `https://drive.google.com/uc?export=view&id=${encodeURIComponent(id)}`;

  try {
    const upstream = await fetch(driveUrl, {
      headers: { "User-Agent": "Mozilla/5.0" },
      redirect: "follow",
    });

    if (!upstream.ok) {
      return NextResponse.json({ ok: false, error: "File not found" }, { status: 404 });
    }

    const contentType = upstream.headers.get("content-type") ?? "application/octet-stream";
    const buffer = await upstream.arrayBuffer();

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
      },
    });
  } catch {
    return NextResponse.json({ ok: false, error: "Proxy error" }, { status: 502 });
  }
}
