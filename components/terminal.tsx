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
  "$ ls skills",
  "React.js  Next.js  TypeScript",
  "GraphQL  Node.js  Git  Figma",
  "",
  "$ echo $STATUS",
  "Available for opportunities",
];

// Mobile-only content
const mobileContent = [
  "",
  "$ echo 'Mobile Notice'",
  "Access on desktop for hidden features",
];

// Terminal commands and their outputs
const terminalCommands: { [key: string]: string[] } = {
  "ls": [
    "about.txt",
    "skills/",
    "projects/",
    "contact.md",
    "resume.pdf",
    "portfolio/",
  ],
  "ls -la": [
    "total 24",
    "drwxr-xr-x  5 user  staff  160 Dec 15 10:30 .",
    "drwxr-xr-x  3 user  staff   96 Dec 15 10:30 ..",
    "-rw-r--r--  1 user  staff  245 Dec 15 10:30 about.txt",
    "drwxr-xr-x  2 user  staff   64 Dec 15 10:30 skills/",
    "drwxr-xr-x  2 user  staff   64 Dec 15 10:30 projects/",
    "-rw-r--r--  1 user  staff  156 Dec 15 10:30 contact.md",
    "-rw-r--r--  1 user  staff 2048 Dec 15 10:30 resume.pdf",
    "drwxr-xr-x  2 user  staff   64 Dec 15 10:30 portfolio/",
  ],
  "pwd": [
    "/home/frontend_engineer/portfolio",
  ],
  "whoami": [
    "frontend_engineer",
  ],
  "date": [
    new Date().toLocaleString(),
  ],
  "cat about.txt": [
    "Developer and avid adventurer",
    "Specializing in React, Next.js, TypeScript",
    "Creating beautiful, interactive experiences",
    "Always learning, always building, always adventuring",
  ],
  "cat contact.md": [
    "## Contact Information",
    "",
    "Email: jason.jayphan@gmail.com",
    "Phone: +1 (612) 325-1178",
    "Location: Los Angeles, CA",
    "LinkedIn: linkedin.com/in/jason-phan-dev",
  ],
  "ls skills": [
    "React.js",
    "Next.js", 
    "TypeScript",
    "GraphQL",
    "Node.js",
    "Git",
    "Figma",
  ],
  "ls projects": [
    "studio-monitors/",
    "hack-feeds/",
    "react-audio-player/",
    "mpr-news/",
    "the-current/",
    "marketplace/",
  ],
  "ls portfolio": [
    "desktop-os/",
    "components/",
    "styles/",
    "public/",
  ],
  "echo $STATUS": [
    "Available for opportunities",
  ],
  "echo $SKILLS": [
    "React, Next.js, TypeScript, GraphQL, Node.js, Git, Figma",
  ],
  "help": [
    "Available commands:",
    "",
    "  ls, ls -la          - List directory contents",
    "  pwd                 - Print working directory",
    "  whoami              - Print effective user ID",
    "  date                - Display current date and time",
    "  cat <file>          - Concatenate and display files",
    "  echo <text>         - Display a line of text",
    "  help                - Show this help message",
    "  clear               - Clear the terminal screen",
    "",
    "Files available:",
    "  about.txt, contact.md, resume.pdf",
    "  skills, projects, portfolio",
  ],
  "clear": [],
};

interface TerminalProps {
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  isMaximized?: boolean;
}

