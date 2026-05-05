'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Contact() {
  return (
    <div className="min-h-screen bg-background selection:bg-accent/30 text-foreground">
      <main className="book-container pt-32">
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20 text-center"
        >
          <div className="book-chapter-num">Chapter XV</div>
          <h1 className="book-title">Establish Contact</h1>
          <p className="text-lg text-muted-foreground italic font-serif leading-relaxed max-w-xl mx-auto">
            "Every dialogue is a bridge between worlds. I read every message, 
            contemplating every thought shared."
          </p>
        </motion.section>

        <section className="max-w-2xl mx-auto">
          <div className="flex flex-col items-center space-y-16 py-8 text-center">
            <div>
              <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-accent mb-4">
                Digital Correspondence
              </h3>
              <a 
                href="mailto:izhaaq@unbothered.agency"
                className="text-2xl md:text-3xl font-serif font-bold tracking-tight hover:text-accent transition-colors block"
              >
                izhaaq@unbothered.agency
              </a>
            </div>

            <div>
              <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-accent mb-4">
                Direct Line
              </h3>
              <a 
                href="https://wa.me/919353114399"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl md:text-3xl font-serif font-bold tracking-tight hover:text-accent transition-colors block"
              >
                +91 9353 114 399
              </a>
            </div>

            <div className="pt-16 border-t border-foreground/10 w-full">
              <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-muted-foreground mb-4">
                Affiliation
              </h3>
              <a 
                href="https://www.unbothered.agency/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-serif italic hover:text-accent transition-colors"
              >
                Unbothered Company
              </a>
              <p className="text-sm text-muted-foreground mt-4 leading-relaxed max-w-md mx-auto">
                Exploring the intersections of intentionality, presence, and building with purpose.
              </p>
            </div>
          </div>
        </section>

        <footer className="mt-32 pt-12 border-t border-foreground/10 text-center space-y-6">
          <div className="text-[10px] uppercase tracking-[0.4em] font-bold text-muted-foreground">
            End of Correspondence
          </div>
          <div className="block pt-4">
            <Link href="/" className="text-[10px] uppercase tracking-[0.4em] font-bold text-muted-foreground hover:text-accent transition-colors">
              ← Return to Index
            </Link>
          </div>
        </footer>
      </main>
    </div>
  )
}
