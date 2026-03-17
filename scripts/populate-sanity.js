/**
 * Script to populate Sanity Site Settings with initial data
 * Run with: node scripts/populate-sanity.js
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

const siteSettingsData = {
  _type: 'siteSettings',
  _id: 'siteSettings',
  title: 'Niche Design Studio',
  tagline: 'Interior Architecture & Design',
  email: 'hello@nichedesignstudios.com',
  phone: '(202) 555-0100',
  address: 'Washington, DC',
  instagram: 'https://www.instagram.com/melkimball/',
  linkedin: '',
  seoDescription: 'Interior architecture and design based in Washington, DC.',
  navigationLinks: [
    {
      _key: 'about',
      label: 'About',
      href: '/about',
    },
    {
      _key: 'portfolio',
      label: 'Portfolio',
      href: '/portfolio',
    },
    {
      _key: 'journal',
      label: 'Journal',
      href: '/blog',
    },
    {
      _key: 'contact',
      label: 'Contact',
      href: '/contact',
    },
  ],
  processSteps: [
    {
      _key: 'discover',
      id: 'discover',
      title: 'Discover',
      description:
        'We listen deeply to understand your lifestyle, work patterns, and design preferences. Through in-depth conversations and space assessments, we uncover the stories your home or business should tell.',
    },
    {
      _key: 'design',
      id: 'design',
      title: 'Design',
      description:
        'We develop detailed concepts that balance aesthetics with functionality. Our designs reflect your unique vision while optimizing for how you actually live and work.',
    },
    {
      _key: 'refine',
      id: 'refine',
      title: 'Refine',
      description:
        'We iterate through feedback and options, fine-tuning every element. Your input shapes the final direction, ensuring the result feels authentically yours.',
    },
    {
      _key: 'deliver',
      id: 'deliver',
      title: 'Deliver',
      description:
        'We oversee implementation with meticulous attention to detail, coordinating contractors, materials, and timelines. The result is a thoughtfully realized space.',
    },
  ],
}

async function populateSanity() {
  try {
    console.log('🚀 Starting Sanity population...')
    console.log(`📝 Project ID: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`)
    console.log(`📝 Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET}`)

    // Check if document exists
    const existing = await client.fetch('*[_type == "siteSettings" && _id == "siteSettings"][0]')

    if (existing) {
      console.log('📄 Site Settings document already exists. Updating...')
      // Update existing document
      await client
        .patch('siteSettings')
        .set(siteSettingsData)
        .commit()

      console.log('✅ Successfully updated Site Settings!')
    } else {
      console.log('📄 Site Settings document does not exist. Creating...')
      // Create new document
      await client.create(siteSettingsData)

      console.log('✅ Successfully created Site Settings!')
    }

    console.log('\n📋 Data populated:')
    console.log('  - Site Title: Niche Design Studio')
    console.log('  - Email: hello@nichedesignstudios.com')
    console.log('  - Address: Washington, DC')
    console.log('  - Instagram: https://www.instagram.com/melkimball/')
    console.log('  - Navigation Links: 4 items (About, Portfolio, Journal, Contact)')
    console.log('  - Process Steps: 4 items (Discover, Design, Refine, Deliver)')

    console.log('\n🌐 Next steps:')
    console.log('  1. Wait 30-60 seconds for Vercel to rebuild')
    console.log('  2. Refresh your website')
    console.log('  3. Verify all content appears correctly')
    console.log('  4. Go to /studio to edit content anytime')
  } catch (error) {
    console.error('❌ Error populating Sanity:', error.message)
    process.exit(1)
  }
}

populateSanity()
