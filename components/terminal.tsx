"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const terminalContent = [
  "$ whoami",
  "frontend_engineer",
  "",
  "$ cat about.txt",
  "Developer and avid adventurer",
  "Specializing in React, Next.js, TypeScript",
  "Creating beautiful, interactive experiences",
  "Always learning, always building, always adventuring",
  "",
  "$ ls skills/",
  "React.js  Next.js  TypeScript",
  "GraphQL  Node.js  Git  Figma",
  "",
  "$ echo $STATUS",
  "Available for opportunities",
];

export default function Terminal() {
  const [displayLines, setDisplayLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const terminalRef = useRef<HTMLDivElement>(null);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  useEffect(() => {
    if (currentLineIndex < terminalContent.length) {
      const currentLine = terminalContent[currentLineIndex];

      if (currentCharIndex < currentLine.length) {
        const timer = setTimeout(() => {
          setDisplayLines((prev) => {
            const newLines = [...prev];
            if (newLines[currentLineIndex]) {
              newLines[currentLineIndex] += currentLine[currentCharIndex];
            } else {
              newLines[currentLineIndex] = currentLine[currentCharIndex];
            }
            return newLines;
          });
          setCurrentCharIndex((prev) => prev + 1);
        }, 50);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setCurrentLineIndex((prev) => prev + 1);
          setCurrentCharIndex(0);
        }, 500);
        return () => clearTimeout(timer);
      }
    }
  }, [currentLineIndex, currentCharIndex]);

  // Auto-scroll to bottom when content changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [displayLines]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
      className="bg-black/90 border border-cyan-400/30 rounded-lg p-4 font-mono text-sm h-full overflow-hidden"
    >
      <div className="flex items-center mb-2 pb-2 border-b border-gray-700">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <span className="text-gray-400 ml-4 text-xs">terminal</span>
      </div>

      <div ref={terminalRef} className={`text-green-400 space-y-1 overflow-y-auto max-h-64${isMobile ? ' pb-16' : ''}`}>
        {displayLines.map((line, index) => (
          <div key={index} className="flex">
            <span>{line}</span>
            {index === currentLineIndex && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
                className="ml-1"
              >
                █
              </motion.span>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
