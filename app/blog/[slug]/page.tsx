import Link from 'next/link'
import essays from '@/lib/essays.json'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Metadata } from 'next'

interface BlogPostProps {
  params: Promise<{
    slug: string
  }>
}

interface Essay {
  title: string
  date: string
  category: string
  slug: string
  content: string
  wiki?: string[]
  layout?: number
}

// Pre-calculate blog content mapping for efficiency
const blogContent = Object.fromEntries(
  essays.map(essay => [essay.slug, essay as Essay])
)

export async function generateStaticParams() {
  return essays.map((essay) => ({
    slug: essay.slug,
  }))
}

export async function generateMetadata(props: BlogPostProps): Promise<Metadata> {
  const params = await props.params
  const post = blogContent[params.slug]

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'This blog post could not be found'
    }
  }

  return {
    title: `${post.title} - Izhaaq`,
    description: post.content.substring(0, 160)
  }
}

/**
 * Converts specific keywords into Wikipedia links in one pass.
 */
function linkifyContent(content: string, dict: string[]) {
  if (!dict || dict.length === 0) return content;

  const escapedWords = dict
    .map(word => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|')

  const regex = new RegExp(`\\b(${escapedWords})\\b(?![^\\[]*\\])`, 'gi')
  return content.replace(regex, '[$1](https://en.wikipedia.org/wiki/$1)')
}

export default async function BlogPost(props: BlogPostProps) {
  const params = await props.params
  const post = blogContent[params.slug]

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <main className="max-w-3xl mx-auto px-6 md:px-8 py-20 pt-32 text-center">
          <h1 className="text-4xl font-serif font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-6">
            Sorry, we couldn&apos;t find the blog post you&apos;re looking for.
          </p>
          <Link href="/" className="text-accent hover:underline">
            Back to Index →
          </Link>
        </main>
      </div>
    )
  }

  const processedContent = linkifyContent(post.content, post.wiki || [])

  const postIndex = essays.findIndex(e => e.slug === params.slug)
  const layoutNumber = post.layout || ((postIndex % 6) + 1)
  const layoutClass = `layout-${layoutNumber}`

  return (
    <div className={`min-h-screen bg-background selection:bg-accent/30 overflow-x-hidden ${layoutClass}`}>
      {/* Sticky Reader Header */}
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-background/95 backdrop-blur-sm border-b border-foreground/10 h-14 px-6 md:px-12 flex items-center justify-between">
        <div className="flex items-baseline gap-3 text-xs">
          <Link href="/" className="hover:text-accent transition-all text-lg uppercase tracking-widest font-bold" style={{ fontFamily: 'Butterbrotpapier' }}>
            Izhaaq
          </Link>
          <span className="text-foreground/30 font-light translate-y-[1px]">»</span>
          <span className="text-muted-foreground font-normal truncate max-w-[150px] md:max-w-none" style={{ fontFamily: 'var(--font-imfell)', fontSize: '1rem' }}>
            {post.title}
          </span>
        </div>
        <div className="flex gap-4 md:gap-8 text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground/60">
          <Link href="/" className="hover:text-accent transition-colors">All Articles</Link>
          <Link href="/" className="hover:text-accent transition-colors">Author</Link>
        </div>
      </nav>

      <main className="book-container pt-32">
        <article id="blog-post-content" className="relative w-full">
          <header className="mb-24 md:mb-32">
            <h1 className="book-title">
              {post.title}
            </h1>
          </header>

          <div className="prose-izhaaq max-w-none mb-12 book-drop-cap">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                a: ({ ...props }) => (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline decoration-accent/50 underline-offset-4"
                    {...props}
                  />
                )
              }}
            >
              {processedContent}
            </ReactMarkdown>
          </div>

          <footer className="mt-48 text-center relative z-10 w-full clear-both">
            <Link href="/" className="text-[10px] tracking-[0.4em] font-bold text-muted-foreground hover:text-accent transition-colors">
              ← Return to Index
            </Link>
          </footer>
        </article>
      </main>
    </div>
  )
}
