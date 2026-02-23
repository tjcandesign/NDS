import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'

export const metadata: Metadata = {
  title: 'Journal',
  description: 'Thoughts on interior architecture, design, and life in Washington DC from Niche Design Studios.',
}

async function getPosts() {
  try {
    return await client.fetch(`
      *[_type == "post"] | order(publishedAt desc) {
        _id, title, slug, publishedAt, excerpt, coverImage, tags
      }
    `)
  } catch {
    return []
  }
}

export default async function Blog() {
  const posts = await getPosts()

  return (
    <>
      <section className="pt-32 pb-16 px-6 max-w-6xl mx-auto">
        <p className="text-xs tracking-widest uppercase text-stone-400 mb-4">Writing</p>
        <h1 className="font-serif text-4xl md:text-6xl max-w-2xl leading-tight">Journal</h1>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-24">
        {posts.length === 0 ? (
          <p className="text-stone-400 text-sm">Posts coming soon.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {posts.map((post: any) => (
              <Link
                key={post._id}
                href={`/blog/${post.slug.current}`}
                className="group block"
              >
                {post.coverImage && (
                  <div className="aspect-[16/9] bg-stone-200 overflow-hidden mb-5">
                    <Image
                      src={urlFor(post.coverImage).width(800).height(450).url()}
                      alt={post.coverImage.alt || post.title}
                      width={800}
                      height={450}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <p className="text-xs tracking-widest uppercase text-stone-400 mb-2">
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
                <h2 className="font-serif text-2xl text-stone-900 group-hover:text-stone-600 transition-colors mb-2">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="text-sm text-stone-500 leading-relaxed line-clamp-3">{post.excerpt}</p>
                )}
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  )
}
