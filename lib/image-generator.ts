import type { QuizResult } from "./types"
import { addCanvasRoundRectPolyfill } from "./canvas-polyfill"

export async function generateResultImage(result: QuizResult): Promise<string> {
  return new Promise((resolve) => {
    // Add polyfill for older browsers
    addCanvasRoundRectPolyfill()

    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")

    if (!ctx) {
      resolve("data:,")
      return
    }

    // Set canvas dimensions for square format (Instagram post size)
    canvas.width = 1080
    canvas.height = 1080

    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, "#111827") // gray-900
    gradient.addColorStop(0.5, "#581c87") // purple-900/20
    gradient.addColorStop(1, "#111827") // gray-900

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Add background effects (circles) - adjusted for square format
    ctx.globalAlpha = 0.15

    // Red circle (top right)
    const redGradient = ctx.createRadialGradient(850, 230, 0, 850, 230, 250)
    redGradient.addColorStop(0, "#ef4444")
    redGradient.addColorStop(1, "transparent")
    ctx.fillStyle = redGradient
    ctx.fillRect(600, -20, 500, 500)

    // Purple circle (bottom left)
    const purpleGradient = ctx.createRadialGradient(230, 850, 0, 230, 850, 250)
    purpleGradient.addColorStop(0, "#a855f7")
    purpleGradient.addColorStop(1, "transparent")
    ctx.fillStyle = purpleGradient
    ctx.fillRect(-20, 600, 500, 500)

    ctx.globalAlpha = 1

    // Draw main card background with padding
    const padding = 60
    const cardX = padding
    const cardY = padding
    const cardWidth = canvas.width - padding * 2
    const cardHeight = canvas.height - padding * 2

    // Card gradient
    const cardGradient = ctx.createLinearGradient(cardX, cardY, cardX + cardWidth, cardY + cardHeight)
    cardGradient.addColorStop(0, "rgba(17, 24, 39, 0.95)") // gray-900/95
    cardGradient.addColorStop(1, "rgba(31, 41, 55, 0.95)") // gray-800/95

    ctx.fillStyle = cardGradient
    ctx.roundRect(cardX, cardY, cardWidth, cardHeight, 32)
    ctx.fill()

    // Card border
    ctx.strokeStyle = "rgba(55, 65, 81, 0.5)" // gray-700/50
    ctx.lineWidth = 3
    ctx.roundRect(cardX, cardY, cardWidth, cardHeight, 32)
    ctx.stroke()

    // Red Flag Scorecard title - bigger and more prominent
    ctx.fillStyle = "#ffffff"
    ctx.font = "bold 64px Arial, sans-serif"
    ctx.textAlign = "center"
    ctx.fillText("Red Flag", canvas.width / 2, 180)

    // Scorecard with gradient - bigger
    const titleGradient = ctx.createLinearGradient(0, 220, canvas.width, 220)
    titleGradient.addColorStop(0, "#ef4444") // red-500
    titleGradient.addColorStop(1, "#ec4899") // pink-500
    ctx.fillStyle = titleGradient
    ctx.font = "bold 64px Arial, sans-serif"
    ctx.fillText("Scorecard", canvas.width / 2, 240)

    // Flag counters - much bigger and more prominent
    const flagY = 380
    const flagSpacing = cardWidth / 3
    const flagStartX = cardX + flagSpacing / 2

    // Red flags
    ctx.fillStyle = "#ef4444" // red-500
    ctx.font = "bold 96px Arial, sans-serif"
    ctx.textAlign = "center"
    ctx.fillText(result.redFlags.toString(), flagStartX, flagY)
    ctx.fillStyle = "#fca5a5" // red-400
    ctx.font = "bold 32px Arial, sans-serif"
    ctx.fillText("🚩 Red", flagStartX, flagY + 60)

    // Yellow flags
    ctx.fillStyle = "#eab308" // yellow-500
    ctx.font = "bold 96px Arial, sans-serif"
    ctx.fillText(result.yellowFlags.toString(), flagStartX + flagSpacing, flagY)
    ctx.fillStyle = "#facc15" // yellow-400
    ctx.font = "bold 32px Arial, sans-serif"
    ctx.fillText("⚠️ Yellow", flagStartX + flagSpacing, flagY + 60)

    // Green flags
    ctx.fillStyle = "#22c55e" // green-500
    ctx.font = "bold 96px Arial, sans-serif"
    ctx.fillText(result.greenFlags.toString(), flagStartX + flagSpacing * 2, flagY)
    ctx.fillStyle = "#4ade80" // green-400
    ctx.font = "bold 32px Arial, sans-serif"
    ctx.fillText("✅ Green", flagStartX + flagSpacing * 2, flagY + 60)

    // Result title - bigger and more space
    ctx.fillStyle = "#ffffff"
    ctx.font = "bold 48px Arial, sans-serif"
    ctx.textAlign = "center"

    // Handle long titles by wrapping text - with more generous width
    const titleLines = wrapText(ctx, result.title, cardWidth - 100)
    let titleY = 580
    titleLines.forEach((line) => {
      ctx.fillText(line, canvas.width / 2, titleY)
      titleY += 60
    })

    // Result description - bigger text and better spacing
    ctx.fillStyle = "#d1d5db" // gray-300
    ctx.font = "36px Arial, sans-serif"
    ctx.textAlign = "center"

    const descLines = wrapText(ctx, result.description, cardWidth - 100)
    let descY = titleY + 40
    descLines.forEach((line) => {
      ctx.fillText(line, canvas.width / 2, descY)
      descY += 50
    })

    // Watermark - positioned better for square format
    ctx.fillStyle = "#6b7280" // gray-500
    ctx.font = "bold 28px Arial, sans-serif"
    ctx.textAlign = "center"
    ctx.fillText("Scanned by redflagscorecard.com 🚩", canvas.width / 2, canvas.height - 80)

    // Convert to data URL with high quality
    const dataURL = canvas.toDataURL("image/png", 0.95)
    resolve(dataURL)
  })
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(" ")
  const lines: string[] = []
  let currentLine = words[0] || ""

  for (let i = 1; i < words.length; i++) {
    const word = words[i]
    const width = ctx.measureText(currentLine + " " + word).width
    if (width < maxWidth) {
      currentLine += " " + word
    } else {
      lines.push(currentLine)
      currentLine = word
    }
  }
  if (currentLine) {
    lines.push(currentLine)
  }
  return lines
}

export const downloadImage = (dataURL: string, filename: string) => {
  const link = document.createElement("a")
  link.href = dataURL
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
