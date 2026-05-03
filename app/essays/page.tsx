'use client'

import Navigation from '@/components/navigation'
import Link from 'next/link'
import { useState } from 'react'
import essaysData from '@/lib/essays.json'

type SortOption = 'latest' | 'popular'

export default function Essays() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedSort, setSelectedSort] = useState<SortOption>('latest')
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const categories = ['All', ...new Set(essaysData.map(e => e.category))]

  let filteredEssays = selectedCategory === 'All' 
    ? essaysData 
    : essaysData.filter(essay => essay.category === selectedCategory)

  // Apply sorting
  if (selectedSort === 'latest') {
    filteredEssays = [...filteredEssays].sort((a, b) => {
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()
      return dateB - dateA
    })
  } else if (selectedSort === 'popular') {
    filteredEssays = [...filteredEssays].filter(e => e.isPopular).sort((a, b) => {
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()
      return dateB - dateA
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="max-w-4xl mx-auto px-6 md:px-8 py-20 pt-32">
        <section className="mb-16">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-8 text-balance">
            Essays & Thoughts
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            A collection of long-form essays exploring philosophy, presence, and intentional living.
          </p>
        </section>

        {/* Filters Section */}
        <div className="mb-12 space-y-4">
          {/* Category Filter */}
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3 font-semibold">
              Category
            </p>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 text-xs font-medium transition-colors duration-200 border border-border rounded-sm ${
                    selectedCategory === category
                      ? 'bg-accent text-accent-foreground border-accent'
                      : 'text-muted-foreground hover:text-foreground hover:border-accent/50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Sort Filter */}
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3 font-semibold">
              Sort By
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                { value: 'latest' as SortOption, label: 'Latest' },
                { value: 'popular' as SortOption, label: 'Most Popular' },
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => setSelectedSort(option.value)}
                  className={`px-3 py-1.5 text-xs font-medium transition-colors duration-200 border border-border rounded-sm ${
                    selectedSort === option.value
                      ? 'bg-accent text-accent-foreground border-accent'
                      : 'text-muted-foreground hover:text-foreground hover:border-accent/50'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-xs text-muted-foreground mb-8">
          Showing {filteredEssays.length} {filteredEssays.length === 1 ? 'essay' : 'essays'}
        </p>

        {/* Essays Grid */}
        <div className="space-y-8">
          {filteredEssays.map(essay => (
            <Link
              key={essay.id}
              href={`/blog/${essay.slug}/${essay.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}`}
              onMouseEnter={() => setHoveredId(essay.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group block"
            >
              <article className="py-8 border-b border-border hover:border-accent/30 transition-colors duration-200">
                <div className="flex justify-between items-start gap-4 mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs uppercase tracking-widest text-accent font-semibold">
                        {essay.category}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {essay.date}
                      </span>
                    </div>
                    <h2 className={`text-3xl font-serif font-bold group-hover:text-accent transition-colors duration-200 ${hoveredId === essay.id ? 'text-accent' : ''}`}>
                      {essay.title}
                    </h2>
                  </div>
                </div>
                <p className="text-foreground/80 leading-relaxed text-pretty mb-4">
                  {essay.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-accent text-sm font-medium group-hover:translate-x-2 transition-transform duration-200">
                    Read essay →
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {essay.wordCount} words
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
