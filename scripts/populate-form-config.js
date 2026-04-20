/**
 * Script to populate Sanity form config and home page text
 * Run with: node scripts/populate-form-config.js
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

const formConfigDoc = {
  _type: 'formConfig',
  _id: 'formConfig',
  projectTypes: ['New Home', 'Renovation', 'Addition', 'Interiors', 'Kitchen', 'Bathroom'],
  timelineOptions: [
    { label: 'Next 3 months', value: 'next-3-months' },
    { label: '3-6 months', value: '3-6-months' },
    { label: '6-12 months', value: '6-12-months' },
    { label: '12+ months', value: '12-plus-months' },
    { label: 'Flexible/Open', value: 'flexible' },
  ],
  budgetRanges: [
    { label: 'Under $25,000', value: 'under-25k' },
    { label: '$25,000 – $75,000', value: '25k-75k' },
    { label: '$100,000 – $300,000', value: '100k-300k' },
    { label: '$300,000+', value: '300k+' },
    { label: 'Other', value: 'other' },
  ],
  professionalsOptions: ['Realtor', 'Contractor', 'Interior Designer', 'Other'],
}

const homePageTextDoc = {
  _type: 'homePageText',
  _id: 'homePageText',
  processHeading: 'How We Work',
  processSubheading: 'Our Design Process',
  processDescription: 'We believe great design comes from a thoughtful, collaborative process that honors your vision while solving modern daily challenges.',
  ctaHeading: 'Ready to Begin?',
  ctaSubheading: "Let's Design Something Together",
  ctaDescription: "Whether it's a full renovation or a single room, we'd love to hear about your project.",
}

async function populateDocuments() {
  try {
    console.log('🚀 Starting form config and home page text population...')
    console.log(`📝 Project ID: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`)
    console.log(`📝 Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET}`)

    console.log('\nPopulating formConfig...')
    await client
      .createOrReplace(formConfigDoc)
      .then(() => console.log('✓ formConfig created/updated'))

    console.log('Populating homePageText...')
    await client
      .createOrReplace(homePageTextDoc)
      .then(() => console.log('✓ homePageText created/updated'))

    console.log('\n✅ All documents populated successfully!')
    console.log('\n🌐 Next steps:')
    console.log('  1. Wait 30-60 seconds for Vercel to rebuild')
    console.log('  2. Visit /portfolio or / page')
    console.log('  3. Verify form options and home page text display correctly')
    console.log('  4. Go to /studio to edit content anytime')
  } catch (error) {
    console.error('❌ Error populating documents:', error.message)
    process.exit(1)
  }
}

populateDocuments()
