'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { media } from 'sanity-plugin-media'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'
import { schemaTypes } from './sanity/schemas'

export default defineConfig({
  name: 'niche-design-studios',
  title: 'Niche Design Studios',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

  plugins: [
    structureTool({
      structure: (S, context) =>
        S.list()
          .title('Content')
          .items([
            // Drag-and-drop reorderable list of Portfolio projects
            orderableDocumentListDeskItem({
              type: 'project',
              title: 'Portfolio Projects',
              S,
              context,
            }),
            S.divider(),
            // Everything else uses the default list rendering
            ...S.documentTypeListItems().filter(
              (item) => item.getId() !== 'project',
            ),
          ]),
    }),
    visionTool(),
    media(),
  ],

  schema: {
    types: schemaTypes,
  },

  basePath: '/studio',
})
