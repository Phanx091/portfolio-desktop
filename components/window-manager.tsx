"use client"
import Window from "@/components/window"

interface WindowManagerProps {
  windows: any[]
  onClose: (id: number) => void
  onMinimize: (id: number) => void
  setWindows: (windows: any[]) => void
  isMobile?: boolean
}

export default function WindowManager({
  windows,
  onClose,
  onMinimize,
  setWindows,
  isMobile = false,
}: WindowManagerProps) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {windows.map((window) => (
        <Window
          key={window.id}
          window={window}
          onClose={onClose}
          onMinimize={onMinimize}
          onUpdate={(updatedWindow) => {
            setWindows((prev: Window[]) => prev.map((w: Window) => w.id === updatedWindow.id ? updatedWindow : w))
          }}
          isMobile={isMobile}
        />
      ))}
    </div>
  )
}
