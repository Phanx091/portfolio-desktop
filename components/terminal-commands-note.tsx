"use client";

import { motion } from "framer-motion";
import { FileText } from "lucide-react";

interface TerminalCommandsNoteProps {
  isMobile: boolean;
}

export default function TerminalCommandsNote({ isMobile }: TerminalCommandsNoteProps) {
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
  const displayCommands = isMobile ? commands.slice(0, 10) : commands;

  return (
    <motion.div
      initial={{ opacity: 0, y: isMobile ? -20 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      className={`${
        isMobile 
          ? "absolute bottom-[28rem] left-4 right-4 max-w-full max-h-56 overflow-y-auto" 
          : "absolute top-[28rem] right-8 w-96"
      } bg-yellow-100 border-2 border-yellow-300 rounded-lg shadow-lg p-3 font-mono text-xs`}
      style={{ zIndex: 5 }}
    >
      {/* Sticky note header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <FileText className="w-3 h-3 text-yellow-600" />
          <span className="font-semibold text-yellow-800 text-xs">Terminal Commands</span>
        </div>
        <div className="w-3 h-3 bg-yellow-200 border border-yellow-400 rounded-sm"></div>
      </div>

      {/* Commands list */}
      <div className="space-y-1">
        {displayCommands.map((cmd, index) => (
          <div key={index} className="flex justify-between items-start">
            <code className="text-yellow-900 font-mono text-xs bg-yellow-200 px-1 py-0.5 rounded flex-shrink-0">
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