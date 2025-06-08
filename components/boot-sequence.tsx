"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const bootMessages = [
  "Initializing system...",
  "Loading kernel modules...",
  "Starting network services...",
  "Mounting file systems...",
  "Loading user interface...",
  "System ready.",
]

export default function BootSequence() {
  const [currentMessage, setCurrentMessage] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [charIndex, setCharIndex] = useState(0)

  useEffect(() => {
    if (currentMessage < bootMessages.length) {
      const message = bootMessages[currentMessage]

      if (charIndex < message.length) {
        const timer = setTimeout(() => {
          setDisplayText((prev) => prev + message[charIndex])
          setCharIndex((prev) => prev + 1)
        }, 50)
        return () => clearTimeout(timer)
      } else {
        const timer = setTimeout(() => {
          setCurrentMessage((prev) => prev + 1)
          setDisplayText("")
          setCharIndex(0)
        }, 800)
        return () => clearTimeout(timer)
      }
    }
  }, [currentMessage, charIndex])

  return (
    <div className="h-full w-full bg-black flex items-center justify-center">
      <div className="font-mono text-green-400 text-lg">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-4 text-center">
          <div className="text-2xl mb-2 text-cyan-400">NEXUS OS v2.1</div>
          <div className="text-sm text-gray-500">Frontend Engineer Portfolio System</div>
        </motion.div>

        <div className="h-8 flex items-center">
          <span className="text-cyan-400 mr-2">$</span>
          <span>{displayText}</span>
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
            className="ml-1"
          >
            █
          </motion.span>
        </div>

        <div className="mt-8 flex justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full"
          />
        </div>
      </div>
    </div>
  )
}
