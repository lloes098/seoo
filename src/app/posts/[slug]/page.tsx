import { Metadata } from 'next'
import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'

interface Props {
  params: {
    slug: string
  }
}

async function getPost(slug: string) {
  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single()
  
  if (error || !post) {
    return null
  }
  
  return post
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The post you are looking for does not exist.'
    }
  }
  
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.created_at,
      authors: [post.author],
      images: [
        {
          url: `https://your-domain.com/api/og?title=${encodeURIComponent(post.title)}`,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [`https://your-domain.com/api/og?title=${encodeURIComponent(post.title)}`],
    }
  }
}

export default async function PostPage({ params }: Props) {
  const post = await getPost(params.slug)
  
  if (!post) {
    notFound()
  }
  
  return (
    <article className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <div className="flex items-center text-sm text-gray-500 mb-8">
        <time dateTime={post.created_at}>
          {new Date(post.created_at).toLocaleDateString()}
        </time>
        <span className="mx-2">•</span>
        <span>{post.author}</span>
      </div>
      <div className="prose prose-lg max-w-none">
        {post.content}
      </div>
    </article>
  )
} 