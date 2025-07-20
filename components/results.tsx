"use client"

import { motion } from "framer-motion"
import type { QuizResult } from "@/lib/types"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RefreshCw, Share2, Download, ClipboardCopy, BadgeCheck } from "lucide-react"
import { generateResultImage, downloadImage } from "@/lib/image-generator"

interface ResultsProps {
  result: QuizResult
  onRestart: () => void
}

export default function Results({ result, onRestart }: ResultsProps) {
  const [roast, setRoast] = useState<string>("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  // State to manage the button's appearance
  const [isCopied, setIsCopied] = useState(false);

  // Function to copy text to the clipboard
  const handleCopy = async () => {
    if (roast) {
      try {
        await navigator.clipboard.writeText(roast);
        setIsCopied(true);
        // Reset the button state after 2 seconds
        setTimeout(() => {
          setIsCopied(false);
        }, 2000);
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    }
  };

  const generateRoast = async () => {
    setIsGenerating(true)
    try {
      const response = await fetch("/api/generate-roast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result),
      })
      const data = await response.json()
      setRoast(data.roast)
    } catch (error) {
      console.error("Error generating roast:", error)
      setRoast("Even our AI is speechless... and that's saying something 💀")
    }
    setIsGenerating(false)
  }

  const handleDownload = async () => {
    setIsDownloading(true)
    try {
      const imageDataURL = await generateResultImage(result)
      downloadImage(imageDataURL, `red-flag-result-${Date.now()}.png`)
    } catch (error) {
      console.error("Error generating image:", error)
      alert("Failed to generate image. Please try again.")
    }
    setIsDownloading(false)
  }

  const shareResult = async () => {
    const shareText = `I just got "${result.title}" on the Red Flag Scorecard! 🚩\n\n${roast || result.description}\n\nTake the quiz: ${window.location.origin}`
    const shareUrl = window.location.origin

    // Try native sharing first (mobile devices)
    // if (navigator.share && navigator.canShare) {
    //   try {
    //     await navigator.share({
    //       title: "My Red Flag Scorecard Results",
    //       text: shareText,
    //       url: shareUrl,
    //     })
    //     return
    //   } catch (error) {
    //     console.log("Native sharing failed, falling back to alternatives")
    //   }
    // }

    // Fallback options for desktop/unsupported devices
    const encodedText = encodeURIComponent(shareText)
    const encodedUrl = encodeURIComponent(shareUrl)

    // Create a modal with sharing options
    const modal = document.createElement("div")
    modal.className = "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    modal.innerHTML = `
    <div class="bg-gray-800 rounded-2xl p-6 m-4 max-w-sm w-full">
      <h3 class="text-white text-xl font-bold mb-4 text-center">Share Your Results</h3>
      <div class="space-y-3">
        <button
          onclick="window.open('https://twitter.com/intent/tweet?text=${encodedText}', '_blank'); document.body.removeChild(this.closest('.fixed'))"
          class="w-full bg-black hover:bg-gray-800 text-white py-3 px-4 rounded-xl font-semibold transition-colors duration-200"
        >
          Twitter/X
        </button>
        <button
          onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}', '_blank'); document.body.removeChild(this.closest('.fixed'))"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl font-semibold transition-colors duration-200"
        >
          Facebook
        </button>
        <button
          onclick="window.open('https://wa.me/?text=${encodedText}', '_blank'); document.body.removeChild(this.closest('.fixed'))"
          class="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-xl font-semibold transition-colors duration-200"
        >
          WhatsApp
        </button>
        <button
          onclick="navigator.clipboard.writeText('${shareText.replace(/'/g, "\\'")}'); alert('Results copied to clipboard! 📋'); document.body.removeChild(this.closest('.fixed'))"
          class="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-xl font-semibold transition-colors duration-200"
        >
          Copy Link
        </button>
        <button
          onclick="document.body.removeChild(this.closest('.fixed'))"
          class="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 px-4 rounded-xl font-semibold transition-colors duration-200"
        >
          Cancel
        </button>
      </div>
    </div>
  `

    document.body.appendChild(modal)

    // Close modal when clicking outside
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        document.body.removeChild(modal)
      }
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-lg mx-auto"
    >
      <div className="bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-gray-700/50">
        {/* Flag Counter */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-6"
        >
          <div className="flex justify-center space-x-6 mb-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-500">{result.redFlags}</div>
              <div className="text-sm text-red-400">🚩 Red</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-500">{result.yellowFlags}</div>
              <div className="text-sm text-yellow-400">⚠️ Yellow</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-500">{result.greenFlags}</div>
              <div className="text-sm text-green-400">✅ Green</div>
            </div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mb-6"
        >
          <h2 className="text-3xl font-bold text-white mb-3 leading-tight">{result.title}</h2>
          <p className="text-gray-300 text-lg">{result.description}</p>
        </motion.div>

        {/* AI Roast Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          {!roast ? (
            <Button
              onClick={generateRoast}
              disabled={isGenerating}
              className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-semibold py-4 rounded-2xl transition-all duration-300"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                  Generating your roast...
                </>
              ) : (
                <>🔥 Get Your AI Roast</>
              )}
            </Button>
          ) : (
            <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-600/50">
              <div className="flex items-center justify-between mb-3">
                <span className="text-red-400 font-semibold">🤖 AI Roast:</span>
                <Button
                  onClick={handleCopy}
                  disabled={isCopied || !roast} // Disable if text is empty or already copied
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCopied ? (
                    <>
                      <BadgeCheck className="w-4 h-4 mr-2 text-green-500" />
                      <span className="text-green-500">Copied!</span>
                    </>
                  ) : (
                    <>
                      <ClipboardCopy className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
              <p className="text-white text-lg leading-relaxed">{roast}</p>
            </div>
          )}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button
              onClick={handleDownload}
              disabled={isDownloading}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-4 rounded-2xl transition-all duration-300"
            >
              {isDownloading ? (
                <>
                  <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Download className="w-5 h-5 mr-2" />
                  Download Image
                </>
              )}
            </Button>

            <Button
              onClick={shareResult}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-4 rounded-2xl transition-all duration-300"
            >
              <Share2 className="w-5 h-5 mr-2" />
              Share Results
            </Button>
          </div>

          <Button
            onClick={onRestart}
            variant="outline"
            className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white py-4 rounded-2xl transition-all duration-300 bg-transparent"
          >
            Take Quiz Again
          </Button>
        </motion.div>

        {/* Watermark */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-6 text-gray-500 text-sm"
        >
          Scanned by redflagscorecard.com 🚩
        </motion.div>
      </div>
    </motion.div>
  )
}
