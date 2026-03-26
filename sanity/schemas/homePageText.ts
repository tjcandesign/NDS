import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'homePageText',
  title: 'Home Page Text',
  type: 'document',
  fields: [
    defineField({
      name: 'processHeading',
      title: 'Process Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Main heading for the design process section',
      initialValue: 'How We Work',
    }),
    defineField({
      name: 'processSubheading',
      title: 'Process Subheading',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Subheading for the design process section',
      initialValue: 'Our Design Process',
    }),
    defineField({
      name: 'processDescription',
      title: 'Process Description',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
      description: 'Description of your design process and approach',
      initialValue: 'We believe great interior design comes from understanding your vision and translating it into beautiful, functional spaces.',
    }),
    defineField({
      name: 'ctaHeading',
      title: 'CTA Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Main heading for the call-to-action section',
      initialValue: 'Ready to Begin?',
    }),
    defineField({
      name: 'ctaSubheading',
      title: 'CTA Subheading',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Subheading for the call-to-action section',
      initialValue: "Let's Design Something Together",
    }),
    defineField({
      name: 'ctaDescription',
      title: 'CTA Description',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
      description: 'Description text for the call-to-action section',
      initialValue: 'Whether it\'s a full renovation, a single room makeover, or just bringing your vision to life, we\'re here to help make it happen.',
    }),
    defineField({
      name: 'ctaButtonText',
      title: 'CTA Button Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Text displayed on the call-to-action button',
      initialValue: 'Get Started',
    }),
    defineField({
      name: 'featuredProjectsHeading',
      title: 'Featured Projects Heading',
      type: 'string',
      description: 'Heading for the featured projects section (optional)',
      initialValue: 'Featured Projects',
    }),
    defineField({
      name: 'featuredProjectsSubheading',
      title: 'Featured Projects Subheading',
      type: 'string',
      description: 'Subheading for the featured projects section (optional)',
      initialValue: 'See Our Latest Work',
    }),
  ],
  preview: {
    select: { heading: 'processHeading' },
    prepare() {
      return {
        title: 'Home Page Text',
        subtitle: 'All heading, subheading, and description text for the home page',
      }
    },
  },
})
