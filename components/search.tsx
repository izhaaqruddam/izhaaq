'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface SearchResult {
  id: string
  title: string
  excerpt: string
  category: string
  slug: string
}

interface SearchProps {
  essays: SearchResult[]
  isOpen: boolean
  onClose: () => void
}

export default function Search({ essays, isOpen, onClose }: SearchProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    const filtered = essays.filter(
      (essay) =>
        essay.title.toLowerCase().includes(query.toLowerCase()) ||
        essay.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        essay.category.toLowerCase().includes(query.toLowerCase())
    )
    setResults(filtered)
  }, [query, essays])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.addEventListener('keydown', handleEscape)
      return () => {
        document.body.style.overflow = 'unset'
        document.removeEventListener('keydown', handleEscape)
      }
    }
  }, [isOpen, onClose])

  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) return text
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'))
    return (
      <>
        {parts.map((part, i) => (
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span key={i} className="bg-accent/20 text-accent font-semibold px-0.5 rounded">
              {part}
            </span>
          ) : (
            <span key={i}>{part}</span>
          )
        ))}
      </>
    )
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-md z-[100]" onClick={onClose}>
      <div
        className="fixed top-0 left-0 right-0 bg-background border-b border-border max-h-screen overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Search</h2>
            <button
              onClick={onClose}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Close (Esc)
            </button>
          </div>

          <input
            type="text"
            placeholder="Search essays by title, content or category..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-4xl md:text-4xl font-serif placeholder:text-muted-foreground/30 border-none outline-none text-foreground mb-12"
          />

          <div className="space-y-12">
            {query && (
              <div>
                {results.length > 0 ? (
                  <div className="space-y-10">
                    <p className="text-sm text-muted-foreground mb-6">
                      Found {results.length} {results.length === 1 ? 'result' : 'results'} for &quot;{query}&quot;
                    </p>
                    {results.map((essay) => (
                      <Link
                        key={essay.id}
                        href={`/blog/${essay.slug}/${essay.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}`}
                        onClick={onClose}
                        className="group block"
                      >
                        <article className="border-l-2 border-transparent group-hover:border-accent pl-6 transition-all">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-xs uppercase tracking-widest text-accent font-medium">
                              {highlightText(essay.category, query)}
                            </span>
                          </div>
                          <h3 className="text-2xl font-serif font-bold mb-3 group-hover:text-accent transition-colors leading-tight">
                            {highlightText(essay.title, query)}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed text-base max-w-2xl">
                            {highlightText(essay.excerpt, query)}
                          </p>
                          <div className="text-accent text-sm font-medium mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 duration-300">
                            Read Essay <span className="text-lg">→</span>
                          </div>
                        </article>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <p className="text-2xl font-serif text-muted-foreground">No essays found for &quot;{query}&quot;</p>
                    <p className="text-sm text-muted-foreground mt-2">Try searching for a different keyword</p>
                  </div>
                )}
              </div>
            )}

            {!query && (
              <div className="py-12 border-t border-border/50">
                <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6">Suggested Searches</h4>
                <div className="flex flex-wrap gap-3">
                  {['Presence', 'Philosophy', 'Living Well', 'Identity'].map((term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-4 py-2 bg-secondary/50 hover:bg-secondary text-sm rounded-full transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
