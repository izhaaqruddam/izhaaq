'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const loadingMessages = [
  'Opening Anthology',
  'Consulting the Index',
  'Preparing the Leaves',
  'Setting the Type',
  'Binding the Thoughts',
]

interface LoadingScreenProps {
  onLoadComplete: () => void
}

export default function LoadingScreen({ onLoadComplete }: LoadingScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % loadingMessages.length)
    }, 600)

    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onLoadComplete, 500)
    }, 3500)

    return () => {
      clearInterval(interval)
      clearTimeout(timer)
    }
  }, [onLoadComplete])

  if (!isVisible) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      className="fixed inset-0 bg-background z-[100] flex flex-col items-center justify-center text-center p-6"
    >
      <div className="max-w-xs w-full">
        <div className="mb-12 h-16 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="text-2xl font-serif italic text-foreground"
            >
              {loadingMessages[currentIndex]}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative w-full h-px bg-foreground/10 overflow-hidden">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 3, ease: "easeInOut" }}
            className="absolute inset-0 bg-accent origin-left"
          />
        </div>

        <div className="mt-8 flex justify-between items-center text-[9px] uppercase tracking-[0.4em] font-bold text-muted-foreground">
          <span className="font-clash font-bold uppercase">Izhaaq</span>
          <span>Vol I. 2026</span>
        </div>
      </div>

    </motion.div>
  )
}
