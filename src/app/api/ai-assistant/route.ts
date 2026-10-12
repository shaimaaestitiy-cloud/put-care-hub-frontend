import { NextResponse } from "next/server";

const MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";

const SYSTEM_PROMPT = `You are a veterinary clinical decision-support assistant for licensed veterinarians using the Pet Care Hub platform.
Given a pet's species, age and symptoms, respond with:
1. Possible conditions (most likely first, with a short reason for each)
2. Recommended examinations / tests
3. Suggested initial management
4. Red flags that require urgent action
Rules: be concise and structured; reply in the same language the doctor wrote in; state clearly that these are preliminary suggestions and the final diagnosis is the veterinarian's decision; if information is missing, list what to ask the owner.`;

type ChatMessage = { role: "doctor" | "assistant"; text: string };

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "GEMINI_API_KEY is missing in .env.local" },
      { status: 500 }
    );
  }

  const { messages } = (await req.json()) as { messages: ChatMessage[] };

  // Gemini لازم المحادثة تبدأ برسالة من المستخدم، فنحذف أي رسائل مساعد بالبداية
  const history = [...messages];
  while (history.length && history[0].role === "assistant") history.shift();

  if (history.length === 0) {
    return NextResponse.json({ error: "No message provided" }, { status: 400 });
  }

  const contents = history.map((m) => ({
    role: m.role === "doctor" ? "user" : "model",
    parts: [{ text: m.text }],
  }));

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents,
        }),
      }
    );

    if (!res.ok) {
      const details = await res.text();
      console.error("Gemini error:", res.status, details);
      return NextResponse.json(
        { error: `AI service error (${res.status})` },
        { status: 502 }
      );
    }

    const data = await res.json();
    const reply =
      data?.candidates?.[0]?.content?.parts
        ?.map((p: { text?: string }) => p.text ?? "")
        .join("") || "No response received.";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Could not reach the AI service" },
      { status: 500 }
    );
  }
}