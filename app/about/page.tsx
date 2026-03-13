import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about Niche Design Studios — our story, philosophy, and team.',
}

export default function About() {
  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 px-6 max-w-6xl mx-auto">
        <p className="text-xs tracking-widest uppercase text-stone-400 mb-4">About the Studio</p>
        <h1 className="font-serif text-4xl md:text-6xl max-w-2xl leading-tight">
          Design Rooted in Place and Purpose
        </h1>
      </section>

      {/* Main content */}
      <section className="max-w-6xl mx-auto px-6 pb-24 grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        <div className="space-y-6 text-stone-600 leading-relaxed">
          <p>
            Niche Design Studios is an interior architecture practice based in Washington, DC.
            We work with residential and commercial clients to create spaces that are deeply considered,
            beautifully resolved, and built to last.
          </p>
          <p>
            Our approach begins with listening — to clients, to the existing architecture, and to the
            neighborhood itself. Washington carries a distinct character, and we believe great interiors
            should honor that context while serving the people who live and work within them.
          </p>
          <p>
            From gut renovations to curated room transformations, we bring the same rigor and care
            to every project regardless of scale.
          </p>
        </div>

        <div className="space-y-6 text-stone-600 leading-relaxed">
          <h2 className="font-serif text-2xl text-stone-900">Our Philosophy</h2>
          <p>
            We believe that interior architecture is fundamentally about relationships — between
            spaces and people, between old and new, between the practical and the beautiful.
          </p>
          <p>
            Every decision we make — from structural choices down to hardware and finishes —
            is guided by asking: does this serve the people who will live here? Does it
            belong in this place?
          </p>
          <Link
            href="/contact"
            className="inline-block mt-4 text-sm tracking-widest uppercase border-b border-stone-900 pb-px hover:text-stone-500 hover:border-stone-500 transition-colors"
          >
            Start a Conversation →
          </Link>
        </div>
      </section>

      {/* Services */}
      <section className="bg-stone-100 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-widest uppercase text-stone-400 mb-10">What We Do</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Residential Design',
                desc: 'Full-service interior architecture for single-family homes, rowhouses, and condominiums.',
              },
              {
                title: 'Commercial Interiors',
                desc: 'Offices, retail, and hospitality spaces designed with intention and functionality.',
              },
              {
                title: 'Renovation Consulting',
                desc: 'Guidance on scope, materials, and sequencing for clients navigating a renovation.',
              },
              {
                title: 'Space Planning',
                desc: 'Thoughtful layout analysis to maximize flow, light, and livability.',
              },
              {
                title: 'Finish Selection',
                desc: 'Curated material and finish palettes that create cohesive, lasting interiors.',
              },
              {
                title: 'Project Management',
                desc: 'Coordinating contractors and vendors to deliver on time and on budget.',
              },
            ].map(({ title, desc }) => (
              <div key={title} className="border-t border-stone-300 pt-6">
                <h3 className="font-serif text-lg text-stone-900 mb-2">{title}</h3>
                <p className="text-sm text-stone-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
