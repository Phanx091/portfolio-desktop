"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface BackgroundAnimationProps {
  mousePosition: { x: number; y: number }
  disableMouseEffect?: boolean
}

export default function BackgroundAnimation({ mousePosition, disableMouseEffect = false }: BackgroundAnimationProps) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number }>>(() => {
    // Initialize particles only once
    return Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
      y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
      size: Math.random() * 2 + 1,
    }))
  })

  // Use static center position if mouse effect is disabled
  const effectiveMousePosition = disableMouseEffect
    ? { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    : mousePosition;

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
          className="absolute bg-cyan-400 rounded-full opacity-20"
          style={{
            width: particle.size,
            height: particle.size,
            left: particle.x,
            top: particle.y,
          }}
          animate={{
            y: [particle.y, particle.y - 80, particle.y],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 15 + particle.id * 0.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      ))}

      {/* Circuit Lines */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at ${effectiveMousePosition.x}px ${effectiveMousePosition.y}px, rgba(59, 130, 246, 0.1) 0%, transparent 50%)`,
        }}
      />

      {/* Flowing Code Effect - Only show when no windows are open */}
      {!disableMouseEffect && (
        <div className="absolute inset-0 opacity-3">
          <motion.div
            animate={{ y: [-100, (typeof window !== 'undefined' ? window.innerHeight : 1080) + 100] }}
            transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
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
      )}
    </div>
  )
}
