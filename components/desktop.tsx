"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DesktopIcons from "@/components/desktop-icons";
import Terminal from "@/components/terminal";
import WindowManager from "@/components/window-manager";
import Taskbar from "@/components/taskbar";
import BackgroundAnimation from "@/components/background-animation";
import UpdateNotification from "@/components/update-notification";
import TerminalCommandsNote from "@/components/terminal-commands-note";
import { FileText } from "lucide-react";
import styles from "@/styles/components/Desktop.module.css";

export default function Desktop() {
  const [windows, setWindows] = useState<any[]>([]);
  const [minimizedWindows, setMinimizedWindows] = useState<any[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [trashedItems, setTrashedItems] = useState<any[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(1920); // Default fallback
  const [viewportHeight, setViewportHeight] = useState(1080); // Default fallback
  const [isStickyNoteOpen, setIsStickyNoteOpen] = useState(false);
  const [isTerminalVisible, setIsTerminalVisible] = useState(true);
  const [isTerminalMinimized, setIsTerminalMinimized] = useState(false);
  const [isTerminalMaximized, setIsTerminalMaximized] = useState(false);

  // Check if any windows are open (not minimized)
  const hasOpenWindows = windows.length > 0;

  useEffect(() => {
    const checkViewport = () => {
      const newIsMobile = window.innerWidth < 768;
      console.log("Desktop: Viewport check:", { 
        width: window.innerWidth, 
        height: window.innerHeight, 
        isMobile: newIsMobile 
      });
      setIsMobile(newIsMobile);
      setViewportWidth(window.innerWidth);
      setViewportHeight(window.innerHeight);
    };

    // Initial check
    checkViewport();

    // Add resize listener
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  useEffect(() => {
    let ticking = false;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setMousePosition({ x: e.clientX, y: e.clientY });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Calculate responsive window positions and sizes
  const getWindowPositionAndSize = (totalWindows: number, isTrash = false) => {
    if (isMobile) {
      // Mobile: Full width windows with small padding
      const padding = 10;
      const taskbarHeight = 56; // Mobile taskbar height

      return {
        position: { x: padding, y: padding },
        size: {
          width: viewportWidth - padding * 2,
          height: viewportHeight - taskbarHeight - padding * 2,
        },
      };
    }

    // Desktop calculations (unchanged)
    const iconAreaWidth = Math.min(200, viewportWidth * 0.15);
    const edgePadding = 20;
    const availableWidth = viewportWidth - iconAreaWidth - edgePadding * 2;
    const availableHeight = viewportHeight - edgePadding * 2 - 60; // Account for taskbar

    const windowWidth = Math.min(availableWidth * 0.85, isTrash ? 900 : 1000);
    const windowHeight = Math.min(availableHeight * 0.95, isTrash ? 800 : 900);

    const startX = Math.min(iconAreaWidth + 50, viewportWidth * 0.2);
    const startY = edgePadding + 20;

    const staggerAmount = Math.min(30, viewportWidth * 0.02);
    const posX = startX + totalWindows * staggerAmount;
    const posY = startY + totalWindows * staggerAmount;

    const safeX = Math.min(posX, viewportWidth - windowWidth - edgePadding);
    const safeY = Math.min(
      posY,
      viewportHeight - windowHeight - edgePadding - 60,
    );

    return {
      position: { x: safeX, y: safeY },
      size: { width: windowWidth, height: windowHeight },
    };
  };

  const openWindow = (windowData: any) => {
    // Calculate total windows for proper staggering
    const totalWindows = windows.length + minimizedWindows.length;

    // Get responsive position and size
    const isTrash = windowData.content === "trash";
    const { position, size } = getWindowPositionAndSize(totalWindows, isTrash);

    // Create the window with responsive positioning and proper z-index
    const newWindow = {
      ...windowData,
      id: Date.now(),
      position,
      size,
      isMinimized: false,
      zIndex: 1000 + windows.length + 1, // Ensure windows are above icons (z-index 1000+)
      trashedItems: isTrash ? trashedItems : undefined,
      onRestoreItem: isTrash ? restoreFromTrash : undefined,
      onMoveToTrash: isTrash ? moveToTrash : undefined,
      onOpenWindow: openWindow,
    };

    setWindows((prev) => [...prev, newWindow]);
  };

  const closeWindow = (id: number) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
    setMinimizedWindows((prev) => prev.filter((w) => w.id !== id));
  };

  const minimizeWindow = (id: number) => {
    console.log("Desktop: minimizeWindow called with ID:", id);
    const window = windows.find((w) => w.id === id);
    console.log("Desktop: found window to minimize:", window);
    if (window) {
      console.log("Desktop: minimizing window");
      setMinimizedWindows((prev) => {
        const newMinimized = [...prev, window];
        console.log("Desktop: updated minimizedWindows:", newMinimized);
        return newMinimized;
      });
      setWindows((prev) => {
        const newWindows = prev.filter((w) => w.id !== id);
        console.log("Desktop: updated windows after minimize:", newWindows);
        return newWindows;
      });
    } else {
      console.log("Desktop: ERROR - window not found for minimization");
    }
  };

  const restoreWindow = (id: number) => {
    console.log("Desktop: restoreWindow called with ID:", id);
    console.log("Desktop: current minimizedWindows:", minimizedWindows);
    const window = minimizedWindows.find((w) => w.id === id);
    console.log("Desktop: found window to restore:", window);
    if (window) {
      console.log("Desktop: restoring window");
      setWindows((prev) => {
        const newWindows = [...prev, window];
        console.log("Desktop: updated windows after restore:", newWindows);
        return newWindows;
      });
      setMinimizedWindows((prev) => {
        const newMinimized = prev.filter((w) => w.id !== id);
        console.log(
          "Desktop: updated minimizedWindows after restore:",
          newMinimized,
        );
        return newMinimized;
      });
    } else {
      console.log("Desktop: ERROR - window not found in minimizedWindows");
    }
  };

  const moveToTrash = (item: any) => {
    setTrashedItems((prev) => [...prev, { ...item, trashedAt: Date.now() }]);
  };

  const restoreFromTrash = (itemId: string) => {
    setTrashedItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  // Terminal window management functions
  const handleTerminalClose = () => {
    setIsTerminalVisible(false);
  };

  const handleTerminalMinimize = () => {
    setIsTerminalMinimized(true);
  };

  const handleTerminalMaximize = () => {
    setIsTerminalMaximized(!isTerminalMaximized);
  };

  const handleToggleTerminal = () => {
    if (isTerminalMinimized) {
      setIsTerminalMinimized(false);
    } else {
      setIsTerminalVisible(!isTerminalVisible);
    }
  };

  // Update existing windows when viewport changes
  useEffect(() => {
    if (windows.length > 0) {
      setWindows((prevWindows) =>
        prevWindows.map((window, index) => {
          // Recalculate position and size for each window
          const { position, size } = getWindowPositionAndSize(
            index,
            window.content === "trash",
          );

          return {
            ...window,
            position,
            size,
            zIndex: 1000 + index + 1, // Maintain proper z-index
            trashedItems:
              window.content === "trash" ? trashedItems : window.trashedItems,
            onOpenWindow: openWindow,
          };
        }),
      );
    }
  }, [viewportWidth, viewportHeight, isMobile]);

  // Update existing trash windows when trashedItems changes
  useEffect(() => {
    setWindows((prevWindows) =>
      prevWindows.map((window) => {
        if (window.content === "trash") {
          return {
            ...window,
            trashedItems: trashedItems,
            onOpenWindow: openWindow,
          };
        }
        return {
          ...window,
          onOpenWindow: openWindow,
        };
      }),
    );
  }, [trashedItems, windows.length, minimizedWindows.length]);

  return (
    <div className={styles.desktop}>
      <BackgroundAnimation mousePosition={mousePosition} disableMouseEffect={hasOpenWindows} />

      {/* Desktop Icons - Lower z-index to stay behind windows */}
      <div
        style={{
          zIndex: 1, // Lower z-index for icons
        }}
      >
        <DesktopIcons
          onOpenWindow={openWindow}
          trashedItems={trashedItems}
          onMoveToTrash={moveToTrash}
          onRestoreFromTrash={restoreFromTrash}
          isMobile={isMobile}
          showStickyNoteIcon={isMobile}
          onStickyNoteIconClick={isMobile ? () => {
            console.log('Opening commands window');
            openWindow({
              title: "Commands",
              content: "commands",
              icon: FileText,
            });
          } : undefined}
        />
      </div>

      {/* Terminal - repositioned for mobile to bottom */}
      {isTerminalVisible && !isTerminalMinimized && (
        <div
          className={
            isMobile
              ? "fixed bottom-16 left-2 right-2 h-80 max-w-full"
              : isTerminalMaximized
              ? "fixed inset-0 z-50"
              : "absolute top-8 right-8 w-96 h-96"
          }
          style={{ zIndex: isTerminalMaximized ? 9998 : 10 }} // Terminal above icons but below windows
        >
          <Terminal
            onClose={handleTerminalClose}
            onMinimize={handleTerminalMinimize}
            onMaximize={handleTerminalMaximize}
            isMaximized={isTerminalMaximized}
          />
        </div>
      )}

      {/* Windows - Highest z-index */}
      <WindowManager
        windows={windows}
        onClose={closeWindow}
        onMinimize={minimizeWindow}
        setWindows={setWindows}
        isMobile={isMobile}
      />

      {/* Taskbar - High z-index to stay on top */}
      <div style={{ zIndex: 9999 }}>
        <Taskbar
          minimizedWindows={minimizedWindows}
          onRestore={restoreWindow}
          isMobile={isMobile}
          isTerminalMinimized={isTerminalMinimized}
          onRestoreTerminal={() => setIsTerminalMinimized(false)}
          onToggleTerminal={handleToggleTerminal}
        />
      </div>

      {/* Update Notification - High z-index but below taskbar */}
      <UpdateNotification isMobile={isMobile} />

      {/* Terminal Commands Note - floating overlay on mobile, original location on desktop */}
      {isMobile ? (
        isStickyNoteOpen && (
          <div className="fixed bottom-[38rem] left-2 right-2 max-w-xs w-full max-h-56 overflow-y-auto z-30 mx-auto">
            <TerminalCommandsNote
              isMobile={isMobile}
              isOpen={isStickyNoteOpen}
              onClose={() => setIsStickyNoteOpen(false)}
            />
          </div>
        )
      ) : (
        <div className="absolute top-[20px] right-0 w-96 z-20">
          <TerminalCommandsNote isMobile={isMobile} />
        </div>
      )}
    </div>
  );
}
