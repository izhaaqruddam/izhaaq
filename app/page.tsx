'use client'

import LoadingScreen from '@/components/loading-screen'
import BookIndex from '@/components/book-index'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [hasNavigated, setHasNavigated] = useState(false)

  useEffect(() => {
    const hasLoadedBefore = sessionStorage.getItem('hasLoadedBefore')
    if (hasLoadedBefore) {
      setIsLoading(false)
    }
    setHasNavigated(true)
  }, [])

  const handleLoadingComplete = () => {
    setIsLoading(false)
    sessionStorage.setItem('hasLoadedBefore', 'true')
  }

  return (
    <div className="min-h-screen bg-background selection:bg-accent/30 flex flex-col items-center justify-center py-24 md:py-32">
      {isLoading && hasNavigated && <LoadingScreen onLoadComplete={handleLoadingComplete} />}

      <main className="w-full px-6">
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-24 text-center overflow-hidden"
        >
          <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-accent mb-4 block">
            Volume I
          </span>
          <h1 className="font-termina font-bold uppercase text-foreground leading-none tracking-tighter mb-8"
            style={{ fontSize: 'clamp(2.5rem, 10vw, 8rem)' }}
          >
            Izhaaq
          </h1>
          <div className="h-px w-8 bg-foreground/10 mx-auto" />
        </motion.header>

        <section>
          <BookIndex />
        </section>

        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-32 text-center"
        >
          <div className="text-[9px] uppercase tracking-[0.4em] font-bold text-muted-foreground/40">
            Published by Izhaaq &copy; 2026
          </div>
        </motion.footer>
      </main>
    </div>
  )
}
