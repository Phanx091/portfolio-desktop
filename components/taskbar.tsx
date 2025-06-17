"use client";

import { motion } from "framer-motion";
import { Wifi, Battery, Volume2 } from "lucide-react";

interface TaskbarProps {
  minimizedWindows: any[];
  onRestore: (id: number) => void;
  isMobile?: boolean;
}

export default function Taskbar({
  minimizedWindows,
  onRestore,
  isMobile = false,
}: TaskbarProps) {
  const now = new Date();
  const currentDateTime =
    now.toLocaleDateString([], {
      weekday: "short",
      month: "short",
      day: "numeric",
    }) +
    " " +
    now.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className={`absolute bottom-0 left-0 right-0 ${
        isMobile ? "h-14" : "h-12"
      } bg-gray-900/95 border-t border-gray-700 flex items-center justify-between px-4`}
      style={{ zIndex: 9999, pointerEvents: "auto" }}
    >
      {/* Start Menu */}
      <div className="flex items-center space-x-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`${
            isMobile ? "w-10 h-10" : "w-8 h-8"
          } bg-gradient-to-br from-cyan-400 to-purple-500 rounded flex items-center justify-center text-white font-bold ${
            isMobile ? "text-base" : "text-sm"
          }`}
        >
          N
        </motion.button>

        {/* Test Button */}
        {/* <button
          onClick={() => console.log("TEST: Taskbar click works!")}
          className="px-2 py-1 bg-red-500 text-white rounded text-xs"
        >
          TEST
        </button> */}

        {/* Minimized Windows */}
        <div
          className={`flex ${
            isMobile ? "space-x-1" : "space-x-2"
          } overflow-x-auto`}
        >
          {minimizedWindows.map((window) => (
            <motion.button
              key={window.id}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log(
                  "Taskbar: Clicked window button!",
                  window.id,
                  window.title,
                );
                onRestore(window.id);
              }}
              className={`${
                isMobile ? "px-3 py-2" : "px-4 py-2"
              } bg-gray-800 hover:bg-blue-600 border border-gray-600 hover:border-blue-400 rounded text-white ${
                isMobile ? "text-xs" : "text-sm"
              } flex items-center space-x-2 transition-all duration-200 whitespace-nowrap cursor-pointer select-none`}
              style={{ minHeight: "32px", minWidth: isMobile ? 0 : "80px" }}
            >
              {window.icon && (
                <window.icon
                  className={`${isMobile ? "w-3 h-3" : "w-3 h-3"}`}
                />
              )}
              <span className={isMobile ? "hidden sm:inline" : ""}>
                {window.title}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* System Tray */}
      <div
        className={`flex items-center ${
          isMobile ? "space-x-2" : "space-x-4"
        } text-gray-300`}
      >
        {!isMobile && (
          <div className="flex items-center space-x-2">
            <Wifi className="w-4 h-4" />
            <Volume2 className="w-4 h-4" />
            <Battery className="w-4 h-4" />
          </div>
        )}
        <div className={`${isMobile ? "text-xs" : "text-sm"} font-mono`}>
          {currentDateTime}
        </div>
      </div>
    </motion.div>
  );
}
