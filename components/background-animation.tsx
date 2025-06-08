"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface BackgroundAnimationProps {
  mousePosition: { x: number; y: number }
}

export default function BackgroundAnimation({ mousePosition }: BackgroundAnimationProps) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number }>>([])

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 3 + 1,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated Grid */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="cyan" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Floating Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute bg-cyan-400 rounded-full opacity-30"
          style={{
            width: particle.size,
            height: particle.size,
            left: particle.x,
            top: particle.y,
          }}
          animate={{
            y: [particle.y, particle.y - 100, particle.y],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Circuit Lines */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.1) 0%, transparent 50%)`,
        }}
      />

      {/* Flowing Code Effect */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          animate={{ y: [-100, window.innerHeight + 100] }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="text-green-400 font-mono text-xs whitespace-pre-line"
        >
          {`const portfolio = {
  name: "Frontend Engineer",
  skills: ["React", "Next.js", "TypeScript"],
  passion: "Creating amazing experiences"
};

function buildFuture() {
  return innovation + creativity;
}`}
        </motion.div>
      </div>
    </div>
  )
}
