import Link from 'next/link'
import PDFExportButton from '@/components/pdf-export-button'
import essays from '@/lib/essays.json'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

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

  return (
    <div className="min-h-screen bg-background selection:bg-accent/30">
      <main className="book-container pt-32">
        <article id="blog-post-content" className="relative">
          <header className="mb-24 text-center">
            <div className="book-chapter-num">
              {post.category}
            </div>
            <h1 className="book-title text-balance">
              {post.title}
            </h1>
          </header>

          <div className="prose-izhaaq max-w-none mb-12 book-drop-cap">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]} 
              rehypePlugins={[rehypeRaw]}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          <footer className="mt-24 text-center">
            <Link href="/" className="text-[10px] uppercase tracking-[0.4em] font-bold text-muted-foreground hover:text-accent transition-colors">
              ← Return to Index
            </Link>
          </footer>
        </article>
      </main>
    </div>
  )
}
