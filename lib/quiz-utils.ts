import type { Question } from "./types"

export interface ShuffledQuestion extends Omit<Question, "options"> {
  options: (Question["options"][0] & { originalIndex: number })[]
}

export function shuffleQuestionOptions(question: Question): ShuffledQuestion {
  // Create array with original indices
  const optionsWithIndices = question.options.map((option, index) => ({
    ...option,
    originalIndex: index,
  }))

  // Fisher-Yates shuffle algorithm for better randomization
  const shuffled = [...optionsWithIndices]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }

  return {
    ...question,
    options: shuffled,
  }
}

export function getRandomQuestions(allQuestions: Question[], count = 10): Question[] {
  // Fisher-Yates shuffle to get random questions
  const shuffled = [...allQuestions]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }

  // Return first 'count' questions
  return shuffled.slice(0, count)
}

export function shuffleAllQuestions(questions: Question[]): ShuffledQuestion[] {
  return questions.map(shuffleQuestionOptions)
}
