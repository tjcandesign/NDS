import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'

async function getFeaturedProjects() {
  try {
    return await client.fetch(`
      *[_type == "project" && featured == true] | order(order asc) [0...6] {
        _id, title, slug, category, shortDescription, coverImage
      }
    `)
  } catch {
    return []
  }
}

export default async function Home() {
  const projects = await getFeaturedProjects()

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center bg-stone-900 text-stone-50 pt-16">
        <div className="absolute inset-0 bg-stone-900/60" />
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-stone-400 mb-6">
            Interior Architecture · Capitol Hill, DC
          </p>
          <h1 className="font-serif text-5xl md:text-7xl leading-tight mb-6">
            Spaces That Tell Your Story
          </h1>
          <p className="text-stone-300 text-lg md:text-xl leading-relaxed mb-10 max-w-xl mx-auto">
            We craft interiors that balance beauty, function, and the spirit of the people who inhabit them.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/portfolio"
              className="px-8 py-3 bg-stone-50 text-stone-900 text-sm tracking-widest uppercase hover:bg-white transition-colors"
            >
              View Portfolio
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 border border-stone-400 text-stone-200 text-sm tracking-widest uppercase hover:border-stone-200 hover:text-stone-50 transition-colors"
            >
              Start a Project
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Work */}
      {projects.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-24">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs tracking-widest uppercase text-stone-400 mb-2">Selected Work</p>
              <h2 className="font-serif text-3xl md:text-4xl">Featured Projects</h2>
            </div>
            <Link
              href="/portfolio"
              className="hidden sm:block text-sm tracking-widest uppercase text-stone-500 hover:text-stone-900 transition-colors"
            >
              All Projects →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project: any) => (
              <Link
                key={project._id}
                href={`/portfolio/${project.slug.current}`}
                className="group block overflow-hidden"
              >
                <div className="aspect-[4/3] bg-stone-200 overflow-hidden mb-4">
                  {project.coverImage && (
                    <Image
                      src={urlFor(project.coverImage).width(600).height(450).url()}
                      alt={project.coverImage.alt || project.title}
                      width={600}
                      height={450}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                </div>
                <p className="text-xs tracking-widest uppercase text-stone-400 mb-1">
                  {project.category}
                </p>
                <h3 className="font-serif text-xl text-stone-900 group-hover:text-stone-600 transition-colors">
                  {project.title}
                </h3>
                {project.shortDescription && (
                  <p className="text-sm text-stone-500 mt-1 line-clamp-2">
                    {project.shortDescription}
                  </p>
                )}
              </Link>
            ))}
          </div>

          <div className="sm:hidden mt-8 text-center">
            <Link
              href="/portfolio"
              className="text-sm tracking-widest uppercase text-stone-500 hover:text-stone-900 transition-colors"
            >
              View All Projects →
            </Link>
          </div>
        </section>
      )}

      {/* Philosophy / intro strip */}
      <section className="bg-stone-900 text-stone-50 py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-serif text-2xl md:text-3xl leading-relaxed text-stone-200 mb-8">
            "Good design isn't decorating space — it's revealing it."
          </p>
          <Link
            href="/about"
            className="text-xs tracking-[0.3em] uppercase text-stone-400 hover:text-stone-100 transition-colors"
          >
            About the Studio →
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <p className="text-xs tracking-widest uppercase text-stone-400 mb-4">Ready to Begin?</p>
        <h2 className="font-serif text-3xl md:text-4xl mb-6">Let's Design Something Together</h2>
        <p className="text-stone-500 max-w-md mx-auto mb-8">
          Whether it's a full renovation or a single room, we'd love to hear about your project.
        </p>
        <Link
          href="/contact"
          className="inline-block px-10 py-3 bg-stone-900 text-stone-50 text-sm tracking-widest uppercase hover:bg-stone-700 transition-colors"
        >
          Get In Touch
        </Link>
      </section>
    </>
  )
}
