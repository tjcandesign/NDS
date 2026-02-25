'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { media } from 'sanity-plugin-media'
import { schemaTypes } from './sanity/schemas'

export default defineConfig({
  name: 'niche-design-studios',
  title: 'Niche Design Studios',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

  plugins: [
    structureTool(),
    visionTool(),
    media(),
  ],

  schema: {
    types: schemaTypes,
  },

  basePath: '/studio',
})
