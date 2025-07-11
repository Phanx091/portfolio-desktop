"use client";

import React from "react";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Code,
  Mail,
  FileText,
  Trash2,
  Chrome,
  Briefcase,
} from "lucide-react";
import { useTheme } from "@/components/theme-provider";

const originalIcons = [
  {
    id: "about",
    name: "About Me",
    icon: User,
    color: "text-cyan-400",
    content: "about",
  },
  {
    id: "projects",
    name: "Projects",
    icon: Code,
    color: "text-purple-400",
    content: "projects",
  },
  {
    id: "work-projects",
    name: "Work Projects",
    icon: Briefcase,
    color: "text-orange-400",
    content: "work-projects",
  },
  {
    id: "resume",
    name: "Resume",
    icon: FileText,
    color: "text-green-400",
    content: "resume",
  },
  {
    id: "contact",
    name: "Contact",
    icon: Mail,
    color: "text-pink-400",
    content: "contact",
  },
  {
    id: "browser",
    name: "Chrome",
    icon: Chrome,
    color: "text-blue-500",
    content: "browser",
  },
];

const trashIcon = {
  id: "trash",
  name: "Trash",
  icon: Trash2,
  color: "text-gray-400",
  content: "trash",
};

interface DesktopIconsProps {
  onOpenWindow: (windowData: any) => void;
  trashedItems: any[];
  onMoveToTrash: (item: any) => void;
  onRestoreFromTrash: (itemId: string) => void;
  isMobile?: boolean;
  showStickyNoteIcon?: boolean;
  onStickyNoteIconClick?: () => void;
}

