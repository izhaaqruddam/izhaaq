'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import Search from './search'
import essaysData from '@/lib/essays.json'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMac, setIsMac] = useState(true)

  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0)
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsSearchOpen(!isSearchOpen)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isSearchOpen])

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Essays', href: '/essays' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <nav className="max-w-4xl mx-auto px-6 md:px-8 py-6 flex justify-between items-center">
        <div className="flex flex-col">
          <Link 
            href="/" 
            onClick={() => {
              if (typeof window !== 'undefined') {
                sessionStorage.setItem('hasLoadedBefore', 'true')
              }
            }}
            className="font-serif text-2xl font-bold text-[#FFB7C5] hover:text-[#FFD1DC] transition-colors duration-200"
          >
            Sosei
          </Link>
          <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground/60 font-medium">
            Japanese for Creation / Revival
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8 items-center">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => {
                if (typeof window !== 'undefined') {
                  sessionStorage.setItem('hasLoadedBefore', 'true')
                }
              }}
              className="text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
          
          <button
            onClick={() => setIsSearchOpen(true)}
            className="group flex items-center gap-3 p-2 bg-secondary/30 hover:bg-secondary/60 border border-border/50 rounded-sm transition-all duration-300 ml-2"
            aria-label="Search"
          >
            <svg className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded border border-border/50 bg-background/50">
              <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-tighter">
                {isMac ? '⌘' : 'Ctrl'}
              </span>
              <span className="text-[10px] text-muted-foreground font-medium uppercase">K</span>
            </div>
          </button>
        </div>

        {/* Mobile Search & Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 text-muted-foreground hover:text-accent transition-colors"
            aria-label="Search"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex flex-col gap-1.5 w-6 h-6 justify-center"
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-0.5 bg-foreground transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-foreground transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-foreground transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="max-w-4xl mx-auto px-6 py-4 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-200"
                onClick={() => {
                  setIsOpen(false)
                  if (typeof window !== 'undefined') {
                    sessionStorage.setItem('hasLoadedBefore', 'true')
                  }
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
      
      <Search essays={essaysData} isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  )
}
