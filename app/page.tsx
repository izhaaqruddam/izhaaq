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
    <div className="min-h-screen bg-background selection:bg-accent/30 flex flex-col items-center justify-center py-8 md:py-12">
      {isLoading && hasNavigated && <LoadingScreen onLoadComplete={handleLoadingComplete} />}

      <main className="w-full px-4 md:px-8 overflow-hidden flex flex-col items-center">
        <div className="w-full max-w-5xl flex items-center justify-center mb-12 text-foreground/40">
          <span className="text-xs font-mono">&lt;</span>
          <div className="h-[1px] flex-grow ml-4 bg-foreground/20" />
          <span className="px-4 text-[10px] uppercase tracking-[0.4em] font-bold whitespace-nowrap">Table of Contents</span>
          <div className="h-[1px] flex-grow mr-4 bg-foreground/20" />
          <span className="text-xs font-mono">&gt;</span>
        </div>

        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-12 text-center w-full"
        >
          <h1 className="font-bold uppercase text-foreground leading-none tracking-tight mb-2 w-full"
            style={{ fontSize: 'clamp(3rem, 16vw, 14rem)', fontFamily: 'Butterbrotpapier' }}
          >
            Izhaaq
          </h1>
          <p className="text-sm md:text-base text-foreground/40 italic mb-8" style={{ fontFamily: 'var(--font-imfell)' }}>
            *it means laughter
          </p>
          <div className="h-px w-8 bg-foreground/10 mx-auto" />
        </motion.header>

        <section className="w-full max-w-5xl">
          <BookIndex />
        </section>

        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="text-[9px] uppercase tracking-[0.4em] font-bold text-muted-foreground/40">
            Published by Izhaaq &copy; 2026
          </div>
        </motion.footer>
      </main>
    </div>
  )
}
