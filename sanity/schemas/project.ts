import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Portfolio Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Residential', value: 'residential' },
          { title: 'Commercial', value: 'commercial' },
          { title: 'Hospitality', value: 'hospitality' },
          { title: 'Other', value: 'other' },
        ],
      },
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'completionYear',
      title: 'Completion Year',
      type: 'number',
    }),
    defineField({
      name: 'projectSize',
      title: 'Project Size',
      type: 'string',
      description: 'e.g. 2,400 sq ft',
    }),
    defineField({
      name: 'scope',
      title: 'Scope of Work',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      description: 'e.g. Full Renovation, Space Planning, Finish Selection',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'images',
      title: 'Project Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
            }),
            defineField({
              name: 'imageGroup',
              title: 'Image Category',
              type: 'string',
              description: 'Organize images by space or category (e.g., Kitchen, Living Room, Bedroom, Before/After)',
              options: {
                list: [
                  { title: 'Kitchen', value: 'kitchen' },
                  { title: 'Dining Room', value: 'dining' },
                  { title: 'Living Room', value: 'living' },
                  { title: 'Bedroom', value: 'bedroom' },
                  { title: 'Bathroom', value: 'bathroom' },
                  { title: 'Entryway', value: 'entryway' },
                  { title: 'Home Office', value: 'office' },
                  { title: 'Other', value: 'other' },
                  { title: 'Before/After', value: 'beforeafter' },
                  { title: 'Detail Shot', value: 'detail' },
                ],
              },
            }),
          ],
        },
      ],
      description: 'Drag to reorder images. Images are organized by category in the editor for easier management.',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      description: 'Brief summary shown on the portfolio grid.',
    }),
    defineField({
      name: 'body',
      title: 'Full Description',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'featured',
      title: 'Featured on Homepage',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first.',
    }),
    defineField({
      name: 'published',
      title: 'Publish Project',
      type: 'boolean',
      initialValue: false,
      description: 'When unchecked, project only appears in preview mode. Check to make it live.',
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Completion Year, Newest',
      name: 'completionYearDesc',
      by: [{ field: 'completionYear', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'coverImage',
    },
  },
})
