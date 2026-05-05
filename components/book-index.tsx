'use client'

import { motion, Variants } from 'framer-motion'
import Link from 'next/link'

interface IndexEntry {
  title: string
  date: string
  href: string
}

interface IndexCategory {
  category: string
  items: IndexEntry[]
}

const sections: IndexCategory[] = [
  {
    category: 'Introduction',
    items: [
      { title: 'The Art of Thoughtful Living', date: '15 MAR 24', href: '/blog/thoughtful-living/the-art-of-thoughtful-living' },
      { title: 'Unbothered: A Philosophy of Presence', date: '08 MAR 24', href: '/blog/unbothered-philosophy/unbothered-a-philosophy-of-presence' },
    ]
  },
  {
    category: 'First',
    items: [
      { title: 'The First Principles of Design', date: '15 MAR 24', href: '/blog/thoughtful-living/the-art-of-thoughtful-living' },
    ]
  },
  {
    category: 'Takedowns',
    items: [
      { title: 'The Quiet Rebellion', date: '05 FEB 24', href: '/blog/quiet-rebellion/the-quiet-rebellion' },
    ]
  },
  {
    category: 'GO',
    items: [
      { title: 'Beyond Hustle Culture', date: '18 FEB 24', href: '/blog/beyond-hustle/beyond-hustle-culture' },
    ]
  },
  {
    category: 'Progress',
    items: [
      { title: 'Building Without Burnout', date: '22 JAN 24', href: '/blog/building-without-burnout/building-without-burnout' },
    ]
  },
  {
    category: 'Productivity',
    items: [
      { title: 'The Myth of Efficiency', date: '15 MAR 24', href: '/blog/thoughtful-living/the-art-of-thoughtful-living' },
    ]
  },
  {
    category: 'Competitors',
    items: [
      { title: 'On Solitude and Connection', date: '28 FEB 24', href: '/blog/solitude-connection/on-solitude-and-connection' },
    ]
  },
  {
    category: 'Evolution',
    items: [
      { title: 'The Growth Trap', date: '22 JAN 24', href: '/blog/building-without-burnout/building-without-burnout' },
    ]
  },
  {
    category: 'Culture',
    items: [
      { title: 'Identity and Belonging', date: '08 MAR 24', href: '/blog/unbothered-philosophy/unbothered-a-philosophy-of-presence' },
    ]
  },
  {
    category: 'Conclusion',
    items: [
      { title: 'End of Chapter', date: '28 FEB 24', href: '/blog/solitude-connection/on-solitude-and-connection' },
    ]
  },
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
