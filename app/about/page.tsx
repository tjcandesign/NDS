import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getPage } from '@/lib/sanity'
import { urlFor } from '@/sanity/lib/image'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage('about')
  return {
    title: 'About',
    description: page?.seoDescription || 'Learn about Niche Design Studios — our story, philosophy, and team.',
  }
}

export default async function About() {
  const page = await getPage('about')

  // Fallback content if not found in Sanity
  const title = page?.title || 'Design Rooted in Place and Purpose'
  const introParagraphs = page?.introParagraphs || [
    'Niche Design Studios is an interior design practice based in Washington, DC. We work with residential and commercial clients to create spaces that are deeply considered, beautifully resolved, and built to last.',
    'Our approach begins with listening — to clients, to the existing architecture, and to the neighborhood itself. Washington carries a distinct character, and we believe great interiors should honor that context while serving the people who live and work within them.',
    'From gut renovations to curated room transformations, we bring the same rigor and care to every project regardless of scale.',
  ]
  const philosophyParagraphs = page?.philosophyParagraphs || [
    'We believe that interior architecture is fundamentally about relationships — between spaces and people, between old and new, between the practical and the beautiful.',
    'Every decision we make — from structural choices down to hardware and finishes — is guided by asking: does this serve the people who will live here? Does it belong in this place?',
  ]
  const aboutImage = (page as any)?.aboutImage
  const showAboutImagePlaceholder = (page as any)?.showAboutImagePlaceholder ?? true
  const allServices = page?.services || [
    {
      title: 'Residential Architecture',
      description: 'Full-service architecture for single-family homes, rowhouses, and condominiums.',
    },
    {
      title: 'Curated Interiors',
      description: 'Offices, retail, and hospitality spaces designed with intention and functionality.',
    },
    {
      title: 'Renovation Consulting',
      description: 'Guidance on scope, materials, and sequencing for clients navigating a renovation.',
    },
    {
      title: 'Space Planning',
      description: 'Thoughtful layout analysis to maximize flow, light, and livability.',
    },
  ]
  const services = allServices.slice(0, 4)

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 px-6 max-w-6xl mx-auto">
        <p className="text-xs tracking-widest uppercase text-stone-400 mb-4">About the Studio</p>
        <h1 className="font-serif text-4xl md:text-6xl max-w-2xl leading-tight">{title}</h1>
      </section>

      {/* Main content */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-16 items-start">
          <div className="space-y-6 text-stone-600 leading-relaxed">
            {introParagraphs.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
            {philosophyParagraphs.map((para, idx) => (
              <p key={`phil-${idx}`}>{para}</p>
            ))}
            <Link
              href="/contact"
              className="inline-block mt-4 text-sm tracking-widest uppercase border-b border-stone-900 pb-px hover:text-stone-500 hover:border-stone-500 transition-colors"
            >
              Start a Conversation →
            </Link>
          </div>

          {/* About image / placeholder */}
          <div className="hidden md:block w-72 lg:w-80 flex-shrink-0">
            {aboutImage ? (
              <Image
                src={urlFor(aboutImage).width(640).height(800).url()}
                alt={aboutImage.alt || 'About Niche Design Studio'}
                width={640}
                height={800}
                className="w-full h-auto object-cover"
              />
            ) : showAboutImagePlaceholder ? (
              <div className="w-full aspect-[3/4] bg-stone-200" />
            ) : null}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-stone-100 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs tracking-widest uppercase text-stone-400 mb-10">What We Do</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl">
            {services.map(({ title: serviceTitle, description }) => (
              <div key={serviceTitle} className="border-t border-stone-300 pt-6">
                <h3 className="font-serif text-lg text-stone-900 mb-2">{serviceTitle}</h3>
                <p className="text-base text-stone-500 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
