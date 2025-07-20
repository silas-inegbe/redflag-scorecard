import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { redFlags, yellowFlags, greenFlags, title, gender } = await request.json()

    const genderContext = gender === "male" ? "guy/man/king/bro" : "girl/woman/queen/bestie"
    const prompt = `Generate a funny, savage but playful roast for a ${gender} who got "${title}" on a relationship red flag quiz. 
    Their scores: ${redFlags} red flags, ${yellowFlags} yellow flags, ${greenFlags} green flags.
    
    Style: Gen-Z slang, 2-3 sentences max, use emojis, be funny but not mean-spirited. Think TikTok comment energy.
    Use appropriate terms for ${gender} (${genderContext}).
    Examples for males: "Bro really said 'I'm not like other guys' then proceeded to be exactly like other guys 💀", 
    Examples for females: "Bestie really said 'I'm not like other girls' then proceeded to be exactly like other girls 💀"`

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
      maxTokens: 100,
    })

    return NextResponse.json({ roast: text })
  } catch (error) {
    console.error("Error generating roast:", error)
    return NextResponse.json({ error: "Failed to generate roast" }, { status: 500 })
  }
}
