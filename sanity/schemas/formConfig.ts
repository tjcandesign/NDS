import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'formConfig',
  title: 'Form Configuration',
  type: 'document',
  fields: [
    defineField({
      name: 'projectTypes',
      title: 'Project Types',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Available project type options for the contact form',
      validation: (Rule) => Rule.required(),
      initialValue: ['New Home', 'Renovation', 'Addition', 'Interiors', 'Kitchen', 'Bathroom'],
    }),
    defineField({
      name: 'timelineOptions',
      title: 'Timeline Options',
      type: 'array',
      of: [
        defineField({
          name: 'timelineOption',
          title: 'Timeline Option',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
              validation: (Rule) => Rule.required(),
              description: 'Used for form submission and data processing',
            }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'value' },
          },
        }),
      ],
      description: 'Timeline options for when the project should start',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'budgetRanges',
      title: 'Budget Ranges',
      type: 'array',
      of: [
        defineField({
          name: 'budgetRange',
          title: 'Budget Range',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
              validation: (Rule) => Rule.required(),
              description: 'Used for form submission and data processing',
            }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'value' },
          },
        }),
      ],
      description: 'Budget range options for the project',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'professionalsOptions',
      title: 'Professionals Options',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Professional roles that can be selected in the contact form',
      validation: (Rule) => Rule.required(),
      initialValue: ['Realtor', 'Contractor', 'Interior Designer', 'Other'],
    }),
  ],
  preview: {
    select: { title: 'projectTypes' },
    prepare() {
      return {
        title: 'Form Configuration',
        subtitle: 'Contact form options and fields',
      }
    },
  },
})
