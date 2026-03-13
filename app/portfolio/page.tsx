import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Selected interior architecture and design projects by Niche Design Studios.',
}

async function getProjects() {
  try {
    return await client.fetch(`
      *[_type == "project"] | order(order asc, completionYear desc) {
        _id, title, slug, category, location, completionYear, shortDescription, coverImage
      }
    `)
  } catch {
    return []
  }
}

export default async function Portfolio() {
  const projects = await getProjects()

  return (
    <>
      <section className="pt-32 pb-16 px-6 max-w-6xl mx-auto">
        <p className="text-xs tracking-widest uppercase text-stone-400 mb-4">Our Work</p>
        <h1 className="font-serif text-4xl md:text-6xl max-w-2xl leading-tight">Portfolio</h1>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-24">
        {projects.length === 0 ? (
          <p className="text-stone-400 text-sm">Projects coming soon.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project: any) => (
              <Link
                key={project._id}
                href={`/portfolio/${project.slug.current}`}
                className="group block"
              >
                <div className="aspect-[4/3] bg-stone-200 overflow-hidden mb-4">
                  {project.coverImage && (
                    <Image
                      src={urlFor(project.coverImage).width(600).height(450).url()}
                      alt={project.coverImage.alt || project.title}
                      width={600}
                      height={450}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <p className="text-xs tracking-widest uppercase text-stone-400 mb-1">
                  {project.category}
                  {project.location && ` · ${project.location}`}
                </p>
                <h2 className="font-serif text-xl text-stone-900 group-hover:text-stone-600 transition-colors mb-1">
                  {project.title}
                </h2>
                {project.shortDescription && (
                  <p className="text-sm text-stone-500 line-clamp-2">{project.shortDescription}</p>
                )}
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  )
}
