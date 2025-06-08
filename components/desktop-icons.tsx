"use client";

import type React from "react";

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
}

export default function DesktopIcons({
  onOpenWindow,
  trashedItems,
  onMoveToTrash,
  onRestoreFromTrash,
  isMobile = false,
}: DesktopIconsProps) {
  const [draggedItem, setDraggedItem] = useState<any>(null);
  const [isOverTrash, setIsOverTrash] = useState(false);
  const [isOverDesktop, setIsOverDesktop] = useState(false);
  const desktopRef = useRef<HTMLDivElement>(null);

  // Filter out trashed items from visible icons
  const visibleIcons = originalIcons.filter(
    (icon) => !trashedItems.some((trashedItem) => trashedItem.id === icon.id),
  );

  const allIcons = [...visibleIcons, trashIcon];

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
                    : "drop-shadow(0 0 20px rgba(59, 130, 246, 0.5))",
              }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center cursor-pointer group"
              draggable={icon.id !== "trash"}
              onDragStart={(e) => handleDragStart(e, icon)}
              onDragOver={handleDragOver}
              onDragEnter={(e) => handleDragEnter(e, icon.id)}
              onDragLeave={(e) => handleDragLeave(e, icon.id)}
              onDrop={(e) => handleDrop(e, icon.id)}
              onDragEnd={handleDragEnd}
              onClick={() =>
                onOpenWindow({
                  title: icon.name,
                  content: icon.content,
                  icon: icon.icon,
                })
              }
            >
              <motion.div
                className="relative"
                whileHover={{ y: icon.id === "trash" ? 0 : isMobile ? -2 : -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {icon.id === "trash" ? (
                  // Trash icon without background - just the icon
                  <motion.div
                    className="relative"
                    whileHover={{ y: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <icon.icon
                      className={`${isMobile ? "w-12 h-12" : "w-16 h-16"} ${
                        getTrashIconVariant() === "full"
                          ? "text-red-400"
                          : isOverTrash
                          ? "text-red-300"
                          : "text-gray-400"
                      }`}
                    />

                    {/* Trash full indicator */}
                    {trashedItems.length > 0 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className={`absolute -top-1 -right-1 ${
                          isMobile ? "w-3 h-3" : "w-4 h-4"
                        } bg-red-500 rounded-full flex items-center justify-center`}
                      >
                        <span
                          className={`text-white ${
                            isMobile ? "text-xs" : "text-xs"
                          } font-bold`}
                        >
                          {trashedItems.length}
                        </span>
                      </motion.div>
                    )}
                  </motion.div>
                ) : (
                  // Regular icons with background
                  <motion.div
                    className="relative"
                    whileHover={{ y: isMobile ? -2 : -5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div
                      className={`${isMobile ? "w-12 h-12" : "w-16 h-16"} ${
                        icon.id === "browser"
                          ? "bg-gradient-to-br from-blue-500 to-blue-600"
                          : icon.id === "work-projects"
                          ? "bg-gradient-to-br from-orange-500 to-orange-600"
                          : "bg-gradient-to-br from-gray-800 to-gray-900"
                      } rounded-lg border ${
                        icon.id === "browser"
                          ? "border-blue-400"
                          : icon.id === "work-projects"
                          ? "border-orange-400"
                          : "border-gray-700"
                      } flex items-center justify-center relative overflow-hidden`}
                    >
                      <motion.div
                        className={`absolute inset-0 opacity-0 group-hover:opacity-100 ${
                          icon.id === "browser"
                            ? "bg-gradient-to-br from-blue-400/20 to-blue-600/20"
                            : icon.id === "work-projects"
                            ? "bg-gradient-to-br from-orange-400/20 to-orange-600/20"
                            : "bg-gradient-to-br from-blue-500/20 to-purple-500/20"
                        }`}
                        transition={{ duration: 0.3 }}
                      />
                      <icon.icon
                        className={`${
                          isMobile ? "w-6 h-6" : "w-8 h-8"
                        } relative z-10 ${
                          icon.id === "browser" || icon.id === "work-projects"
                            ? "text-white"
                            : icon.color
                        }`}
                      />
                    </div>

                    <motion.div
                      className={`absolute -inset-1 ${
                        icon.id === "browser"
                          ? "bg-gradient-to-r from-blue-400 to-blue-600"
                          : icon.id === "work-projects"
                          ? "bg-gradient-to-r from-orange-400 to-orange-600"
                          : "bg-gradient-to-r from-cyan-400 to-purple-400"
                      } rounded-lg opacity-0 group-hover:opacity-30 blur-sm`}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                )}
              </motion.div>
              <span
                className={`text-white ${
                  isMobile ? "text-xs" : "text-sm"
                } mt-2 text-center transition-colors ${
                  icon.id === "trash"
                    ? "group-hover:text-gray-300"
                    : "group-hover:text-cyan-400"
                }`}
              >
                {icon.name}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
