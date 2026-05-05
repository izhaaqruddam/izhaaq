import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About - Izhaaq',
  description: 'Learn about Izhaaq and the philosophy of thoughtful living',
}

export default function About() {
  return (
    <div className="min-h-screen bg-background selection:bg-accent/30 text-foreground">
      <main className="book-container pt-32">
        <article className="relative">
          <div className="mb-20 flex flex-col items-center">
            <div className="w-48 h-48 md:w-56 md:h-56 relative rounded-sm overflow-hidden border border-foreground/10 grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl">
              <Image
                src="/izhaaq.png"
                alt="Izhaaq"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="mt-8 text-[10px] uppercase tracking-[0.4em] font-bold text-muted-foreground">
              Author Biography
            </div>
          </div>

          <h1 className="book-title text-center mb-16">
            Izhaaq
          </h1>

          <div className="prose-izhaaq max-w-none mb-20">
            <p className="book-drop-cap">
              I&apos;m Izhaaq, a writer exploring the architecture of a lived life. My work centers on the philosophy
              of being <em>unbothered</em>—the radical act of choosing peace and presence over the noise and expectations
              that constantly demand our attention.
            </p>

            <p>
              This digital anthology represents the ongoing practice of renewing our focus and creating a life that feels authentic,
              even when the world tries to pull us in a thousand other directions.
            </p>

            <p>
              Through these essays, I explore questions of presence, productivity, and success. This space is an invitation to
              think differently about what it means to live on your own terms.
            </p>
          </div>

          <footer className="mt-32 text-center space-y-8">
            <Link href="/contact" className="text-[10px] uppercase tracking-[0.4em] font-bold text-foreground hover:text-accent transition-colors border-b border-foreground/10 pb-1">
              Establish Contact
            </Link>
            <div className="block">
              <Link href="/" className="text-[10px] uppercase tracking-[0.4em] font-bold text-muted-foreground hover:text-accent transition-colors">
                ← Return to Index
              </Link>
            </div>
          </footer>
        </article>
      </main>
    </div>
  )
}
