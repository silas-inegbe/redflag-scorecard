import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { redFlags, yellowFlags, greenFlags, title, gender } = await request.json();

    const genderContext = gender === "male" ? "guy/man/king/bro" : "girl/woman/queen/bestie";
    const prompt = `Generate a funny, savage but playful roast for a ${gender} who got "${title}" on a relationship red flag quiz.
    Their scores: ${redFlags} red flags, ${yellowFlags} yellow flags, ${greenFlags} green flags.

    Style: 2 sentences max, use emojis, be funny but not mean-spirited.
    Use appropriate terms for ${gender} (${genderContext}).
    Examples for males: "Bro really said 'I'm not like other guys' then proceeded to be exactly like other guys 💀",
    Examples for females: "Bestie really said 'I'm not like other girls' then proceeded to be exactly like other girls 💀"`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`, // Store your key in .env.local
        "HTTP-Referer": "https://www.myredflag.site", // optional, helps with model access
        "X-Title": "Red flag detector", // optional
      },
      body: JSON.stringify({
        model: "qwen/qwen3-32b:free", // or any other supported model
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenRouter error:", data);
      return NextResponse.json({ error: data.error || "Failed to generate roast" }, { status: 500 });
    }

    const roast = data.choices?.[0]?.message?.content;
    return NextResponse.json({ roast });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
