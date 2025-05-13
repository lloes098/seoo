import Link from 'next/link'
import { supabase } from '@/lib/supabase'

async function getBlogPosts() {
  try {
    const { data: posts, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Supabase error:', error.message)
      console.error('Error details:', error)
      return []
    }
    
    return posts || []
  } catch (e) {
    console.error('Unexpected error:', e)
    return []
  }
}

export default async function Home() {
  const posts = await getBlogPosts()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">My SEO Optimized Blog</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article key={post.id} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">
              <Link href={`/posts/${post.slug}`} className="hover:text-blue-600">
                {post.title}
              </Link>
            </h2>
            <p className="text-gray-600 mb-4">{post.excerpt}</p>
            <div className="flex items-center text-sm text-gray-500">
              <time dateTime={post.created_at}>
                {new Date(post.created_at).toLocaleDateString()}
              </time>
              <span className="mx-2">•</span>
              <span>{post.author}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
