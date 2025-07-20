import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Red Flag Scorecard - Relationship Quiz",
  description:
    "Think you're relationship material? Take our savage quiz to find out how many red flags you're serving! Get AI-powered roasts and shareable results.",
  keywords: "relationship quiz, red flags, dating quiz, personality test, funny quiz",
  openGraph: {
    title: "Red Flag Scorecard - How Many Red Flags Are You Serving?",
    description: "Take the savage relationship quiz that roasts your dating habits with AI-powered humor!",
    type: "website",
    url: "https://redflagscorecard.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Red Flag Scorecard - Relationship Quiz",
    description: "Think you're relationship material? Let's find out! 🚩",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
