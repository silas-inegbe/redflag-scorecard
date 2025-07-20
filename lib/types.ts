export type Gender = "male" | "female"

export interface Question {
  id: number
  question: string
  maleQuestion?: string
  femaleQuestion?: string
  options: {
    text: string
    maleText?: string
    femaleText?: string
    redFlags: number
    yellowFlags: number
    greenFlags: number
  }[]
}

export interface QuizResult {
  redFlags: number
  yellowFlags: number
  greenFlags: number
  title: string
  description: string
  roast?: string
  gender: Gender
}

export interface UserAnswers {
  [questionId: number]: number
}
