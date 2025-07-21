import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { redFlags, yellowFlags, greenFlags, title, gender } = await request.json();

    const genderContext = gender === "male" ? "guy/man/king/bro" : "girl/woman/queen/bestie";

    // Determine if it's mostly positive
    const isPositive = greenFlags > (redFlags | yellowFlags);

    // Generate the dynamic prompt
    const prompt = `
    Generate a ${isPositive ? "witty compliment" : "funny, savage but playful roast"} for a ${gender} who got "${title}" on a relationship red flag quiz.
    Their scores: ${redFlags} red flags, ${yellowFlags} yellow flags, ${greenFlags} green flags.

    Style: 2 sentences max, use emojis, be ${isPositive ? "fun, sweet, and slightly flirty if needed" : "funny but not mean-spirited"}.
    Use appropriate terms for ${gender} (${genderContext}).

    ${isPositive
      ? `Examples for males: "Emotional intelligence on 100 🔥 — you're what dating apps pray for 🙏."
    Examples for females: "Sis is a walking green flag 🌿 — certified girlfriend material 💅💖."`
      : `Examples for males: "Bro really said 'I'm not like other guys' then proceeded to be exactly like other guys 💀"
    Examples for females: "Bestie really said 'I'm not like other girls' then proceeded to be exactly like other girls 💀"`}`;

    const keys = [
      process.env.OPENROUTER_API_KEY,
      process.env.OPENROUTER_API_KEY2,
    ];

    // Randomly pick one key
    const selectedKey = keys[Math.floor(Math.random() * keys.length)];

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${selectedKey}`,
        "HTTP-Referer": "https://www.myredflag.site", // optional
        "X-Title": "Red flag detector", // optional
      },
      body: JSON.stringify({
        model: "qwen/qwen3-32b:free",
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
