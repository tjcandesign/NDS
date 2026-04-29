import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import { PortableText } from 'next-sanity'
import { getSettings, getHomePageText } from '@/lib/sanity'
import HeroParallaxImage from '@/components/HeroParallaxImage'

// Featured projects shown in the homepage "Featured Projects" section.
// Driven solely by the `featured` boolean toggle on each project; ordered via
// the drag-and-drop orderable-document-list. We do NOT filter by `published`
// so the home page matches /portfolio's behavior (which also doesn't gate on
// the legacy `published` field). Drafts are isolated via Sanity's native
// preview/published perspectives, not the schema-level boolean.
async function getFeaturedProjects() {
  try {
    return await client.fetch(`
      *[_type == "project" && featured == true]
        | order(coalesce(orderRank, "zzz") asc) {
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
        title, heroSubtitle, heroDescription, body
      }
    `)
  } catch {
    return {
      title: 'Spaces That Tell Your Story',
      heroSubtitle: 'Interiors · Washington, DC',
      heroDescription: 'We create homes that balance beauty, function, and the spirit of the people who inhabit them.',
    }
  }
}

export default async function Home() {
  const featuredProjects = await getFeaturedProjects()
  const homePage = await getHomePage()
  const settings = await getSettings()
  const homePageText = await getHomePageText()
  // Hero source order:
  //   1. Site Settings → "Home Page Hero Project" (Sanity reference, set by editor)
  //   2. Fallback to the first featured project so the hero never goes blank
  const heroProject = (settings as any).heroProject || featuredProjects[0]

  return (
    <>
      {/* ── Full-bleed hero with portfolio image ──────────────────── */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Hero background image with parallax */}
        {heroProject?.coverImage && (
          <HeroParallaxImage
            src={urlFor(heroProject.coverImage).width(2400).height(1600).url()}
            alt={heroProject.title}
          />
        )}

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900/85 via-stone-900/70 to-stone-900/60" />

        {/* Hero content */}
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <p className="text-sm md:text-base tracking-[0.3em] uppercase text-stone-300 mb-6">
            {homePage?.heroSubtitle || 'Interiors · Washington, DC'}
          </p>
          <h1
            className="font-serif text-5xl md:text-7xl lg:text-8xl leading-tight mb-6"
            style={{ color: '#ffffff', letterSpacing: '-0.02em' }}
          >
            {homePage?.title || 'Spaces That Tell Your Story'}
          </h1>
          <p className="text-stone-200 text-lg md:text-xl leading-relaxed mb-10 max-w-xl mx-auto">
            {homePage?.heroDescription || 'We create homes that balance beauty, function, and the spirit of the people who inhabit them.'}
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
          <div className="max-w-6xl mx-auto px-6 mb-12">
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
          <div className="flex flex-col gap-6 px-6 max-w-6xl mx-auto">
            {featuredProjects.slice(0, 2).map((project: any) => (
              <Link
                key={project._id}
                href={`/portfolio/${project.slug.current}`}
                className="relative w-full aspect-video overflow-hidden bg-stone-200 rounded-sm"
              >
                  {/* Image */}
                  {project.coverImage && (
                    <Image
                      src={urlFor(project.coverImage).width(1400).height(800).url()}
                      alt={project.coverImage.alt || project.title}
                      fill
                      className="object-cover"
                    />
                  )}

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/20 to-transparent opacity-70" />

                  {/* Content overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6">
                    <div>
                      <h3 className="font-serif text-2xl sm:text-4xl text-white leading-tight line-clamp-2">
                        {project.title}
                      </h3>
                    </div>
                  </div>

                  {/* Indicator arrow */}
                  <div className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 border border-white/40 rounded-full flex items-center justify-center">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="text-white/60"
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </div>
              </Link>
            ))}
          </div>
        </section>
      )}



      {/* ── Our Process ──────────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mb-6">{homePageText.processSubheading}</h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              {homePageText.processDescription}
            </p>
          </div>

          {/* Process Steps from Sanity */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
            {settings.processSteps.map((step, index) => (
              <div key={step.id} className="text-center">
                <div className="w-16 h-16 rounded-full bg-navy-blue/10 flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-serif text-navy-blue" style={{ transform: 'translateY(-3px)' }}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="font-serif text-xl text-stone-900 mb-3">{step.title}</h3>
                <p className="text-sm text-stone-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: '#FFF9EE' }}>
        <div className="max-w-6xl mx-auto px-6 py-48 text-center">
          <h2 className="font-serif text-3xl md:text-4xl mb-6">{homePageText.ctaSubheading}</h2>
          <p className="text-stone-500 max-w-md mx-auto mb-8">
            {homePageText.ctaDescription}
          </p>
          <Link
            href="/contact"
            className="inline-block px-12 py-4 mt-20 border-2 border-navy-blue text-navy-blue text-sm tracking-widest uppercase rounded-[10px] transition-all duration-300 hover:bg-navy-blue hover:text-stone-50 hover:shadow-2xl"
          >
            Get In Touch
          </Link>
        </div>
      </section>
    </>
  )
}
