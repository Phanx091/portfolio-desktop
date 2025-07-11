"use client";

import { motion } from "framer-motion";
import { FileText } from "lucide-react";

interface TerminalCommandsNoteProps {
  isMobile: boolean;
  isOpen?: boolean;
  onClose?: () => void;
  showIcon?: boolean;
  onOpen?: () => void;
}

export default function TerminalCommandsNote({ isMobile, isOpen = true, onClose, showIcon = false, onOpen }: TerminalCommandsNoteProps) {
  const commands = [
    { command: "ls", description: "List directory contents" },
    { command: "ls -la", description: "Detailed file listing" },
    { command: "pwd", description: "Print working directory" },
    { command: "whoami", description: "Show current user" },
    { command: "date", description: "Show current date/time" },
    { command: "cat about.txt", description: "View about file" },
    { command: "cat contact.md", description: "View contact info" },
    { command: "ls skills", description: "List skills directory" },
    { command: "ls projects", description: "List projects directory" },
    { command: "ls portfolio", description: "List portfolio directory" },
    { command: "echo $STATUS", description: "Show availability status" },
    { command: "echo $SKILLS", description: "Show skills list" },
    { command: "help", description: "Show all commands" },
    { command: "clear", description: "Clear terminal screen" },
  ];

  // Show more commands on mobile but still limit to save space
  const displayCommands = isMobile ? commands.slice(0, 13) : commands;

  // If showIcon is true and isMobile and not open, show the sticky note icon
  if (isMobile && showIcon && !isOpen) {
    return (
      <button
        className="fixed left-4 top-4 w-14 h-14 z-30 flex items-center justify-center"
        onClick={onOpen}
        aria-label="Open terminal commands"
        style={{ display: 'block' }}
      >
        <div className="relative w-12 h-12">
          {/* Sticky note base */}
          <div className="w-full h-full bg-yellow-200 border-2 border-yellow-400 rounded-lg shadow-xl transform rotate-2" />
          {/* Dog-ear */}
          <div className="absolute top-0 right-0 w-4 h-4 bg-yellow-100 border-t-2 border-r-2 border-yellow-300 rounded-tr-lg" style={{clipPath:'polygon(100% 0, 0 0, 100% 100%)'}} />
          {/* Lines and dots for realism */}
          <div className="absolute top-2 left-2 w-6 h-1 bg-yellow-300 rounded-full opacity-80" />
          <div className="absolute top-4 left-2 w-8 h-1 bg-yellow-300 rounded-full opacity-60" />
          <div className="absolute top-6 left-2 w-7 h-1 bg-yellow-300 rounded-full opacity-40" />
          <div className="absolute bottom-2 left-2 w-4 h-1 bg-yellow-300 rounded-full opacity-30" />
        </div>
      </button>
    );
  }

  // Only render if open on mobile
  if (isMobile && !isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: isMobile ? -20 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      className={`${
        isMobile 
          ? "absolute bottom-[28rem] left-4 right-4 max-w-full max-h-56 overflow-y-auto" 
          : "absolute top-[28rem] right-8 w-96"
      } bg-yellow-100 border-2 border-yellow-300 rounded-lg shadow-lg p-3 font-mono text-xs max-w-full ${isMobile ? '' : 'w-96'} relative`}
      style={{ zIndex: 5 }}
    >
      {/* Sticky note header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <FileText className="w-4 h-4 text-yellow-700" />
          <span className="font-bold text-yellow-900 text-sm">Terminal Commands</span>
        </div>
        {/* Close button always shown when open on mobile */}
        {isMobile && onClose && (
          <button
            className="ml-2 w-6 h-6 flex items-center justify-center bg-yellow-200 border border-yellow-400 rounded-full text-yellow-700 hover:text-red-600 hover:border-red-400 transition-colors text-lg font-bold shadow"
            onClick={onClose}
            aria-label="Close commands note"
            style={{ lineHeight: 1 }}
          >
            ×
          </button>
        )}
      </div>

      {/* Commands list */}
      <div className="space-y-1">
        {displayCommands.map((cmd, index) => (
          <div key={index} className="flex justify-between items-start">
            <code className="bg-yellow-200 text-yellow-900 font-mono text-xs px-2 py-0.5 rounded font-semibold shadow-sm border border-yellow-300 whitespace-nowrap">
              {cmd.command}
            </code>
            <span className="text-yellow-700 text-xs text-right ml-2 flex-shrink-0 max-w-[60%]">
              {cmd.description}
            </span>
          </div>
        ))}
      </div>

      {/* Footer note - only show on desktop */}
      {!isMobile && (
        <div className="mt-2 pt-1 border-t border-yellow-300">
          <p className="text-yellow-600 text-xs italic">
            Type these commands in the terminal to explore!
          </p>
        </div>
      )}
    </motion.div>
  );
} 