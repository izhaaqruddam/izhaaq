'use client'

import Link from 'next/link'
import Navigation from '@/components/navigation'
import LoadingScreen from '@/components/loading-screen'
import { useState, useEffect } from 'react'
import essaysData from '@/lib/essays.json'

interface Essay {
  id: string
  title: string
  excerpt: string
  date: string
  category: string
  slug: string
  wordCount: number
  isPopular: boolean
  content: string
}

export default function Home() {
  const [hoveredPostId, setHoveredPostId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasNavigated, setHasNavigated] = useState(false)

  useEffect(() => {
    // Only show loading on initial page load, not on navigation
    const hasLoadedBefore = sessionStorage.getItem('hasLoadedBefore')
    if (hasLoadedBefore) {
      setIsLoading(false)
    }
    setHasNavigated(true)
  }, [])

  // Get latest essays for home page (sorted by date)
  const latestEssays = [...essaysData].sort((a, b) => {
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()
    return dateB - dateA
  }).slice(0, 4)

  const handleLoadingComplete = () => {
    setIsLoading(false)
    sessionStorage.setItem('hasLoadedBefore', 'true')
  }

  return (
    <div className="min-h-screen bg-background">
      {isLoading && hasNavigated && <LoadingScreen onLoadComplete={handleLoadingComplete} />}
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-6 md:px-8 py-20">
        {/* Hero Section */}
        <section className="mb-20 pt-8">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 text-balance leading-tight">
            Essays on presence, philosophy, and living well
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Welcome to my collection of long-form essays and reflections. Here I explore ideas about intentional living, 
            the philosophy of Sosei, and thoughts on building a life that genuinely resonates with who you are.
          </p>
        </section>

        {/* Blog Posts */}
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-12">
            Latest Essays
          </h2>
          
          <div className="space-y-8">
            {latestEssays.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}/${post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}`}
                onMouseEnter={() => setHoveredPostId(post.id)}
                onMouseLeave={() => setHoveredPostId(null)}
                className="group block"
              >
                <article className="py-6 border-b border-border transition-opacity duration-200">
                  <div className="flex justify-between items-start mb-3 gap-4">
                    <h3 className={`text-2xl font-serif font-semibold group-hover:text-accent transition-colors duration-200 ${hoveredPostId === post.id ? 'text-accent' : ''}`}>
                      {post.title}
                    </h3>
                    <span className="text-sm text-muted-foreground whitespace-nowrap mt-1">
                      {post.date}
                    </span>
                  </div>
                  <p className="text-foreground/80 leading-relaxed text-pretty">
                    {post.excerpt}
                  </p>
                  <div className="flex justify-between items-center mt-4">
                    <div className="text-accent text-sm font-medium group-hover:translate-x-2 transition-transform duration-200">
                      Read more →
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {post.wordCount} words
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
