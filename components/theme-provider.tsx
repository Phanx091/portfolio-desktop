'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Theme = "default" | "update" | "cyberpunk" | "sunset" | "ocean";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isUpdating: boolean;
  setIsUpdating: (updating: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("default");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    // Apply theme changes to CSS custom properties
    const root = document.documentElement;
    
    switch (theme) {
      case "update":
        // Orange/amber theme for update mode
        root.style.setProperty("--color-primary", "#f97316");
        root.style.setProperty("--color-primary-dark", "#ea580c");
        root.style.setProperty("--color-cyan", "#f97316");
        root.style.setProperty("--color-purple", "#f59e0b");
        root.style.setProperty("--color-orange", "#f97316");
        root.style.setProperty("--color-green", "#f59e0b");
        root.style.setProperty("--color-pink", "#f97316");
        root.style.setProperty("--color-blue", "#f97316");
        root.style.setProperty("--color-red", "#f97316");
        root.style.setProperty("--gradient-primary", "linear-gradient(135deg, #f97316, #f59e0b)");
        root.style.setProperty("--gradient-surface", "linear-gradient(135deg, #1f2937, #374151)");
        root.style.setProperty("--gradient-background", "linear-gradient(135deg, #0f172a, #1e293b)");
        break;
      case "cyberpunk":
        // Neon green/cyan theme
        root.style.setProperty("--color-primary", "#00ff88");
        root.style.setProperty("--color-primary-dark", "#00cc6a");
        root.style.setProperty("--color-cyan", "#00ff88");
        root.style.setProperty("--color-purple", "#00ffff");
        root.style.setProperty("--color-orange", "#ff0080");
        root.style.setProperty("--color-green", "#00ff88");
        root.style.setProperty("--color-pink", "#ff0080");
        root.style.setProperty("--color-blue", "#00ffff");
        root.style.setProperty("--color-red", "#ff0080");
        root.style.setProperty("--gradient-primary", "linear-gradient(135deg, #00ff88, #00ffff)");
        root.style.setProperty("--gradient-surface", "linear-gradient(135deg, #0a0a0a, #1a1a1a)");
        root.style.setProperty("--gradient-background", "linear-gradient(135deg, #000000, #0a0a0a)");
        break;
      case "sunset":
        // Warm sunset theme
        root.style.setProperty("--color-primary", "#ff6b35");
        root.style.setProperty("--color-primary-dark", "#e55a2b");
        root.style.setProperty("--color-cyan", "#ff6b35");
        root.style.setProperty("--color-purple", "#ff8e53");
        root.style.setProperty("--color-orange", "#ff6b35");
        root.style.setProperty("--color-green", "#ff8e53");
        root.style.setProperty("--color-pink", "#ff6b35");
        root.style.setProperty("--color-blue", "#ff8e53");
        root.style.setProperty("--color-red", "#ff6b35");
        root.style.setProperty("--gradient-primary", "linear-gradient(135deg, #ff6b35, #ff8e53)");
        root.style.setProperty("--gradient-surface", "linear-gradient(135deg, #2d1b1b, #3d2b2b)");
        root.style.setProperty("--gradient-background", "linear-gradient(135deg, #1a0f0f, #2d1b1b)");
        break;
      case "ocean":
        // Deep ocean theme
        root.style.setProperty("--color-primary", "#0891b2");
        root.style.setProperty("--color-primary-dark", "#0e7490");
        root.style.setProperty("--color-cyan", "#0891b2");
        root.style.setProperty("--color-purple", "#06b6d4");
        root.style.setProperty("--color-orange", "#0891b2");
        root.style.setProperty("--color-green", "#06b6d4");
        root.style.setProperty("--color-pink", "#0891b2");
        root.style.setProperty("--color-blue", "#0891b2");
        root.style.setProperty("--color-red", "#0891b2");
        root.style.setProperty("--gradient-primary", "linear-gradient(135deg, #0891b2, #06b6d4)");
        root.style.setProperty("--gradient-surface", "linear-gradient(135deg, #0f172a, #1e293b)");
        root.style.setProperty("--gradient-background", "linear-gradient(135deg, #020617, #0f172a)");
        break;
      default:
        // Reset to default theme
        root.style.setProperty("--color-primary", "#3b82f6");
        root.style.setProperty("--color-primary-dark", "#2563eb");
        root.style.setProperty("--color-cyan", "#06b6d4");
        root.style.setProperty("--color-purple", "#8b5cf6");
        root.style.setProperty("--color-orange", "#f97316");
        root.style.setProperty("--color-green", "#10b981");
        root.style.setProperty("--color-pink", "#ec4899");
        root.style.setProperty("--color-blue", "#3b82f6");
        root.style.setProperty("--color-red", "#ef4444");
        root.style.setProperty("--gradient-primary", "linear-gradient(135deg, #3b82f6, #8b5cf6)");
        root.style.setProperty("--gradient-surface", "linear-gradient(135deg, #1f2937, #374151)");
        root.style.setProperty("--gradient-background", "linear-gradient(135deg, #0f172a, #1e293b)");
        break;
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isUpdating, setIsUpdating }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
