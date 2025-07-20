"use client"

import { motion } from "framer-motion"
import type { Gender } from "@/lib/types"
import type { ShuffledQuestion } from "@/lib/quiz-utils"

interface QuizCardProps {
  question: ShuffledQuestion
  onAnswer: (originalIndex: number) => void
  currentQuestion: number
  totalQuestions: number
  gender: Gender
}

export default function QuizCard({ question, onAnswer, currentQuestion, totalQuestions, gender }: QuizCardProps) {
  // Get gender-specific question text
  const getQuestionText = () => {
    if (gender === "male" && question.maleQuestion) {
      return question.maleQuestion
    }
    if (gender === "female" && question.femaleQuestion) {
      return question.femaleQuestion
    }
    return question.question
  }

  // Get gender-specific option text
  const getOptionText = (option: ShuffledQuestion["options"][0]) => {
    if (gender === "male" && option.maleText) {
      return option.maleText
    }
    if (gender === "female" && option.femaleText) {
      return option.femaleText
    }
    return option.text
  }

  const handleOptionClick = (shuffledIndex: number) => {
    // Pass the original index for scoring
    const originalIndex = question.options[shuffledIndex].originalIndex
    onAnswer(originalIndex)
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 300, rotateY: -15 }}
      animate={{ opacity: 1, x: 0, rotateY: 0 }}
      exit={{ opacity: 0, x: -300, rotateY: 15 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="w-full max-w-md mx-auto"
    >
      <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-gray-700/50">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Question {currentQuestion}</span>
            <span>{totalQuestions} total</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-red-500 to-pink-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Question */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold text-white mb-8 leading-tight"
        >
          {getQuestionText()}
        </motion.h2>

        {/* Shuffled Options */}
        <div className="space-y-4">
          {question.options.map((option, shuffledIndex) => (
            <motion.button
              key={`${question.id}-${option.originalIndex}`} // Use original index for stable keys
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + shuffledIndex * 0.1 }}
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleOptionClick(shuffledIndex)}
              className="w-full p-4 text-left bg-gray-800/50 hover:bg-gray-700/50 rounded-2xl border border-gray-600/50 hover:border-red-500/50 transition-all duration-300 text-white hover:shadow-lg hover:shadow-red-500/10"
            >
              <span className="text-red-400 font-semibold mr-3">{String.fromCharCode(65 + shuffledIndex)}.</span>
              {getOptionText(option)}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
