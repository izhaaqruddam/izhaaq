import Navigation from '@/components/navigation'
import Link from 'next/link'
import PDFExportButton from '@/components/pdf-export-button'
import essays from '@/lib/essays.json'

interface BlogPostProps {
  params: Promise<{
    slug: string
    title: string
  }>
}

interface Essay {
  id: string
  title: string
  excerpt: string
  date: string
  category: string
  slug: string
  wordCount: number
  isPopular: boolean
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
    title: `${post.title} - Sosei`,
    description: post.content.substring(0, 160)
  }
}

export default async function BlogPost(props: BlogPostProps) {
  const params = await props.params
  const post = blogContent[params.slug]

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="max-w-3xl mx-auto px-6 md:px-8 py-20 pt-32">
          <h1 className="text-4xl font-serif font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-6">
            Sorry, we couldn&apos;t find the blog post you&apos;re looking for.
          </p>
          <Link href="/essays" className="text-accent hover:underline">
            Back to Essays →
          </Link>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="max-w-3xl mx-auto px-6 md:px-8 py-20 pt-32">
        <article id="blog-post-content">
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-4 justify-between flex-wrap">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-xs uppercase tracking-widest text-accent font-semibold">
                  {post.category}
                </span>
                <span className="text-xs text-muted-foreground">
                  {post.date}
                </span>
                <span className="text-xs text-muted-foreground">
                  •
                </span>
                <span className="text-xs text-muted-foreground">
                  {post.wordCount} words
                </span>
                <span className="text-xs text-muted-foreground">
                  •
                </span>
                <span className="text-xs text-muted-foreground">
                  {calculateReadingTime(post.content)} min read
                </span>
              </div>
              <PDFExportButton
                elementId="blog-post-content"
                filename={params.slug}
                articleUrl={`sosei.com/blog/${params.slug}/${params.title}`}
                title={post.title}
              />
            </div>
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 text-balance leading-tight">
              {post.title}
            </h1>
          </header>

          <div className="prose prose-invert max-w-none mb-12 text-foreground/90">
            <div 
              dangerouslySetInnerHTML={{ __html: post.content }}
              className="space-y-6 leading-relaxed"
            />
          </div>

          <div className="border-t border-border pt-8 mt-16">
            <Link href="/essays" className="text-accent hover:underline text-sm font-medium">
              ← Back to Essays
            </Link>
          </div>
        </article>
      </main>
    </div>
  )
}
