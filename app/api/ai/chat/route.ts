import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { openai } from "@ai-sdk/openai";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

type ProgramSummary = {
  title: string;
  shortDescription: string | null;
  durationMonths: number;
  tuitionCents: number | null;
  department?: string | null;
  level?: string | null;
  eligibility?: string | null;
};

async function loadProgramContext(req: NextRequest) {
  try {
    const response = await fetch(`${req.nextUrl.origin}/api/programs`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return "";
    }

    const payload = (await response.json()) as {
      success?: boolean;
      data?: ProgramSummary[];
    };

    const programs =
      payload.success && Array.isArray(payload.data) ? payload.data : [];

    return programs
      .map(
        (program) =>
          `- ${program.title} (${program.department ?? "Department TBA"}, ${program.level ?? "Level TBA"}, ${program.durationMonths / 12} years, ${program.tuitionCents ? `₹${(program.tuitionCents / 100000).toFixed(0)} Lakh` : "Contact admissions"}): ${program.shortDescription ?? "Details available on the program page"}. Eligibility: ${program.eligibility || "Contact admissions"}`,
      )
      .join("\n");
  } catch {
    return "";
  }
}

export async function POST(req: NextRequest) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "SERVICE_UNAVAILABLE",
          message: "AI chat is not configured",
        },
      },
      { status: 503 },
    );
  }

  const body = (await req.json()) as { messages?: UIMessage[] };
  const messages = Array.isArray(body.messages) ? body.messages : [];
  const modelMessages = await convertToModelMessages(
    messages.map(({ id, ...message }) => {
      void id;
      return message;
    }),
  );

  const programContext = await loadProgramContext(req);

  const systemPrompt = `You are Vivi, an AI admissions counsellor for SVGOI (Swami Vivekanand Group of Institutes), a premier engineering and management institution group in Banur, Punjab, India.

Your role: Help prospective students and parents with questions about programs, admissions, fees, campus life, placements, and scholarships.

Available Programs:
${programContext}

Key facts:
- Location: Banur, Punjab (near Chandigarh)
- Highest placement package: 60 LPA
- Placement rate: Near 100%
- Top recruiters: TCS, Infosys, Wipro, Amazon, Deloitte

Guidelines:
- Be warm, helpful, and professional
- Answer questions specifically about SVGOI
- For questions you cannot answer with certainty, say "I'd recommend speaking with our admissions team directly"
- Always end conversations by offering to connect the student with a real counsellor
- Keep responses concise (2-4 sentences max unless more detail is needed)
- Do not make up specific facts not provided above`;

  const result = streamText({
    model: openai("gpt-4o-mini"),
    system: systemPrompt,
    messages: modelMessages,
    maxOutputTokens: 500,
  });

  return result.toUIMessageStreamResponse();
}
