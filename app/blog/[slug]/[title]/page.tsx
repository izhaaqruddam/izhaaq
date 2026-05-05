import Link from 'next/link'
import essays from '@/lib/essays.json'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { Metadata } from 'next'

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]/g, '')
}


interface BlogPostProps {
  params: Promise<{
    slug: string
    title: string
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

// Use essay data from JSON
const blogContent: Record<string, Essay> = {}
essays.forEach((essay) => {
  blogContent[essay.slug] = essay as Essay
})

function calculateReadingTime(htmlContent: string): number {
  // Remove HTML tags and count words
  const plainText = htmlContent.replace(/<[^>]*>/g, '')
  const wordCount = plainText.trim().split(/\s+/).length
  // Average reading speed is 200 words per minute
  return Math.ceil(wordCount / 200)
}

export async function generateStaticParams() {
  return essays.map((essay) => ({
    slug: essay.slug,
    title: slugify(essay.title),
  }))
}


export async function generateMetadata(props: BlogPostProps) {
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

function linkifyContent(content: string, dict: string[]) {
  if (!dict || dict.length === 0) return content;
  let linkedContent = content
  dict.forEach(word => {
    const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    // Match the word, ignoring case, as long as it isn't already inside a markdown link [...]
    const regex = new RegExp(`\\b(${escapedWord})\\b(?![^\\[]*\\])`, 'gi')
    linkedContent = linkedContent.replace(regex, '[$1](https://en.wikipedia.org/wiki/$1)')
  })
  return linkedContent
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
              rehypePlugins={[rehypeRaw]}
              components={{
                a: ({ node, ...props }) => (
                  <a target="_blank" rel="noopener noreferrer" className="text-accent hover:underline decoration-accent/50 underline-offset-4" {...props} />
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
