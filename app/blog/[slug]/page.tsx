import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { PortableText } from 'next-sanity'

async function getPost(slug: string) {
  return client.fetch(`
    *[_type == "post" && slug.current == $slug][0] {
      _id, title, slug, publishedAt, excerpt, coverImage, body, tags
    }
  `, { slug })
}

export async function generateStaticParams() {
  try {
    const posts = await client.fetch(`*[_type == "post"]{ "slug": slug.current }`)
    return posts.map((p: any) => ({ slug: p.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  return (
    <>
      <section className="pt-32 pb-12 px-6 max-w-3xl mx-auto">
        <Link
          href="/blog"
          className="text-xs tracking-widest uppercase text-stone-400 hover:text-stone-700 transition-colors mb-8 inline-block"
        >
          ← Journal
        </Link>
        <p className="text-xs tracking-widest uppercase text-stone-400 mb-4">
          {new Date(post.publishedAt).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </p>
        <h1 className="font-serif text-4xl md:text-5xl leading-tight mb-6">{post.title}</h1>
        {post.excerpt && (
          <p className="text-xl text-stone-500 leading-relaxed font-serif">{post.excerpt}</p>
        )}
      </section>

      {post.coverImage && (
        <section className="max-w-4xl mx-auto px-6 mb-12">
          <div className="aspect-[16/9] bg-stone-200 overflow-hidden">
            <Image
              src={urlFor(post.coverImage).width(1200).height(675).url()}
              alt={post.coverImage.alt || post.title}
              width={1200}
              height={675}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </section>
      )}

      <section className="max-w-3xl mx-auto px-6 pb-24">
        {post.body && (
          <div className="prose prose-stone prose-lg max-w-none">
            <PortableText value={post.body} />
          </div>
        )}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-stone-200 flex flex-wrap gap-2">
            {post.tags.map((tag: string) => (
              <span
                key={tag}
                className="px-3 py-1 bg-stone-100 text-stone-500 text-xs tracking-widest uppercase"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </section>
    </>
  )
}
