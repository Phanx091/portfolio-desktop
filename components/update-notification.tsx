"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X, Clock, CheckCircle, Palette } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

interface UpdateNotificationProps {
  isMobile?: boolean;
}

export default function UpdateNotification({ isMobile = false }: UpdateNotificationProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateProgress, setUpdateProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const { setTheme, setIsUpdating: setGlobalUpdating } = useTheme();

  // Show notification after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5000); // Show after 5 seconds

    return () => clearTimeout(timer);
  }, []);

  // Simulate update progress
  useEffect(() => {
    if (isUpdating) {
      const interval = setInterval(() => {
        setUpdateProgress((prev) => {
          if (prev >= 100) {
            setIsUpdating(false);
            setIsCompleted(true);
            setGlobalUpdating(false);
            clearInterval(interval);
            return 100;
          }
          
          // Change theme at different progress points
          if (prev < 25 && prev + Math.random() * 15 >= 25) {
            setTheme("update");
          } else if (prev < 50 && prev + Math.random() * 15 >= 50) {
            setTheme("cyberpunk");
          } else if (prev < 75 && prev + Math.random() * 15 >= 75) {
            setTheme("sunset");
          } else if (prev < 90 && prev + Math.random() * 15 >= 90) {
            setTheme("ocean");
          }
          
          return prev + Math.random() * 15;
        });
      }, 500);

      return () => clearInterval(interval);
    }
  }, [isUpdating, setTheme, setGlobalUpdating]);

  const handleUpdate = () => {
    setIsUpdating(true);
    setUpdateProgress(0);
    setGlobalUpdating(true);
    // Start with update theme
    setTheme("update");
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };

  const handleRemindLater = () => {
    setIsVisible(false);
    // Show again after 1 hour
    setTimeout(() => {
      if (!isDismissed) {
        setIsVisible(true);
      }
    }, 3600000);
  };

  const handleThemeSelect = (selectedTheme: string) => {
    setTheme(selectedTheme as any);
  };

  const themeOptions = [
    { id: "default", name: "Default", color: "from-blue-500 to-purple-500" },
    { id: "update", name: "Update", color: "from-orange-500 to-amber-500" },
    { id: "cyberpunk", name: "Cyberpunk", color: "from-green-500 to-cyan-500" },
    { id: "sunset", name: "Sunset", color: "from-orange-500 to-red-500" },
    { id: "ocean", name: "Ocean", color: "from-cyan-500 to-blue-600" },
  ];

  // Hide on mobile or if not visible/dismissed
  if (isMobile || !isVisible || isDismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.9 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="fixed bottom-20 right-6 z-[9998] max-w-sm"
      >
        <div className="bg-gray-900/95 backdrop-blur-md border border-gray-700 rounded-xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {showThemeSelector ? (
                <Palette className="w-5 h-5 text-white" />
              ) : isUpdating ? (
                <Download className="w-5 h-5 text-white" />
              ) : (
                <CheckCircle className="w-5 h-5 text-white" />
              )}
              <span className="text-white font-medium text-sm">
                {showThemeSelector 
                  ? "Theme Selector" 
                  : isUpdating 
                    ? "Updating..." 
                    : "Software Update Available"}
              </span>
            </div>
            <button
              onClick={handleDismiss}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Content */}
          <div className="p-4">
            {showThemeSelector ? (
              // Theme selector content
              <div className="space-y-4">
                <h3 className="font-semibold text-white mb-3">
                  Choose Your Theme
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  Select a theme to customize your desktop appearance.
                </p>
                
                <div className="space-y-2">
                  {themeOptions.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => handleThemeSelect(theme.id)}
                      className="w-full flex items-center space-x-3 p-3 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors group"
                    >
                      <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${theme.color}`} />
                      <span className="text-white group-hover:text-gray-200 transition-colors">
                        {theme.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ) : !isUpdating && !isCompleted ? (
              // Initial update prompt
              <>
                <h3 className="font-semibold text-white mb-1">
                  NexusOS v2.2
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  This update includes important security fixes and improvements to your Mac's color scheme. (Don't worry, it's just a easter egg)
                </p>
                
                {/* Update info */}
                <div className="bg-gray-800/50 rounded-lg p-3 mb-4 border border-gray-700">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Size:</span>
                    <span className="font-medium text-white">2.1 MB</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-1">
                    <span className="text-gray-400">Estimated time:</span>
                    <span className="font-medium text-white">5-10 seconds</span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex space-x-2">
                  <button
                    onClick={handleUpdate}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Update Now</span>
                  </button>
                  <button
                    onClick={handleRemindLater}
                    className="px-4 py-2 text-gray-400 hover:text-gray-200 text-sm transition-colors flex items-center space-x-2"
                  >
                    <Clock className="w-4 h-4" />
                    <span>Later</span>
                  </button>
                </div>
              </>
            ) : isUpdating ? (
              // Update progress`
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Download className="w-5 h-5 text-blue-400 animate-pulse" />
                  <span className="font-medium text-white">Downloading update...</span>
                </div>
                
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <motion.div
                    className="bg-blue-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${updateProgress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                
                <div className="text-center">
                  <span className="text-sm text-gray-400">
                    {Math.round(updateProgress)}% complete
                  </span>
                </div>
              </div>
            ) : (
              // Update completed
              <div className="text-center space-y-3">
                <div className="flex items-center justify-center space-x-2 text-green-400">
                  <CheckCircle className="w-6 h-6" />
                  <span className="font-medium">Update Complete!</span>
                </div>
                <p className="text-sm text-gray-300">
                  Your Mac has been updated successfully. A restart may be required.
                </p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setShowThemeSelector(true)}
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2"
                  >
                    <Palette className="w-4 h-4" />
                    <span>Choose Theme</span>
                  </button>
                  <button
                    onClick={handleDismiss}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    Got it
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
} 