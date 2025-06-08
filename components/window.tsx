"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import WindowContent from "@/components/window-content";

interface WindowProps {
  window: any;
  onClose: (id: number) => void;
  onMinimize: (id: number) => void;
  onUpdate: (window: any) => void;
  isMobile?: boolean;
}

export default function Window({
  window: windowData,
  onClose,
  onMinimize,
  onUpdate,
  isMobile = false,
}: WindowProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [previousState, setPreviousState] = useState({
    position: windowData.position,
    size: windowData.size,
  });
  const [resizeDirection, setResizeDirection] = useState("");
  const windowRef = useRef<HTMLDivElement>(null);

  // For debugging
  useEffect(() => {
    if (windowData.content === "trash") {
      console.log("Trash window content:", {
        trashedItems: windowData.trashedItems,
        onRestoreItem: !!windowData.onRestoreItem,
      });
    }
  }, [windowData]);

  const minWidth = isMobile ? 280 : 300;
  const minHeight = isMobile ? 180 : 200;

  const handleMaximize = () => {
    if (isMaximized) {
      // Restore to previous size and position
      onUpdate({
        ...windowData,
        position: previousState.position,
        size: previousState.size,
      });
      setIsMaximized(false);
    } else {
      // Save current state before maximizing
      setPreviousState({
        position: windowData.position,
        size: windowData.size,
      });

      // Get current viewport dimensions safely
      let viewportWidth = 1920;
      let viewportHeight = 1080;

      if (typeof globalThis !== "undefined" && globalThis.innerWidth) {
        viewportWidth = globalThis.innerWidth;
        viewportHeight = globalThis.innerHeight;
      }

      console.log("Maximizing window:", { viewportWidth, viewportHeight });

      // Make window truly fullscreen (cover everything including taskbar)
      onUpdate({
        ...windowData,
        position: { x: 0, y: 0 },
        size: {
          width: viewportWidth,
          height: viewportHeight,
        },
      });
      setIsMaximized(true);
    }
  };

  const handleResizeStart = (direction: string, e: React.MouseEvent) => {
    if (isMobile) return; // Disable resizing on mobile

    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    setResizeDirection(direction);

    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = windowData.size.width;
    const startHeight = windowData.size.height;
    const startLeft = windowData.position.x;
    const startTop = windowData.position.y;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      let newWidth = startWidth;
      let newHeight = startHeight;
      let newLeft = startLeft;
      let newTop = startTop;

      // Handle different resize directions
      if (direction.includes("right")) {
        newWidth = Math.max(minWidth, startWidth + deltaX);
      }
      if (direction.includes("left")) {
        newWidth = Math.max(minWidth, startWidth - deltaX);
        if (newWidth > minWidth) {
          newLeft = startLeft + deltaX;
        }
      }
      if (direction.includes("bottom")) {
        newHeight = Math.max(minHeight, startHeight + deltaY);
      }
      if (direction.includes("top")) {
        newHeight = Math.max(minHeight, startHeight - deltaY);
        if (newHeight > minHeight) {
          newTop = startTop + deltaY;
        }
      }

      onUpdate({
        ...windowData,
        position: { x: newLeft, y: newTop },
        size: { width: newWidth, height: newHeight },
      });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      setResizeDirection("");
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const getCursorStyle = (direction: string) => {
    switch (direction) {
      case "top":
      case "bottom":
        return "cursor-ns-resize";
      case "left":
      case "right":
        return "cursor-ew-resize";
      case "top-left":
      case "bottom-right":
        return "cursor-nw-resize";
      case "top-right":
      case "bottom-left":
        return "cursor-ne-resize";
      default:
        return "";
    }
  };

  return (
    <motion.div
      ref={windowRef}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      drag={!isMaximized && !isResizing}
      dragMomentum={false}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      className="absolute pointer-events-auto select-none"
      style={{
        left: windowData.position.x,
        top: windowData.position.y,
        width: windowData.size.width,
        height: windowData.size.height,
        zIndex: windowData.zIndex,
      }}
    >
      <div className="bg-gray-900/95 backdrop-blur-sm border border-cyan-400/30 rounded-lg overflow-hidden h-full flex flex-col relative">
        {/* Resize Handles - Only show when not maximized and not mobile */}
        {!isMaximized && !isMobile && (
          <>
            {/* Corner Handles */}
            <div
              className={`absolute top-0 left-0 w-3 h-3 ${getCursorStyle(
                "top-left",
              )} z-10`}
              onMouseDown={(e) => handleResizeStart("top-left", e)}
            />
            <div
              className={`absolute top-0 right-0 w-3 h-3 ${getCursorStyle(
                "top-right",
              )} z-10`}
              onMouseDown={(e) => handleResizeStart("top-right", e)}
            />
            <div
              className={`absolute bottom-0 left-0 w-3 h-3 ${getCursorStyle(
                "bottom-left",
              )} z-10`}
              onMouseDown={(e) => handleResizeStart("bottom-left", e)}
            />
            <div
              className={`absolute bottom-0 right-0 w-3 h-3 ${getCursorStyle(
                "bottom-right",
              )} z-10`}
              onMouseDown={(e) => handleResizeStart("bottom-right", e)}
            />

            {/* Edge Handles */}
            <div
              className={`absolute top-0 left-3 right-3 h-1 ${getCursorStyle(
                "top",
              )} z-10`}
              onMouseDown={(e) => handleResizeStart("top", e)}
            />
            <div
              className={`absolute bottom-0 left-3 right-3 h-1 ${getCursorStyle(
                "bottom",
              )} z-10`}
              onMouseDown={(e) => handleResizeStart("bottom", e)}
            />
            <div
              className={`absolute left-0 top-3 bottom-3 w-1 ${getCursorStyle(
                "left",
              )} z-10`}
              onMouseDown={(e) => handleResizeStart("left", e)}
            />
            <div
              className={`absolute right-0 top-3 bottom-3 w-1 ${getCursorStyle(
                "right",
              )} z-10`}
              onMouseDown={(e) => handleResizeStart("right", e)}
            />
          </>
        )}

        {/* Title Bar */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-4 py-2 flex items-center justify-between border-b border-gray-700 cursor-move relative z-20">
          <div className="flex items-center space-x-2">
            {windowData.icon && (
              <windowData.icon
                className={`${isMobile ? "w-3 h-3" : "w-4 h-4"} text-cyan-400`}
              />
            )}
            <span
              className={`text-white ${
                isMobile ? "text-xs" : "text-sm"
              } font-medium`}
            >
              {windowData.title}
            </span>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onClose(windowData.id)}
              className={`${
                isMobile ? "w-4 h-4" : "w-3 h-3"
              } bg-red-500 rounded-full hover:bg-red-400 transition-colors`}
            />
            <button
              onClick={() => onMinimize(windowData.id)}
              className={`${
                isMobile ? "w-4 h-4" : "w-3 h-3"
              } bg-yellow-500 rounded-full hover:bg-yellow-400 transition-colors`}
            />
            <button
              onClick={handleMaximize}
              className={`${
                isMobile ? "w-4 h-4" : "w-3 h-3"
              } rounded-full transition-colors ${
                isMaximized
                  ? "bg-green-600 hover:bg-green-500"
                  : "bg-green-500 hover:bg-green-400"
              }`}
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto relative z-10">
          <WindowContent
            type={windowData.content}
            onOpenWindow={windowData.onOpenWindow}
            trashedItems={windowData.trashedItems}
            onRestoreItem={windowData.onRestoreItem}
            onMoveToTrash={windowData.onMoveToTrash}
            isMobile={isMobile}
          />
        </div>
      </div>
    </motion.div>
  );
}
