'use client'

import { useEffect, useState } from 'react'

const welcomeMessages = [
  { text: 'Welcome', lang: 'English' },
  { text: 'ようこそ', lang: 'Japanese' },
  { text: 'स्वागत है', lang: 'Hindi' },
  { text: 'స్వాగతం', lang: 'Telugu' },
  { text: 'வரவேற்கிறோம்', lang: 'Tamil' },
  { text: 'ಸ್ವಾಗತ', lang: 'Kannada' },
  { text: 'خوش آمدید', lang: 'Urdu' },
]

interface LoadingScreenProps {
  onLoadComplete: () => void
}

export default function LoadingScreen({ onLoadComplete }: LoadingScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % welcomeMessages.length)
    }, 400)

    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onLoadComplete, 300)
    }, 3000)

    return () => {
      clearInterval(interval)
      clearTimeout(timer)
    }
  }, [onLoadComplete])

  if (!isVisible) {
    return null
  }

  return (
    <div className={`fixed inset-0 bg-gradient-to-br from-background via-background to-background/95 z-50 flex items-center justify-center transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'} backdrop-blur-sm`}>
      <div className="text-center px-6">
        {/* Modern animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-32 h-32 bg-accent/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-accent/3 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10">
          {/* Main welcome text with modern font styling */}
          <div className="mb-8 min-h-24 flex items-center justify-center">
            <h1 
              key={currentIndex}
              className="text-7xl md:text-8xl font-light tracking-tight text-foreground animate-in fade-in duration-500"
              style={{
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontWeight: 300,
                letterSpacing: '-0.02em'
              }}
            >
              {welcomeMessages[currentIndex].text}
            </h1>
          </div>

          {/* Language name */}
          <p className="text-sm font-medium text-accent/60 uppercase tracking-widest mb-8">
            {welcomeMessages[currentIndex].lang}
          </p>

          {/* Modern progress indicator */}
          <div className="flex justify-center items-center gap-1.5">
            {welcomeMessages.map((_, index) => (
              <div
                key={index}
                className={`transition-all duration-300 ease-out ${
                  index === currentIndex 
                    ? 'w-8 h-1.5 bg-accent rounded-full' 
                    : 'w-1.5 h-1.5 bg-border rounded-full'
                }`}
              />
            ))}
          </div>

          {/* Loading percentage */}
          <p className="text-xs text-muted-foreground mt-8">
            {Math.round(((currentIndex + 1) / welcomeMessages.length) * 100)}%
          </p>
        </div>
      </div>
    </div>
  )
}
