"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { questions } from "@/lib/quiz-data"
import { calculateScore } from "@/lib/scoring"
import { shuffleAllQuestions, getRandomQuestions } from "@/lib/quiz-utils"
import type { UserAnswers, QuizResult, Gender } from "@/lib/types"
import type { ShuffledQuestion } from "@/lib/quiz-utils"
import QuizCard from "@/components/quiz-card"
import Results from "@/components/results"
import GenderSelection from "@/components/gender-selection"
import { Button } from "@/components/ui/button"
import LoadingAnimation from "@/components/loading-animation"

export default function Home() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1) // -1 for landing
  const [answers, setAnswers] = useState<UserAnswers>({})
  const [result, setResult] = useState<QuizResult | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [gender, setGender] = useState<Gender | null>(null)
  const [showGenderSelection, setShowGenderSelection] = useState(false)
  const [shuffledQuestions, setShuffledQuestions] = useState<ShuffledQuestion[]>([])

  // Check for saved gender preference on mount
  useEffect(() => {
    const savedGender = localStorage.getItem("redFlagGender") as Gender | null
    if (savedGender && (savedGender === "male" || savedGender === "female")) {
      setGender(savedGender)
    }
  }, [])

  const handleStart = () => {
    if (!gender) {
      setShowGenderSelection(true)
    } else {
      // Get 10 random questions from the pool and shuffle their options
      const randomQuestions = getRandomQuestions(questions, 10)
      const shuffled = shuffleAllQuestions(randomQuestions)
      setShuffledQuestions(shuffled)
      setCurrentQuestionIndex(0)
      setAnswers({})
      setResult(null)
    }
  }

  const handleGenderSelect = (selectedGender: Gender) => {
    setGender(selectedGender)
    setShowGenderSelection(false)
    // Get 10 random questions from the pool and shuffle their options
    const randomQuestions = getRandomQuestions(questions, 10)
    const shuffled = shuffleAllQuestions(randomQuestions)
    setShuffledQuestions(shuffled)
    setCurrentQuestionIndex(0)
    setAnswers({})
    setResult(null)
  }

  const handleAnswer = (originalIndex: number) => {
    const currentQuestion = shuffledQuestions[currentQuestionIndex]
    const newAnswers = { ...answers, [currentQuestion.id]: originalIndex }
    setAnswers(newAnswers)

    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      // Quiz completed
      if (gender) {
        const finalResult = calculateScore(newAnswers, gender)
        setResult(finalResult)
        setCurrentQuestionIndex(-2) // -2 for results
      }
    }
  }

  const handleRestart = () => {
    setCurrentQuestionIndex(-1)
    setAnswers({})
    setResult(null)
    setShuffledQuestions([])
  }

  const handleLoadingComplete = () => {
    // Add a small delay to ensure smooth transition
    setTimeout(() => {
      setIsLoading(false)
    }, 100)
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingAnimation key="loading" onComplete={handleLoadingComplete} />}
      </AnimatePresence>

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 flex items-center justify-center p-4 relative"
        >
          {/* Background Effects */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl" />
          </div>

          {/* watermark */}
          <p className="text-[15px] text-gray-800 absolute top-2 right-4">
            Created with <span role="img" aria-label="love">❤️</span> by{' '}
            <a
              href="https://www.silasinegbe.me"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-pink-400 transition-colors"
            >
              Silas
            </a>
          </p>


          {/* main content */}
          <div className="relative z-10 w-full max-w-2xl">
            <AnimatePresence mode="wait">
              {showGenderSelection && <GenderSelection key="gender-selection" onSelect={handleGenderSelect} />}

              {currentQuestionIndex === -1 && !showGenderSelection && (
                <motion.div
                  key="landing"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.6 }}
                  className="text-center"
                >
                  <div className="bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-lg rounded-3xl p-12 shadow-2xl border border-gray-700/50">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      className="text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-6"
                    >
                      🚩
                    </motion.div>

                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-5xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight"
                    >
                      Red Flag
                      <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                        {" "}
                        Scorecard
                      </span>
                    </motion.h1>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed"
                    >
                      Think you're relationship material? Let's find out how many red flags you're serving 💅
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                    >
                      <Button
                        onClick={handleStart}
                        className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-bold py-6 px-12 rounded-2xl text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/25"
                      >
                        Start the Roast 🔥
                      </Button>
                    </motion.div>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                      className="text-gray-500 text-sm mt-6"
                    >
                      10 questions • AI-powered roasts • Shareable results
                    </motion.p>
                  </div>
                </motion.div>
              )}

              {currentQuestionIndex >= 0 && currentQuestionIndex < shuffledQuestions.length && gender && (
                <QuizCard
                  key={`question-${currentQuestionIndex}`}
                  question={shuffledQuestions[currentQuestionIndex]}
                  onAnswer={handleAnswer}
                  currentQuestion={currentQuestionIndex + 1}
                  totalQuestions={shuffledQuestions.length}
                  gender={gender}
                />
              )}

              {currentQuestionIndex === -2 && result && (
                <Results key="results" result={result} onRestart={handleRestart} />
              )}
            </AnimatePresence>
          </div>

        </motion.div>
      )}
    </>
  )
}