export default function Terminal({ onClose, onMinimize, onMaximize, isMaximized = false }: TerminalProps) {
  const [displayLines, setDisplayLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [userCommands, setUserCommands] = useState<string[]>([]);
  const [userOutputs, setUserOutputs] = useState<string[][]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // Combine content based on device type
  const fullContent = isMobile ? [...terminalContent, ...mobileContent] : terminalContent;

  useEffect(() => {
    if (currentLineIndex < fullContent.length) {
      const currentLine = fullContent[currentLineIndex];

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
    } else {
      // Typing is complete, enable interactive mode
      setIsTypingComplete(true);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [currentLineIndex, currentCharIndex, fullContent]);

  // Auto-scroll to bottom when content changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [displayLines, userCommands, userOutputs]);

  const executeCommand = (command: string): string[] => {
    const trimmedCommand = command.trim();
    
    // Handle clear command
    if (trimmedCommand === "clear") {
      setUserCommands([]);
      setUserOutputs([]);
      return [];
    }
    
    // Check if command exists
    if (terminalCommands[trimmedCommand]) {
      return terminalCommands[trimmedCommand];
    }
    
    // Handle echo commands
    if (trimmedCommand.startsWith("echo ")) {
      const text = trimmedCommand.substring(5);
      return [text];
    }
    
    // Handle cat commands
    if (trimmedCommand.startsWith("cat ")) {
      const file = trimmedCommand.substring(4);
      if (terminalCommands[`cat ${file}`]) {
        return terminalCommands[`cat ${file}`];
      }
      return [`cat: ${file}: No such file or directory`];
    }
    
    // Handle ls commands with directories
    if (trimmedCommand.startsWith("ls ")) {
      const dir = trimmedCommand.substring(3);
      if (terminalCommands[`ls ${dir}`]) {
        return terminalCommands[`ls ${dir}`];
      }
      return [`ls: ${dir}: No such file or directory`];
    }
    
    // Command not found
    return [`${trimmedCommand}: command not found`];
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userInput.trim()) {
      const newCommand = `$ ${userInput}`;
      const output = executeCommand(userInput);
      
      setUserCommands(prev => [...prev, newCommand]);
      setUserOutputs(prev => [...prev, output]);
      setUserInput("");
      
      // Auto-focus back to input
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleInputSubmit(e);
    }
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleMinimize = () => {
    if (onMinimize) {
      onMinimize();
    }
  };

  const handleMaximize = () => {
    if (onMaximize) {
      onMaximize();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
      className="bg-black/90 border border-cyan-400/30 rounded-lg p-4 font-mono text-xs h-full overflow-hidden flex flex-col"
    >
      <div className="flex items-center mb-2 pb-2 border-b border-gray-700">
        <div className="flex space-x-2">
          <button
            onClick={handleClose}
            className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-400 transition-colors cursor-pointer"
            title="Close"
          />
          <button
            onClick={handleMinimize}
            className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-400 transition-colors cursor-pointer"
            title="Minimize"
          />
          <button
            onClick={handleMaximize}
            className={`w-3 h-3 rounded-full transition-colors cursor-pointer ${
              isMaximized 
                ? "bg-green-600 hover:bg-green-500" 
                : "bg-green-500 hover:bg-green-400"
            }`}
            title={isMaximized ? "Restore" : "Maximize"}
          />
        </div>
        <span className="text-gray-400 ml-4 text-xs">terminal</span>
      </div>

      <div ref={terminalRef} className={`text-green-400 space-y-1 overflow-y-auto flex-1 ${isMobile ? ' pb-16' : ''}`}>
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
        
        {/* User commands and outputs */}
        {userCommands.map((command, index) => (
          <div key={`user-${index}`}>
            <div className="flex">
              <span>{command}</span>
            </div>
            {userOutputs[index] && userOutputs[index].map((outputLine, outputIndex) => (
              <div key={`output-${index}-${outputIndex}`} className="flex">
                <span>{outputLine}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Interactive input */}
      {isTypingComplete && (
        <form onSubmit={handleInputSubmit} className="mt-2">
          <div className="flex items-center">
            <span className="text-green-400 mr-2">$</span>
            <input
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-green-400 outline-none border-none font-mono text-sm"
              placeholder="Type a command..."
              autoFocus
            />
            {/* Enter button for mobile only */}
            {isMobile && userInput.trim() && (
              <button
                type="submit"
                className="ml-2 px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-xs rounded border border-green-500 transition-colors"
              >
                Enter
              </button>
            )}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
              className="ml-1 text-green-400"
            >
              █
            </motion.span>
          </div>
        </form>
      )}
    </motion.div>
  );
}
