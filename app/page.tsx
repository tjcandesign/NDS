import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import { PortableText } from 'next-sanity'

async function getProjects() {
  try {
    return await client.fetch(`
      *[_type == "project"] | order(order asc) {
        _id, title, slug, category, shortDescription, coverImage, images[0...2]
      }
    `)
  } catch {
    return []
  }
}

async function getHomePage() {
  try {
    return await client.fetch(`
      *[_type == "page" && slug.current == "home"][0] {
        title, heroSubtitle, heroDescription, philosophyQuote, body
      }
    `)
  } catch {
    return {
      title: 'Spaces That Tell Your Story',
      heroSubtitle: 'Interior Architecture · Capitol Hill, DC',
      heroDescription: 'We craft interiors that balance beauty, function, and the spirit of the people who inhabit them.',
      philosophyQuote: '"Good design isn\'t decorating space — it\'s revealing it."'
    }
  }
}

export default async function Home() {
  const projects = await getProjects()
  const homePage = await getHomePage()
  const heroProject = projects[0] // Use first project's cover for hero
  const featuredProjects = projects.slice(0, 6) // First 6 for featured section

  return (
    <>
      {/* ── Full-bleed hero with portfolio image ──────────────────── */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Hero background image */}
        {heroProject?.coverImage && (
          <Image
            src={urlFor(heroProject.coverImage).width(2400).height(1600).url()}
            alt={heroProject.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        )}

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900/85 via-stone-900/70 to-stone-900/60" />

        {/* Hero content */}
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-stone-300 mb-6">
            {homePage?.heroSubtitle || 'Interior Architecture · Capitol Hill, DC'}
          </p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-tight mb-6 text-white">
            {homePage?.title || 'Spaces That Tell Your Story'}
          </h1>
          <p className="text-stone-200 text-lg md:text-xl leading-relaxed mb-10 max-w-xl mx-auto">
            {homePage?.heroDescription || 'We craft interiors that balance beauty, function, and the spirit of the people who inhabit them.'}
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
              className="px-8 py-3 border border-stone-300 text-stone-100 text-sm tracking-widest uppercase hover:bg-stone-900/40 hover:border-stone-200 transition-colors"
            >
              Start a Project
            </Link>
          </div>
        </div>
      </section>

      {/* ── Featured Work: Large Stacked Projects ────────────────────── */}
      {featuredProjects.slice(0, 2).length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 mb-12">
            <div className="flex items-end justify-between">
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
          </div>

          {/* Stacked projects container */}
          <div className="flex flex-col gap-6 px-6 max-w-7xl mx-auto">
            {featuredProjects.slice(0, 2).map((project: any) => (
              <Link
                key={project._id}
                href={`/portfolio/${project.slug.current}`}
                className="group relative w-full aspect-video overflow-hidden bg-stone-200 rounded-sm"
              >
                  {/* Image */}
                  {project.coverImage && (
                    <Image
                      src={urlFor(project.coverImage).width(1400).height(800).url()}
                      alt={project.coverImage.alt || project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  )}

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/20 to-transparent opacity-70 group-hover:opacity-80 transition-opacity" />

                  {/* Content overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6">
                    <div>
                      <p className="text-xs tracking-[0.2em] uppercase text-white/70 mb-2">
                        {project.category}
                      </p>
                      <h3 className="font-serif text-lg sm:text-2xl text-white leading-tight mb-1 group-hover:text-stone-100 transition-colors line-clamp-2">
                        {project.title}
                      </h3>
                      {project.shortDescription && (
                        <p className="text-xs sm:text-sm text-white/80 leading-relaxed line-clamp-1">
                          {project.shortDescription}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Hover indicator */}
                  <div className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 border border-white/40 rounded-full flex items-center justify-center group-hover:border-white group-hover:scale-110 transition-all duration-300">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="text-white/60 group-hover:text-white transition-colors"
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── Philosophy strip with side image ─────────────────────── */}
      {projects.length > 1 && projects[1]?.images?.[0] && (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch bg-stone-900">
          {/* Text side */}
          <div className="flex flex-col items-center justify-center py-20 md:py-32 px-6 md:px-10 text-stone-50 order-2 md:order-1">
            <div className="max-w-md">
              <p className="font-serif text-2xl md:text-3xl leading-relaxed text-stone-200 mb-8">
                {homePage?.philosophyQuote || '"Good design isn\'t decorating space — it\'s revealing it."'}
              </p>
              <Link
                href="/about"
                className="text-xs tracking-[0.3em] uppercase text-stone-400 hover:text-stone-100 transition-colors inline-block"
              >
                About the Studio →
              </Link>
            </div>
          </div>

          {/* Image side */}
          <div className="relative h-80 md:h-auto min-h-96 md:min-h-[500px] bg-stone-800 order-1 md:order-2">
            <Image
              src={urlFor(projects[1].images[0]).width(800).height(800).url()}
              alt="Interior design detail"
              fill
              className="object-cover"
              sizes="50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-stone-900/30" />
          </div>
        </section>
      )}

      {/* ── CTA ──────────────────────────────────────────────────── */}
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
