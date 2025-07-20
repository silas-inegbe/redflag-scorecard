"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

const loadingMessages = [
  { text: "Are you a green flag?", color: "from-green-400 to-emerald-500", emoji: "✅" },
  { text: "Maybe a yellow flag?", color: "from-yellow-400 to-amber-500", emoji: "⚠️" },
  { text: "Or a red flag?", color: "from-red-400 to-rose-500", emoji: "🚩" },
]

interface LoadingAnimationProps {
  onComplete: () => void
}

export default function LoadingAnimation({ onComplete }: LoadingAnimationProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [showFinalAnimation, setShowFinalAnimation] = useState(false)

  useEffect(() => {
    // Equal timing for each phase: 1.5 seconds each = 4.5 seconds total
    const messageInterval = setInterval(() => {
      setCurrentMessageIndex((prev) => {
        if (prev < loadingMessages.length - 1) {
          return prev + 1
        } else {
          clearInterval(messageInterval)
          setShowFinalAnimation(true)
          return prev
        }
      })
    }, 1500) // Equal time for each message

    return () => clearInterval(messageInterval)
  }, [])

  useEffect(() => {
    if (showFinalAnimation) {
      // Final animation phase: 1.5 seconds
      const timer = setTimeout(() => {
        onComplete()
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [showFinalAnimation, onComplete])

  const currentMessage = loadingMessages[currentMessageIndex]

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-50 bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 flex items-center justify-center p-4"
      style={{ willChange: "opacity" }}
    >
      {/* Reduced Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ opacity: [0.02, 0.05, 0.02] }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-red-500/10 rounded-full blur-3xl"
          style={{ willChange: "opacity" }}
        />
        <motion.div
          animate={{ opacity: [0.05, 0.02, 0.05] }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
          style={{ willChange: "opacity" }}
        />
      </div>

      {/* Subtle Dark Card Container - Reduced Opacity */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-lg mx-auto"
        style={{ willChange: "transform, opacity" }}
      >
        <div className="bg-gradient-to-br from-gray-900/20 to-gray-800/20 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-8 sm:p-12 shadow-2xl border border-gray-700/10">
          {/* Very subtle inner glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/2 to-purple-500/2 rounded-2xl sm:rounded-3xl" />

          <div className="relative z-10 text-center">
            {!showFinalAnimation ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentMessageIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="flex flex-col items-center space-y-6 sm:space-y-8"
                  style={{ willChange: "transform, opacity" }}
                >
                  {/* Clean Emoji Animation - No Blur */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.3, ease: "easeOut" }}
                    className="text-6xl sm:text-7xl md:text-8xl relative"
                    style={{ willChange: "transform, opacity" }}
                  >
                    {/* Very subtle glow behind emoji */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${currentMessage.color} opacity-5 blur-xl rounded-full scale-125`}
                    />
                    <span className="relative z-10">{currentMessage.emoji}</span>
                  </motion.div>

                  {/* Clear Text Animation - No Blur Effects */}
                  <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                    className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r ${currentMessage.color} bg-clip-text text-transparent leading-tight px-4`}
                    style={{ willChange: "opacity" }}
                  >
                    {currentMessage.text}
                  </motion.h1>

                  {/* Clear Loading Dots */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.2 }}
                    className="flex space-x-2"
                    style={{ willChange: "opacity" }}
                  >
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{
                          duration: 1.2,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: i * 0.2,
                          ease: "easeInOut",
                        }}
                        className="w-2 h-2 sm:w-3 sm:h-3 bg-white/80 rounded-full"
                        style={{ willChange: "opacity" }}
                      />
                    ))}
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex flex-col items-center space-y-6 sm:space-y-8"
                style={{ willChange: "transform, opacity" }}
              >
                {/* Final Animation - Clean */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="text-6xl sm:text-7xl md:text-8xl relative"
                  style={{ willChange: "transform" }}
                >
                  {/* Very subtle glow for final animation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/8 to-pink-500/8 blur-2xl rounded-full scale-125" />
                  <span className="relative z-10">🚩</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className="text-2xl sm:text-3xl md:text-4xl font-bold text-white px-4"
                  style={{ willChange: "transform, opacity" }}
                >
                  Let's find out!
                </motion.h1>

                {/* Clean Loading Bar */}
                <div className="w-48 sm:w-64 h-2 bg-gray-700/30 rounded-full overflow-hidden border border-gray-600/20">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-red-500 to-pink-500 rounded-full"
                    style={{ willChange: "width" }}
                  />
                  {/* Subtle shine effect - reduced opacity */}
                  <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ delay: 0.5, duration: 0.6, ease: "easeInOut" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
                    style={{ willChange: "transform" }}
                  />
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Reduced floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [-20, -40, -20],
                opacity: [0.05, 0.15, 0.05],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: i * 0.8,
              }}
              className="absolute w-1 h-1 bg-white/10 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${60 + (i % 2) * 20}%`,
                willChange: "transform, opacity",
              }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
