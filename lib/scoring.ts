import type { QuizResult, UserAnswers, Gender } from "./types"
import { questions } from "./quiz-data"

/**
 * Select a random element from an array.
 */
function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

/**
 * Compute red / yellow / green-flag totals and
 * return a randomised title + description combo.
 */
export function calculateScore(answers: UserAnswers, gender: Gender): QuizResult {
  let redFlags = 0
  let yellowFlags = 0
  let greenFlags = 0

  Object.entries(answers).forEach(([id, optionIndex]) => {
    const q = questions.find((qq) => qq.id === Number(id))
    const opt = q?.options[optionIndex]
    if (!opt) return
    redFlags += opt.redFlags
    yellowFlags += opt.yellowFlags
    greenFlags += opt.greenFlags
  })

  const { title, description } = buildRandomisedResult(redFlags, yellowFlags, greenFlags, gender)

  return { redFlags, yellowFlags, greenFlags, title, description, gender }
}

/**
 * Build a result object with RANDOM (title, description) pairs.
 * - 5 variants in each bucket ⇒ 25 possible combos.
 */
function buildRandomisedResult(red: number, yellow: number, green: number, gender: Gender) {
  const total = Math.max(red + yellow + green, 1) // avoid ÷0
  const pctRed = (red / total) * 100

  if (pctRed >= 70) {
    const titles = [
      "Certified Walking Red Flag 🚩",
      "Professional Red-Flag Collector 🚩",
      "Red-Flag Hall-of-Fame 🚩",
      "Toxic Energy Specialist 🚩",
      "Walking Relationship Hazard 🚩",
    ]
    const descriptions =
      gender === "male"
        ? [
            "Bro, your red flags need their own postcode.",
            "King, even colour-blind people can see the danger signs.",
            "My guy, you’re a bio-hazard in dating form.",
            "Sir, the UN just issued sanctions on your love life.",
            "Bro, your aura screams 'run' in every language.",
          ]
        : [
            "Bestie, your red flags need their own postcode.",
            "Queen, even colour-blind people can see the danger signs.",
            "Girl, you’re a bio-hazard in dating form.",
            "Sis, the UN just issued sanctions on your love life.",
            "Bestie, your aura screams 'run' in every language.",
          ]

    return { title: pickRandom(titles), description: pickRandom(descriptions) }
  }

  if (pctRed >= 50) {
    const titles =
      gender === "male"
        ? [
            "Toxic King with Trust Issues 💔",
            "Emotionally Unavailable Prince 💔",
            "Drama King in Denial 💔",
            "Commitment-Phobic Lord 💔",
            "Gaslight Gatekeep Guy 💔",
          ]
        : [
            "Delusional Romantic with Daddy Issues 💔",
            "Pick-Me Princess Energy 💔",
            "Drama Queen in Denial 💔",
            "Commitment-Phobic Duchess 💔",
            "Gaslight Gatekeep Girlboss 💔",
          ]

    const descriptions =
      gender === "male"
        ? [
            "Plot twist: you’re the red flag you keep warning about.",
            "Main-character energy, problematic storyline.",
            "Bro, mixed signals is your love language.",
            "Sir, your issues have their own fan club.",
            "You’re serving Cliff-hanger vibes – nobody knows what’s next.",
          ]
        : [
            "Plot twist: you’re the red flag you keep warning about.",
            "Main-character energy, problematic storyline.",
            "Bestie, mixed signals is your love language.",
            "Girl, your issues have their own fan club.",
            "You’re serving Cliff-hanger vibes – nobody knows what’s next.",
          ]

    return { title: pickRandom(titles), description: pickRandom(descriptions) }
  }

  if (pctRed >= 30) {
    const titles = [
      "Confused Beige Flag 🏳️",
      "Neutral Chaos Energy 🏳️",
      "Beige Flag Collector 🏳️",
      "Questionable Vibes Only 🏳️",
      "Mildly Concerning Human 🏳️",
    ]
    const descriptions = [
      "Not toxic, just confusing – like pineapple on pizza.",
      "Serving lukewarm chaos with a side of 'meh'.",
      "Your vibe is elevator-music but make it existential.",
      "Nobody’s sure what’s happening – including you.",
      "Living proof that beige is a feeling.",
    ]
    return { title: pickRandom(titles), description: pickRandom(descriptions) }
  }

  if (green >= red * 2) {
    const titles =
      gender === "male"
        ? [
            "Green King with Soft-Life Energy ✨",
            "Therapy-Sponsored Royalty ✨",
            "Emotionally Intelligent Prince ✨",
            "Healthy-Boundary Hero ✨",
            "Green-Flag Manufacturing CEO ✨",
          ]
        : [
            "Green Bean with Soft-Life Energy ✨",
            "Therapy-Sponsored Royalty ✨",
            "Emotionally Intelligent Queen ✨",
            "Healthy-Boundary Heroine ✨",
            "Green-Flag Manufacturing CEO ✨",
          ]

    const descriptions = [
      "Healthy in this economy? Share your secrets.",
      "You choose peace and actually stick to it.",
      "Serving 'I did the work' energy and we stan.",
      "Emotional regulation on fleek – teach us, sensei.",
      "Main-character arc but make it wholesome.",
    ]
    return { title: pickRandom(titles), description: pickRandom(descriptions) }
  }

  const titles = [
    "Cautiously Optimistic Yellow Flag 💛",
    "Work-In-Progress Energy 💛",
    "Healing-Era Participant 💛",
    "Moderately Functional Human 💛",
    "Pending Update: v2.0 💛",
  ]
  const descriptions = [
    "Therapy’s paying off – keep going.",
    "You’re healing and we support the patch notes.",
    "Self-awareness detected: applaud yourself.",
    "Not perfect, not toxic – the middle path is cute.",
    "Growth mode: activated. Proceed.",
  ]
  return { title: pickRandom(titles), description: pickRandom(descriptions) }
}
