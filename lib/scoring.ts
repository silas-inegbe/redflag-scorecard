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
 * - 15 variants in each bucket for a vast number of possible combos.
 */
function buildRandomisedResult(red: number, yellow: number, green: number, gender: Gender) {
  const total = Math.max(red + yellow + green, 1) // avoid ÷0
  const pctRed = (red / total) * 100

  if (pctRed >= 70) {
    const titles =
      gender === "male"
        ? [
            "Certified Walking Red Flag 🚩",
            "Professional Red-Flag Collector 🚩",
            "Red-Flag Hall-of-Fame 🚩",
            "Toxic Energy Specialist 🚩",
            "Walking Relationship Hazard 🚩",
            "The Final Boss of Toxic Exes 🚩",
            "Human Warning Label 🚩",
            "Emotional Wrecking Ball 🚩",
            "Five-Star Toxic Rating 🚩",
            "Grand Slam Champion of Bad Decisions 🚩",
            "Chief Toxicity Officer (CTO) 🚩",
            "Lord of the Lies 🚩",
            "Duke of Deception 🚩",
            "Dangerously Unstable Element 🚩",
            "Patron Saint of Ghosting 🚩",
          ]
        : [
            "Certified Walking Red Flag 🚩",
            "Professional Red-Flag Collector 🚩",
            "Red-Flag Hall-of-Fame 🚩",
            "Toxic Energy Specialist 🚩",
            "Walking Relationship Hazard 🚩",
            "The Final Boss of Toxic Exes 🚩",
            "Human Warning Label 🚩",
            "Emotional Wrecking Ball 🚩",
            "Five-Star Toxic Rating 🚩",
            "Queen of Chaos & Drama 🚩",
            "High Priestess of Heartbreak 🚩",
            "She-E-O of Sh*tshows 🚩",
            "Goddess of Ghosting 🚩",
            "The Villain in Her Own Story 🚩",
            "Emotional Arsonist 🚩",
          ]
    const descriptions =
      gender === "male"
        ? [
            "Bro, your red flags need their own postcode.",
            "King, even colour-blind people can see the danger signs.",
            "My guy, you’re a bio-hazard in dating form.",
            "Sir, the UN just issued sanctions on your love life.",
            "Bro, your aura screams 'run' in every language.",
            "My guy, you're the reason therapists have waitlists.",
            "Your love life is a horror movie and you're the jump-scare.",
            "Bro, your flags are waving harder than a F1 finish line.",
            "Dating you should be an extreme sport.",
            "Sir, your baggage has its own baggage.",
            "You're the reason they invented the 'block' button.",
            "My guy, you collect red flags like they're Pokémon cards.",
            "Your dating profile should come with a waiver.",
            "Bro, your toxicity is a renewable energy source.",
            "You have more issues than a magazine stand.",
          ]
        : [
            "Bestie, your red flags need their own postcode.",
            "Queen, even colour-blind people can see the danger signs.",
            "Girl, you’re a bio-hazard in dating form.",
            "Sis, the UN just issued sanctions on your love life.",
            "Bestie, your aura screams 'run' in every language.",
            "Girl, you're the reason therapists have waitlists.",
            "Your love life is a horror movie and you're the jump-scare.",
            "Sis, your flags are waving harder than a F1 finish line.",
            "Dating you should be an extreme sport.",
            "Queen, your baggage has its own baggage.",
            "You're the reason they invented the 'block' button.",
            "Bestie, you collect red flags like they're Pokémon cards.",
            "Your dating profile should come with a waiver.",
            "Girl, the only thing you commit to is chaos.",
            "You have more issues than a magazine stand.",
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
            "Captain of the S.S. Issues 💔",
            "Master of Mixed Signals 💔",
            "The Ghosting Guru 💔",
            "Avoidant Attachment Admiral 💔",
            "King of 'It's Complicated' 💔",
            "Emotional Baggage Handler 💔",
            "PhD in Playing Games 💔",
            "The Sabotage Specialist 💔",
            "Mr. 'We're Just Vibing' 💔",
            "President of the Problematic Club 💔",
          ]
        : [
            "Delusional Romantic with Daddy Issues 💔",
            "Pick-Me Princess Energy 💔",
            "Drama Queen in Denial 💔",
            "Commitment-Phobic Duchess 💔",
            "Gaslight Gatekeep Girlboss 💔",
            "Mistress of Mixed Signals 💔",
            "Chaos Coordinator 💔",
            "Queen of 'It's Complicated' 💔",
            "Avoidant Attachment Diva 💔",
            "Emotional Baggage Bellhop 💔",
            "PhD in Playing Games 💔",
            "The Sabotage Specialist 💔",
            "Ms. 'I'm Not Looking for Anything Serious' 💔",
            "President of the Problematic Club 💔",
            "Her Majesty of Mind Games 💔",
          ]

    const descriptions =
      gender === "male"
        ? [
            "Plot twist: you’re the red flag you keep warning about.",
            "Main-character energy, problematic storyline.",
            "Bro, mixed signals is your love language.",
            "Sir, your issues have their own fan club.",
            "You’re serving Cliff-hanger vibes – nobody knows what’s next.",
            "Your communication style is 'read at 2:15 AM'.",
            "Sir, you're not mysterious, you're just avoidant.",
            "You treat relationships like a free trial you never intend to buy.",
            "Your emotional availability has worse service than my phone.",
            "You specialize in long-term situationships.",
            "You think 'I love you' is a binding legal contract.",
            "Your love language is sarcasm and avoidance.",
            "You're building an emotional wall and making your partner pay for it.",
            "The only thing consistent about you is your inconsistency.",
            "You're a great person... to stay away from.",
          ]
        : [
            "Plot twist: you’re the red flag you keep warning about.",
            "Main-character energy, problematic storyline.",
            "Bestie, mixed signals is your love language.",
            "Girl, your issues have their own fan club.",
            "You’re serving Cliff-hanger vibes – nobody knows what’s next.",
            "Your communication style is 'read at 2:15 AM'.",
            "Girl, you're not mysterious, you're just avoidant.",
            "You treat relationships like a free trial you never intend to buy.",
            "Your emotional availability has worse service than my phone.",
            "You specialize in long-term situationships.",
            "You think 'I love you' is a binding legal contract.",
            "Your love language is sarcasm and avoidance.",
            "You're building an emotional wall and making your partner pay for it.",
            "The only thing consistent about you is your inconsistency.",
            "You're a great person... to stay away from.",
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
      "Schrödinger's Date 🏳️",
      "The Enigma of 'Idk' 🏳️",
      "Vibes: Unseasoned 🏳️",
      "Human Dial-Up Tone 🏳️",
      "The Personification of 'K' 🏳️",
      "Amateur Ambiguity Artist 🏳️",
      "CEO of 'We'll See' 🏳️",
      "Lukewarm Legend 🏳️",
      "The Riddle Wrapped in a Maybe 🏳️",
      "Ambivalent Champion 🏳️",
    ]
    const descriptions = [
      "Not toxic, just confusing – like pineapple on pizza.",
      "Serving lukewarm chaos with a side of 'meh'.",
      "Your vibe is elevator-music but make it existential.",
      "Nobody’s sure what’s happening – including you.",
      "Living proof that beige is a feeling.",
      "You’re the human equivalent of a loading screen stuck at 99%.",
      "Your personality is written in Wingdings font.",
      "Are you okay? No, seriously. We can't tell.",
      "Dating you is like reading a book with the last chapter missing.",
      "Your favorite flavor is probably water.",
      "You're neither a red flag nor a green one, you're a... syntax error.",
      "Your aura is the color of a waiting room.",
      "Trying to understand you is an exercise in futility.",
      "You're the human embodiment of the shrug emoji 🤷.",
      "You're not boring, you're... pre-interesting.",
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
            "Secure Attachment Sensei ✨",
            "King of Consent ✨",
            "Emperor of Empathy ✨",
            "The Communication King ✨",
            "Active Listening Lord ✨",
            "Healer of Generational Trauma ✨",
            "The Validation Virtuoso ✨",
            "Captain of Calm Conversations ✨",
            "Mr. Emotionally Secure ✨",
            "Grandmaster of Green Flags ✨",
          ]
        : [
            "Green Bean with Soft-Life Energy ✨",
            "Therapy-Sponsored Royalty ✨",
            "Emotionally Intelligent Queen ✨",
            "Healthy-Boundary Heroine ✨",
            "Green-Flag Manufacturing CEO ✨",
            "Secure Attachment Sensei ✨",
            "Queen of Consent ✨",
            "Empress of Empathy ✨",
            "The Communication Queen ✨",
            "Active Listening Lady ✨",
            "Healer of Generational Trauma ✨",
            "The Validation Virtuoso ✨",
            "Captain of Calm Conversations ✨",
            "Ms. Emotionally Secure ✨",
            "Grandmistress of Green Flags ✨",
          ]

    const descriptions = [
      "Healthy in this economy? Share your secrets.",
      "You choose peace and actually stick to it.",
      "Serving 'I did the work' energy and we stan.",
      "Emotional regulation on fleek – teach us, sensei.",
      "Main-character arc but make it wholesome.",
      "You're the human equivalent of a deep, relaxing breath.",
      "Your communication skills are a literal superpower.",
      "People feel safe around you. That's the ultimate flex.",
      "You're out here breaking cycles and we love to see it.",
      "Your emotional intelligence score is off the charts.",
      "You don't just talk the talk, you walk the healthy walk.",
      "You're the partner everyone's therapist tells them they deserve.",
      "You turn conflicts into conversations, not battles.",
      "Your love is a safe harbor, not a stormy sea.",
      "Accountability is your middle name.",
    ]
    return { title: pickRandom(titles), description: pickRandom(descriptions) }
  }

  const titles = [
    "Cautiously Optimistic Yellow Flag 💛",
    "Work-In-Progress Energy 💛",
    "Healing-Era Participant 💛",
    "Moderately Functional Human 💛",
    "Pending Update: v2.0 💛",
    "Under Construction 🚧 💛",
    "Self-Improvement Subscriber 💛",
    "Mindful but Messy 💛",
    "Beta Version of a Better Human 💛",
    "The Conscious Improver 💛",
    "Emotional Glow-Up in Progress 💛",
    "Future Green Flag 💛",
    "Actively Unlearning Toxicity 💛",
    "Awareness-in-Action 💛",
    "The Healing Hero 💛",
  ]
  const descriptions = [
    "Therapy’s paying off – keep going.",
    "You’re healing and we support the patch notes.",
    "Self-awareness detected: applaud yourself.",
    "Not perfect, not toxic – the middle path is cute.",
    "Growth mode: activated. Proceed.",
    "The bugs are being patched in real-time.",
    "You've read the book, now you're living the chapters.",
    "You’re not afraid to say 'oops, my trauma is showing'.",
    "You own your mistakes, and that's a huge W.",
    "Your character development arc is compelling.",
    "You've traded your red flags for a toolbox.",
    "You're doing the work, even when it's uncomfortable.",
    "Your self-awareness is your superpower-in-training.",
    "You're the 'before' in a glow-up montage, and the 'after' is gonna be epic.",
    "You've realized you're the problem, and now you're the solution.",
  ]
  return { title: pickRandom(titles), description: pickRandom(descriptions) }
}
