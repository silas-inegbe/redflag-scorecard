"use client"

import { motion } from "framer-motion"
import type { Gender } from "@/lib/types"

interface GenderSelectionProps {
  onSelect: (gender: Gender) => void
}

export default function GenderSelection({ onSelect }: GenderSelectionProps) {
  const handleGenderSelect = (gender: Gender) => {
    // Save to localStorage
    localStorage.setItem("redFlagGender", gender)
    onSelect(gender)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.6 }}
      className="text-center h-screen flex items-center justify-center p-4"
    >
      <div className="bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl border border-gray-700/50 w-full max-w-md mx-auto">
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
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 leading-tight"
        >
          Before we roast you...
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed px-2"
        >
          Help us personalize your savage experience 💅
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
        >
          {/* Male Card */}
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleGenderSelect("male")}
            className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 hover:from-blue-600/30 hover:to-blue-800/30 border border-blue-500/30 hover:border-blue-400/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 transition-all duration-300 group"
          >
            <div className="text-3xl sm:text-4xl md:text-5xl mb-2 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
              👨
            </div>
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 sm:mb-2">Male</div>
            <div className="text-blue-300 text-xs sm:text-sm">Get roasted, king 👑</div>
          </motion.button>

          {/* Female Card */}
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleGenderSelect("female")}
            className="bg-gradient-to-br from-pink-600/20 to-purple-800/20 hover:from-pink-600/30 hover:to-purple-800/30 border border-pink-500/30 hover:border-pink-400/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 transition-all duration-300 group"
          >
            <div className="text-3xl sm:text-4xl md:text-5xl mb-2 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
              👩
            </div>
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 sm:mb-2">Female</div>
            <div className="text-pink-300 text-xs sm:text-sm">Get roasted, queen 👸</div>
          </motion.button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-gray-500 text-xs sm:text-sm mt-4 sm:mt-6"
        >
          We'll remember your choice for next time ✨
        </motion.p>
      </div>
    </motion.div>
  )
}
