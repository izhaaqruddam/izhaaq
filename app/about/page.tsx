import Navigation from '@/components/navigation'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Izhaaq - Sosei',
  description: 'Learn about Izhaaq and the philosophy behind Sosei',
}

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="max-w-3xl mx-auto px-6 md:px-8 py-20 pt-32">
        <article className="prose prose-invert max-w-none">
          <div className="mb-12 flex justify-center">
            <div className="w-48 h-48 md:w-56 md:h-56 relative rounded-sm overflow-hidden border border-border">
              <Image
                src="/izhaaq.jpg"
                alt="Izhaaq"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-8 text-balance text-center">
            Izhaaq
          </h1>

          <p className="text-lg text-foreground/90 leading-relaxed mb-8 text-center">
            I&apos;m Izhaaq, a writer and thinker exploring how intentional choices shape our lives. My work centers on the philosophy
            of being <em>unbothered</em>—not in dismissal, but in the radical act of choosing peace and presence over the noise and expectations
            that constantly demand our attention.
          </p>

          <div className="bg-secondary/30 border border-border p-8 rounded-sm mb-12">
            <h3 className="text-xl font-serif font-bold mb-3 text-accent">The Meaning of Sosei</h3>
            <p className="text-sm text-foreground/80 leading-relaxed italic">
              &quot;Sosei&quot; (再生) is a Japanese term meaning <strong>Creation</strong> or <strong>Revival</strong>. It represents the ongoing practice
              of renewing our focus, reviving our presence, and creating a life that feels authentic to who we are,
              even when the world tries to pull us in a thousand other directions.
            </p>
          </div>

          <p className="text-center text-muted-foreground italic text-sm mb-12">
            Knows a little about everything, but not enough about anything.
          </p>

          <h2 className="text-3xl font-serif font-bold mt-12 mb-6 text-foreground">
            Unbothered Company
          </h2>

          <p className="text-foreground/90 leading-relaxed mb-6">
            Unbothered Company is built on a simple idea: that we can create, build, and live in ways that honor both
            intentionality and authenticity. It&apos;s about stepping back from the constant grind and asking ourselves what
            truly matters. What are we building for? Who are we when we&apos;re not performing or hustling?
          </p>

          <p className="text-foreground/90 leading-relaxed mb-6">
            Through my essays and writing, I explore these questions—not as a preacher, but as someone actively grappling
            with them. This space is an invitation to think differently about presence, productivity, success, and what
            it means to live on your own terms.
          </p>

          <h2 className="text-3xl font-serif font-bold mt-12 mb-6 text-foreground">
            Why I Write
          </h2>

          <p className="text-foreground/90 leading-relaxed mb-6">
            Writing is how I process the world. It&apos;s how I work through contradictions, challenge my own assumptions,
            and hopefully offer something useful to others navigating similar questions. Each essay here is an attempt to
            articulate something I believe matters—whether it&apos;s about the value of solitude, the dangers of perpetual busyness,
            or the quiet power of choosing peace.
          </p>

          <p className="text-foreground/90 leading-relaxed mb-8">
            I hope you find something here that resonates, challenges, or simply gives you permission to think differently
            about your own life and choices.
          </p>

          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-muted-foreground">
              Want to continue the conversation? <Link href="/contact" className="text-accent hover:underline">Get in touch</Link>.
            </p>
          </div>
        </article>
      </main>
    </div>
  )
}
