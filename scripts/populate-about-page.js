/**
 * Script to populate Sanity About page with initial data
 * Run with: node scripts/populate-about-page.js
 */

import fs from 'fs'
import path from 'path'
import { createClient } from 'next-sanity'

// Load environment variables from .env.local
const envPath = path.resolve(process.cwd(), '.env.local')
const envContent = fs.readFileSync(envPath, 'utf-8')

envContent.split('\n').forEach((line) => {
  if (line && !line.startsWith('#')) {
    const [key, value] = line.split('=')
    if (key && value) {
      process.env[key.trim()] = value.trim()
    }
  }
})

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN,
})

const aboutPageData = {
  _type: 'page',
  title: 'About',
  slug: {
    _type: 'slug',
    current: 'about',
  },
  seoDescription: 'Learn about Niche Design Studios — our story, philosophy, and team.',
  introParagraphs: [
    'Niche Design Studios is an interior architecture practice based in Washington, DC. We work with residential and commercial clients to create spaces that are deeply considered, beautifully resolved, and built to last.',
    'Our approach begins with listening — to clients, to the existing architecture, and to the neighborhood itself. Washington carries a distinct character, and we believe great interiors should honor that context while serving the people who live and work within them.',
    'From gut renovations to curated room transformations, we bring the same rigor and care to every project regardless of scale.',
  ],
  philosophyTitle: 'Our Philosophy',
  philosophyParagraphs: [
    'We believe that interior architecture is fundamentally about relationships — between spaces and people, between old and new, between the practical and the beautiful.',
    'Every decision we make — from structural choices down to hardware and finishes — is guided by asking: does this serve the people who will live here? Does it belong in this place?',
  ],
  services: [
    {
      _key: 'residential',
      title: 'Residential Design',
      description: 'Full-service interior architecture for single-family homes, rowhouses, and condominiums.',
    },
    {
      _key: 'commercial',
      title: 'Commercial Interiors',
      description: 'Offices, retail, and hospitality spaces designed with intention and functionality.',
    },
    {
      _key: 'renovation',
      title: 'Renovation Consulting',
      description: 'Guidance on scope, materials, and sequencing for clients navigating a renovation.',
    },
    {
      _key: 'planning',
      title: 'Space Planning',
      description: 'Thoughtful layout analysis to maximize flow, light, and livability.',
    },
    {
      _key: 'finish',
      title: 'Finish Selection',
      description: 'Curated material and finish palettes that create cohesive, lasting interiors.',
    },
    {
      _key: 'management',
      title: 'Project Management',
      description: 'Coordinating contractors and vendors to deliver on time and on budget.',
    },
  ],
}

async function populateAbout() {
  try {
    console.log('🚀 Starting About page population...')
    console.log(`📝 Project ID: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`)
    console.log(`📝 Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET}`)

    // Check if document exists
    const existing = await client.fetch('*[_type == "page" && slug.current == "about"][0]')

    if (existing) {
      console.log('📄 About page already exists. Updating...')
      // Update existing document
      await client
        .patch(existing._id)
        .set(aboutPageData)
        .commit()

      console.log('✅ Successfully updated About page!')
    } else {
      console.log('📄 About page does not exist. Creating...')
      // Create new document
      await client.create(aboutPageData)

      console.log('✅ Successfully created About page!')
    }

    console.log('\n📋 Data populated:')
    console.log('  - Title: About')
    console.log('  - Slug: about')
    console.log('  - 3 intro paragraphs')
    console.log('  - Philosophy section with 2 paragraphs')
    console.log('  - 6 services')

    console.log('\n🌐 Next steps:')
    console.log('  1. Wait 30-60 seconds for Vercel to rebuild')
    console.log('  2. Visit /about page')
    console.log('  3. Verify all content appears correctly')
    console.log('  4. Go to /studio to edit content anytime')
  } catch (error) {
    console.error('❌ Error populating About page:', error.message)
    process.exit(1)
  }
}

populateAbout()
