import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/styles/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Portfolio Desktop OS",
  description: "Futuristic portfolio website with desktop OS interface",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Prevent keyboard activation on mobile
              if (typeof window !== 'undefined') {
                document.addEventListener('DOMContentLoaded', function() {
                  // Prevent focus on non-input elements
                  document.addEventListener('touchstart', function(e) {
                    const target = e.target;
                    if (target && target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA' && target.tagName !== 'SELECT') {
                      target.blur();
                      if (document.activeElement) {
                        document.activeElement.blur();
                      }
                    }
                  }, { passive: true });
                  
                  // Prevent focus on click events
                  document.addEventListener('click', function(e) {
                    const target = e.target;
                    if (target && target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA' && target.tagName !== 'SELECT') {
                      setTimeout(() => {
                        if (document.activeElement && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA' && document.activeElement.tagName !== 'SELECT') {
                          document.activeElement.blur();
                        }
                      }, 0);
                    }
                  }, { passive: true });
                });
              }
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
