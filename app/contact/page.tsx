'use client'

import Navigation from '@/components/navigation'
import { useState } from 'react'

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
    // In a real application, you would send this data to a server
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setFormData({ name: '', email: '', message: '' })
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="max-w-3xl mx-auto px-6 md:px-8 py-20 pt-32">
        <section className="mb-16">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 text-balance">
            Get in Touch
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-12">
            I&apos;d love to hear your thoughts, questions, or ideas. Whether you want to discuss the essays, 
            collaborate, or just connect, feel free to reach out. I read every message.
          </p>
        </section>

        <section className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-serif font-bold mb-6">Send a Message</h2>
            
            {submitted && (
              <div className="mb-6 p-4 border border-accent bg-accent/5 rounded-sm">
                <p className="text-sm text-accent">
                  Thank you for reaching out. I&apos;ll get back to you soon.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-secondary text-foreground placeholder-muted-foreground border border-border rounded-sm focus:outline-none focus:border-accent transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-secondary text-foreground placeholder-muted-foreground border border-border rounded-sm focus:outline-none focus:border-accent transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-secondary text-foreground placeholder-muted-foreground border border-border rounded-sm focus:outline-none focus:border-accent transition-colors resize-none"
                  placeholder="Your message..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-accent text-accent-foreground font-medium rounded-sm hover:opacity-90 transition-opacity duration-200"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-serif font-bold mb-6">Other Ways to Connect</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                  Email
                </h3>
                <a 
                  href="mailto:sosei@unbothered.agency"
                  className="text-accent hover:underline text-lg"
                >
                  sosei@unbothered.agency
                </a>
              </div>

              <div>
                <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                  Phone
                </h3>
                <a 
                  href="tel:+919353114399"
                  className="text-accent hover:underline text-lg"
                >
                  +91 9353 114 399
                </a>
              </div>

              <div>
                <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                  Unbothered Company
                </h3>
                <a 
                  href="https://www.unbothered.agency/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  www.unbothered.agency
                </a>
                <p className="text-foreground/80 leading-relaxed mt-3">
                  Learn more about the philosophy and work behind Unbothered Company.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
