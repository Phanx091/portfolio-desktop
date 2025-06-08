"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Desktop from "@/components/desktop"
import BootSequence from "@/components/boot-sequence"

export default function Home() {
  const [isBooted, setIsBooted] = useState(false)
  const [showDesktop, setShowDesktop] = useState(false)

  useEffect(() => {
    const bootTimer = setTimeout(() => {
      setIsBooted(true)
      setTimeout(() => setShowDesktop(true), 500)
    }, 4000)

    return () => clearTimeout(bootTimer)
  }, [])

  return (
    <div className="h-screen w-screen overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        {!isBooted ? (
          <BootSequence key="boot" />
        ) : (
          <motion.div
            key="desktop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="h-full w-full"
          >
            {showDesktop && <Desktop />}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
