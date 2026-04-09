import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        slugify: (input) => input
          .toLowerCase()
          .replace(/\s+/g, '-')
          .slice(0, 200),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'string',
      description: 'Subtitle shown above main heading',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      rows: 3,
      description: 'Description text under the main heading',
    }),
    defineField({
      name: 'philosophyQuote',
      title: 'Philosophy Quote',
      type: 'string',
      description: 'Quote to display in philosophy section',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
      ],
    }),
    defineField({
      name: 'body',
      title: 'Page Body',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'introParagraphs',
      title: 'Intro Paragraphs (About Page)',
      type: 'array',
      of: [
        defineField({
          name: 'paragraph',
          title: 'Paragraph',
          type: 'text',
          rows: 4,
        }),
      ],
      description: 'Left column content on About page',
    }),
    defineField({
      name: 'philosophyTitle',
      title: 'Philosophy Section Title',
      type: 'string',
      description: 'e.g., "Our Philosophy"',
    }),
    defineField({
      name: 'philosophyParagraphs',
      title: 'Philosophy Paragraphs',
      type: 'array',
      of: [
        defineField({
          name: 'paragraph',
          title: 'Paragraph',
          type: 'text',
          rows: 4,
        }),
      ],
      description: 'Right column content on About page',
    }),
    defineField({
      name: 'aboutImage',
      title: 'About Page Portrait',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
      ],
      description: 'Portrait image displayed on the right side of the About page content',
    }),
    defineField({
      name: 'showAboutImagePlaceholder',
      title: 'Show About Image Placeholder',
      type: 'boolean',
      description: 'Show a placeholder block when no portrait image is uploaded. Turn off to hide.',
      initialValue: true,
    }),
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [
        defineField({
          name: 'service',
          title: 'Service',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Service Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Service Description',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'description' },
          },
        }),
      ],
      description: 'Services listed in "What We Do" section',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'slug.current' },
  },
})
