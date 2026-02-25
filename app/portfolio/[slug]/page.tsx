import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { PortableText } from 'next-sanity'
import GalleryLightbox from '@/components/GalleryLightbox'

async function getProject(slug: string) {
  return client.fetch(`
    *[_type == "project" && slug.current == $slug][0] {
      _id, title, slug, category, location, completionYear,
      projectSize, scope, shortDescription, coverImage, images, body, featured
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

  const images: any[] = project.images ?? []

  return (
    <>
      {/* ── Full-bleed hero ───────────────────────────────────────── */}
      {project.coverImage && (
        <div className="relative w-full h-[88vh] min-h-[560px] bg-stone-200 overflow-hidden">
          <Image
            src={urlFor(project.coverImage).width(2400).height(1600).url()}
            alt={project.coverImage.alt || project.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/75 via-stone-900/10 to-transparent" />

          <Link
            href="/portfolio"
            className="absolute top-24 left-6 md:left-10 text-xs tracking-widest uppercase text-white/60 hover:text-white transition-colors"
          >
            ← Portfolio
          </Link>

          <div className="absolute bottom-10 left-6 md:left-10 right-6 md:right-10">
            <p className="text-xs tracking-[0.3em] uppercase text-white/50 mb-4">
              {project.category}
              {project.location && ` · ${project.location}`}
            </p>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white leading-tight max-w-3xl">
              {project.title}
            </h1>
          </div>
        </div>
      )}

      {/* ── Project info strip ────────────────────────────────────── */}
      <section className="border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {project.completionYear && (
            <div>
              <p className="text-xs tracking-widest uppercase text-stone-400 mb-2">Year</p>
              <p className="text-stone-800 font-light text-lg">{project.completionYear}</p>
            </div>
          )}
          {project.location && (
            <div>
              <p className="text-xs tracking-widest uppercase text-stone-400 mb-2">Location</p>
              <p className="text-stone-800 font-light text-lg">{project.location}</p>
            </div>
          )}
          {project.projectSize && (
            <div>
              <p className="text-xs tracking-widest uppercase text-stone-400 mb-2">Size</p>
              <p className="text-stone-800 font-light text-lg">{project.projectSize}</p>
            </div>
          )}
          {project.scope && project.scope.length > 0 && (
            <div className="col-span-2 md:col-span-1">
              <p className="text-xs tracking-widest uppercase text-stone-400 mb-2">Scope</p>
              <p className="text-stone-800 font-light leading-relaxed">
                {project.scope.join(' · ')}
              </p>
            </div>
          )}
        </div>

        {/* Description below the stats */}
        {(project.shortDescription || project.body) && (
          <div className="max-w-6xl mx-auto px-6 pb-12">
            <div className="max-w-2xl">
              {project.shortDescription && (
                <p className="font-serif text-xl md:text-2xl text-stone-600 leading-relaxed">
                  {project.shortDescription}
                </p>
              )}
              {project.body && (
                <div className="prose prose-stone prose-lg max-w-none mt-6">
                  <PortableText value={project.body} />
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      {/* ── Gallery with lightbox ─────────────────────────────────── */}
      {images.length > 0 && (
        <div className="mt-2 md:mt-3">
          <GalleryLightbox images={images} title={project.title} />
        </div>
      )}

      {/* ── Footer nav ───────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 pb-20 flex justify-between items-center border-t border-stone-200 pt-10">
        <Link
          href="/portfolio"
          className="text-xs tracking-widest uppercase text-stone-400 hover:text-stone-900 transition-colors"
        >
          ← All Projects
        </Link>
        <Link
          href="/contact"
          className="text-xs tracking-widest uppercase text-stone-400 hover:text-stone-900 transition-colors"
        >
          Start a Project →
        </Link>
      </div>
    </>
  )
}
