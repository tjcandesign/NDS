import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { PortableText } from 'next-sanity'

async function getProject(slug: string) {
  return client.fetch(`
    *[_type == "project" && slug.current == $slug][0] {
      _id, title, slug, category, location, completionYear,
      shortDescription, coverImage, images, body, featured
    }
  `, { slug })
}

export async function generateStaticParams() {
  try {
    const projects = await client.fetch(`*[_type == "project"]{ "slug": slug.current }`)
    return projects.map((p: any) => ({ slug: p.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = await getProject(slug)
  if (!project) return {}
  return {
    title: project.title,
    description: project.shortDescription,
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await getProject(slug)
  if (!project) notFound()

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-12 px-6 max-w-6xl mx-auto">
        <Link
          href="/portfolio"
          className="text-xs tracking-widest uppercase text-stone-400 hover:text-stone-700 transition-colors mb-8 inline-block"
        >
          ← Portfolio
        </Link>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-xs tracking-widest uppercase text-stone-400 mb-2">
              {project.category}
              {project.location && ` · ${project.location}`}
              {project.completionYear && ` · ${project.completionYear}`}
            </p>
            <h1 className="font-serif text-4xl md:text-5xl leading-tight">{project.title}</h1>
          </div>
        </div>
      </section>

      {/* Cover image */}
      {project.coverImage && (
        <section className="max-w-6xl mx-auto px-6 mb-12">
          <div className="aspect-[16/9] bg-stone-200 overflow-hidden">
            <Image
              src={urlFor(project.coverImage).width(1200).height(675).url()}
              alt={project.coverImage.alt || project.title}
              width={1200}
              height={675}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </section>
      )}

      {/* Body */}
      <section className="max-w-3xl mx-auto px-6 pb-16">
        {project.shortDescription && (
          <p className="text-xl text-stone-600 leading-relaxed mb-10 font-serif">
            {project.shortDescription}
          </p>
        )}
        {project.body && (
          <div className="prose prose-stone prose-lg max-w-none">
            <PortableText value={project.body} />
          </div>
        )}
      </section>

      {/* Image gallery */}
      {project.images && project.images.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.images.map((img: any, i: number) => (
              <div key={i} className="aspect-[4/3] bg-stone-200 overflow-hidden">
                <Image
                  src={urlFor(img).width(800).height(600).url()}
                  alt={img.alt || `${project.title} image ${i + 1}`}
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                />
                {img.caption && (
                  <p className="text-xs text-stone-400 mt-2">{img.caption}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  )
}