export default function DesktopIcons({
  onOpenWindow,
  trashedItems,
  onMoveToTrash,
  onRestoreFromTrash,
  isMobile = false,
  showStickyNoteIcon = false,
  onStickyNoteIconClick,
}: DesktopIconsProps) {
  const [draggedItem, setDraggedItem] = useState<any>(null);
  const [isOverTrash, setIsOverTrash] = useState(false);
  const [isOverDesktop, setIsOverDesktop] = useState(false);
  const desktopRef = useRef<HTMLDivElement>(null);
  const { theme, isUpdating } = useTheme();

  // Filter out trashed items from visible icons
  const visibleIcons = originalIcons.filter(
    (icon) => !trashedItems.some((trashedItem) => trashedItem.id === icon.id),
  );

  let allIcons = [...visibleIcons];
  if (isMobile && showStickyNoteIcon) {
    allIcons.push({
      id: "sticky-note",
      name: "Commands",
      icon: null,
      color: "text-yellow-500",
      content: "sticky-note",
      isStickyNote: true,
    } as any);
  }
  allIcons.push(trashIcon);

  // Get theme-based colors
  const getThemeColors = () => {
    switch (theme) {
      case "update":
        return {
          primary: "from-orange-500 to-orange-600",
          border: "border-orange-400",
          hover: "from-orange-400/20 to-orange-600/20",
          glow: "from-orange-400 to-orange-600",
          text: "text-orange-400",
        };
      case "cyberpunk":
        return {
          primary: "from-green-500 to-cyan-500",
          border: "border-green-400",
          hover: "from-green-400/20 to-cyan-400/20",
          glow: "from-green-400 to-cyan-400",
          text: "text-green-400",
        };
      case "sunset":
        return {
          primary: "from-orange-500 to-red-500",
          border: "border-orange-400",
          hover: "from-orange-400/20 to-red-400/20",
          glow: "from-orange-400 to-red-400",
          text: "text-orange-400",
        };
      case "ocean":
        return {
          primary: "from-cyan-500 to-blue-600",
          border: "border-cyan-400",
          hover: "from-cyan-400/20 to-blue-400/20",
          glow: "from-cyan-400 to-blue-400",
          text: "text-cyan-400",
        };
      default:
        return {
          primary: "from-gray-800 to-gray-900",
          border: "border-gray-700",
          hover: "from-blue-500/20 to-purple-500/20",
          glow: "from-cyan-400 to-purple-400",
          text: "text-cyan-400",
        };
    }
  };

  const themeColors = getThemeColors();

  const handleDragStart = (e: React.DragEvent, icon: any) => {
    if (icon.id === "trash") return; // Can't drag trash can
    setDraggedItem(icon);
    e.dataTransfer.effectAllowed = "move";

    // Store the icon data with additional metadata for trash window
    // Only include serializable properties (exclude the icon component)
    const dragData = {
      id: icon.id,
      name: icon.name,
      color: icon.color,
      content: icon.content,
      isFromTrash: false, // This is a desktop icon
      isFromDesktop: true,
    };
    e.dataTransfer.setData("application/json", JSON.stringify(dragData));
    e.dataTransfer.setData("text/plain", JSON.stringify(dragData)); // Fallback
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDragEnter = (e: React.DragEvent, iconId: string) => {
    if (iconId === "trash" && draggedItem) {
      setIsOverTrash(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent, iconId: string) => {
    if (iconId === "trash") {
      setIsOverTrash(false);
    }
  };

  const handleDrop = (e: React.DragEvent, iconId: string) => {
    e.preventDefault();
    if (iconId === "trash" && draggedItem && draggedItem.id !== "trash") {
      console.log("Dropping item into trash:", draggedItem);
      onMoveToTrash(draggedItem);
      setIsOverTrash(false);
    }
    setDraggedItem(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setIsOverTrash(false);
  };

  const handleDesktopDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setIsOverDesktop(true);
  };

  const handleDesktopDragLeave = () => {
    setIsOverDesktop(false);
  };

  const handleDesktopDrop = (e: React.DragEvent) => {
    e.preventDefault();
    try {
      const data = e.dataTransfer.getData("application/json");
      if (data) {
        const item = JSON.parse(data);
        if (item.isFromTrash) {
          onRestoreFromTrash(item.id);
        }
      }
    } catch (error) {
      console.error("Error parsing dropped data:", error);
    }
    setIsOverDesktop(false);
  };

  const getTrashIconVariant = () => {
    if (isOverTrash) {
      return "hover";
    }
    return trashedItems.length > 0 ? "full" : "empty";
  };

  return (
    <div
      ref={desktopRef}
      className="absolute inset-0"
      onDragOver={handleDesktopDragOver}
      onDragLeave={handleDesktopDragLeave}
      onDrop={handleDesktopDrop}
    >
      <div
        className={`absolute ${
          isMobile ? "left-4 top-4 grid-cols-2" : "left-8 top-8 grid-cols-1"
        } grid gap-${isMobile ? "4" : "6"}`}
      >
        <AnimatePresence>
          {allIcons.map((icon, index) => (
            <motion.div
              key={icon.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{
                scale: icon.id === "trash" ? 1.0 : 1.1,
                filter:
                  icon.id === "trash"
                    ? "none"
                    : `drop-shadow(0 0 20px ${themeColors.text.replace('text-', 'rgba(').replace('-400', '-400, 0.5)')})`,
              }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center cursor-pointer group"
              draggable={icon.id !== "trash" && !(icon.id === "sticky-note" && (icon as any).isStickyNote)}
              onDragStart={(e) => handleDragStart(e as unknown as React.DragEvent<HTMLDivElement>, icon)}
              onDragOver={handleDragOver}
              onDragEnter={(e) => handleDragEnter(e, icon.id)}
              onDragLeave={(e) => handleDragLeave(e, icon.id)}
              onDrop={(e) => handleDrop(e, icon.id)}
              onDragEnd={handleDragEnd}
              {...(icon.id === "sticky-note" && (icon as any).isStickyNote
                ? {
                    onPointerUp: () => {
                      console.log('Sticky note icon clicked');
                      if (onStickyNoteIconClick) onStickyNoteIconClick();
                    },
                  }
                : {
                    onClick: () => {
                      onOpenWindow({
                        title: icon.name,
                        content: icon.content,
                        icon: icon.icon,
                      });
                    },
                  })}
            >
              <motion.div
                className="relative"
                whileHover={{ y: isMobile ? -2 : -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {(icon.id === "sticky-note" && (icon as any).isStickyNote) ? (
                  <div className={`${isMobile ? "w-12 h-12" : "w-16 h-16"} bg-yellow-100 border-2 border-yellow-300 rounded-lg flex items-center justify-center relative shadow-xl`}>
                    <div className="relative w-10 h-10">
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
                  </div>
                ) : icon.id === "trash" ? (
                  // Trash icon with special styling
                  <motion.div
                    className={`${
                      isMobile ? "w-12 h-12" : "w-16 h-16"
                    } bg-gradient-to-br ${themeColors.primary} rounded-lg border ${themeColors.border} flex items-center justify-center relative`}
                    animate={{
                      scale: isOverTrash ? 1.1 : 1,
                      rotate: isOverTrash ? 5 : 0,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                    <motion.div
                      className={`absolute inset-0 opacity-0 group-hover:opacity-100 ${themeColors.hover}`}
                      transition={{ duration: 0.3 }}
                    />
                    {icon.icon ? React.createElement(icon.icon, {
                      className: `${isMobile ? "w-6 h-6" : "w-8 h-8"} relative z-10 text-white`,
                    }) : null}
                    {trashedItems.length > 0 && (
                      <motion.div
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white shadow-lg"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 10 }}
                      >
                        {trashedItems.length > 99 ? "99+" : trashedItems.length}
                      </motion.div>
                    )}
                  </motion.div>
                ) : (
                  icon.icon ? (
                    <motion.div
                      className={`${isMobile ? "w-12 h-12" : "w-16 h-16"} bg-gradient-to-br ${themeColors.primary} rounded-lg border ${themeColors.border} flex items-center justify-center relative overflow-hidden`}
                      animate={{
                        scale: isUpdating ? [1, 1.05, 1] : 1,
                      }}
                      transition={{
                        scale: {
                          duration: 2,
                          repeat: isUpdating ? Infinity : 0,
                          ease: "easeInOut",
                        },
                      }}
                    >
                      <motion.div
                        className={`absolute inset-0 opacity-0 group-hover:opacity-100 ${themeColors.hover}`}
                        transition={{ duration: 0.3 }}
                      />
                      {React.createElement(icon.icon, {
                        className: `${isMobile ? "w-6 h-6" : "w-8 h-8"} relative z-10 text-white`,
                      })}
                    </motion.div>
                  ) : null
                )}
                <motion.div
                  className={`absolute -inset-1 bg-gradient-to-r ${themeColors.glow} rounded-lg opacity-0 group-hover:opacity-30`}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
              <span
                className={`text-white ${
                  isMobile ? "text-xs" : "text-sm"
                } mt-2 text-center transition-colors ${
                  icon.id === "trash"
                    ? "group-hover:text-gray-300"
                    : `group-hover:${themeColors.text}`
                }`}
              >
                {(icon.id === "sticky-note" && (icon as any).isStickyNote) ? "Commands" : icon.name}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}