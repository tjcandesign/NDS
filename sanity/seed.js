import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'qb84mjun',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
})

const pages = [
  {
    _type: 'page',
    title: 'Spaces That Tell Your Story',
    slug: { current: 'home' },
    heroSubtitle: 'Interior Architecture · Capitol Hill, DC',
    heroDescription: 'We craft interiors that balance beauty, function, and the spirit of the people who inhabit them.',
    philosophyQuote: '"Good design isn\'t decorating space — it\'s revealing it."',
  },
  {
    _type: 'page',
    title: 'About',
    slug: { current: 'about' },
    heroSubtitle: 'About Niche Design Studios',
    heroDescription: 'We are a team of interior architects dedicated to creating spaces that inspire and reflect the personalities of those who inhabit them.',
  },
  {
    _type: 'page',
    title: 'Project Inquiry',
    slug: { current: 'contact' },
    heroSubtitle: 'Get in Touch',
    heroDescription: 'Let\'s discuss your project and create something beautiful together.',
  },
]

async function seedSanity() {
  try {
    console.log('Starting seed...\n')

    for (const page of pages) {
      try {
        const existing = await client.fetch(
          `*[_type == "page" && slug.current == $slug][0]._id`,
          { slug: page.slug.current }
        )

        if (existing) {
          console.log(`✓ Page "${page.title}" already exists`)
        } else {
          const created = await client.create(page)
          console.log(`✓ Created page: "${created.title}" (${created._id})`)
        }
      } catch (error) {
        console.error(`✗ Error with page "${page.title}":`, error.message)
      }
    }

    console.log('\n✨ Seed complete!')
  } catch (error) {
    console.error('Error seeding Sanity:', error.message)
    process.exit(1)
  }
}

seedSanity()
