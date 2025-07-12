import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { message, model } = await request.json();

    if (!message || !model) {
      return NextResponse.json(
        { error: "Message and model are required" },
        { status: 400 }
      );
    }

    const openRouterKey = process.env.OPENROUTER_API_KEY;

    if (!openRouterKey) {
      return NextResponse.json(
        { error: "OpenRouter API key not configured" },
        { status: 500 }
      );
    }

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${openRouterKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": process.env.YOUR_SITE_URL || "http://localhost:3000",
          "X-Title": "AI ChatBot",
        },
        body: JSON.stringify({
          model: model,
          messages: [
            {
              role: "user",
              content: message,
            },
          ],
          temperature: 0.7,
          max_tokens: 1000,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenRouter API error:", errorData);
      return NextResponse.json(
        { error: "Failed to get AI response" },
        { status: response.status }
      );
    }

    const data = await response.json();
    const aiMessage =
      data.choices[0]?.message?.content ||
      "Sorry, I could not generate a response.";

    return NextResponse.json({ message: aiMessage });
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
