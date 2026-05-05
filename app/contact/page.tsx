'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulated submission
    setSubmitted(true)
    setFormData({ name: '', email: '', message: '' })
    setTimeout(() => setSubmitted(false), 5000)
  }

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

        <section className="grid md:grid-cols-2 gap-20">
          {/* Contact Form */}
          <div className="glass-card p-8 border-foreground/5">
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center p-12"
              >
                <div className="w-12 h-12 rounded-full border-2 border-accent flex items-center justify-center mb-6 text-accent">
                  ✓
                </div>
                <h3 className="text-xl font-bold mb-2">Message Received</h3>
                <p className="text-sm text-muted-foreground">It has been safely delivered to my archive.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label htmlFor="name" className="block text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground mb-3">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b border-foreground/10 py-2 focus:border-accent focus:outline-none transition-colors font-serif italic text-lg"
                    placeholder="Identify yourself..."
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground mb-3">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b border-foreground/10 py-2 focus:border-accent focus:outline-none transition-colors font-serif italic text-lg"
                    placeholder="Where to reach you..."
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground mb-3">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full bg-transparent border border-foreground/10 p-4 focus:border-accent focus:outline-none transition-colors font-serif italic text-lg resize-none rounded-sm"
                    placeholder="Share your thoughts..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-foreground text-background text-[10px] uppercase tracking-[0.5em] font-bold hover:bg-accent hover:text-accent-foreground transition-all duration-500 rounded-sm"
                >
                  Dispatch Message
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="flex flex-col justify-center space-y-12 py-8">
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
                href="tel:+919353114399"
                className="text-2xl md:text-3xl font-serif font-bold tracking-tight hover:text-accent transition-colors block"
              >
                +91 9353 114 399
              </a>
            </div>

            <div className="pt-8 border-t border-foreground/10">
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
              <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
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
