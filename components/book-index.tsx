'use client'

import { motion, Variants } from 'framer-motion'
import Link from 'next/link'
import essays from '@/lib/essays.json'

interface IndexEntry {
  title: string
  date: string
  href: string
}

interface IndexCategory {
  category: string
  items: IndexEntry[]
}

/**
 * Formats a date string like "March 15, 2024" into "15 MAR 24"
 */
function formatDate(dateStr: string) {
  try {
    const date = new Date(dateStr)
    if (isNaN(date.getTime())) return dateStr
    const day = date.getDate().toString().padStart(2, '0')
    const month = date.toLocaleString('default', { month: 'short' }).toUpperCase()
    const year = date.getFullYear().toString().slice(-2)
    return `${day} ${month} ${year}`
  } catch {
    return dateStr
  }
}

// Dynamically generate sections from essays.json
const groupedEssays = essays.reduce((acc: Record<string, IndexEntry[]>, essay) => {
  const category = essay.category || 'Uncategorized'
  if (!acc[category]) acc[category] = []

  acc[category].push({
    title: essay.title,
    date: formatDate(essay.date),
    href: `/blog/${essay.slug}`
  })

  return acc
}, {})

const dynamicSections: IndexCategory[] = Object.entries(groupedEssays).map(([category, items]) => ({
  category,
  items
}))

// Add static administrative sections
const sections: IndexCategory[] = [
  ...dynamicSections,
  {
    category: 'Resources',
    items: [
      { title: 'The Author Biography', date: '2026', href: '/about' },
    ]
  },
  {
    category: 'Acknowledgements',
    items: [
      { title: 'Direct Correspondence', date: '2026', href: '/contact' },
    ]
  }
]

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

export default function BookIndex() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-5xl mx-auto py-4 px-4"
    >
      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          {sections.map((section) => (
            <motion.div key={section.category} variants={item} className="group">
              <h2
                className="text-2xl text-foreground/40 mb-3 transition-opacity tracking-widest"
                style={{ fontFamily: 'var(--font-imfell)' }}
              >
                {section.category}
              </h2>
              <div className="space-y-2">
                {section.items.map((entry) => (
                  <div key={entry.title} className="pl-6 md:pl-8">
                    <Link href={entry.href} className="flex items-baseline gap-4 group/item">
                      <span
                        className="index-title !text-lg !text-foreground/60 group-hover/item:!text-foreground transition-colors leading-tight"
                        style={{ fontFamily: 'var(--font-imfell)' }}
                      >
                        {entry.title}
                      </span>
                      <span className="index-number !text-[11px] text-accent font-mono tracking-tighter whitespace-nowrap">
                        {entry.date}
                      </span>
                    </Link>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
