import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'contactFormText',
  title: 'Contact Form Text',
  type: 'document',
  fields: [
    defineField({
      name: 'sectionLabels',
      title: 'Section Labels',
      type: 'object',
      fields: [
        defineField({
          name: 'aboutYou',
          title: 'About You',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'theProject',
          title: 'The Project',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'timeline',
          title: 'Timeline Section',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'budget',
          title: 'Budget Section',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'additional',
          title: 'Additional Information',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'fieldLabels',
      title: 'Field Labels',
      type: 'object',
      fields: [
        defineField({
          name: 'firstName',
          title: 'First Name Label',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'lastName',
          title: 'Last Name Label',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'email',
          title: 'Email Label',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'phone',
          title: 'Phone Label',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'projectType',
          title: 'Project Type Label',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'projectDescription',
          title: 'Project Description Label',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'timeline',
          title: 'Timeline Label',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'budget',
          title: 'Budget Label',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'professional',
          title: 'Professional Type Label',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'additionalNotes',
          title: 'Additional Notes Label',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'fieldPlaceholders',
      title: 'Field Placeholders',
      type: 'object',
      fields: [
        defineField({
          name: 'firstName',
          title: 'First Name Placeholder',
          type: 'string',
        }),
        defineField({
          name: 'lastName',
          title: 'Last Name Placeholder',
          type: 'string',
        }),
        defineField({
          name: 'email',
          title: 'Email Placeholder',
          type: 'string',
        }),
        defineField({
          name: 'phone',
          title: 'Phone Placeholder',
          type: 'string',
        }),
        defineField({
          name: 'projectDescription',
          title: 'Project Description Placeholder',
          type: 'text',
          rows: 2,
        }),
        defineField({
          name: 'additionalNotes',
          title: 'Additional Notes Placeholder',
          type: 'text',
          rows: 2,
        }),
      ],
    }),
    defineField({
      name: 'helperText',
      title: 'Helper Text & Instructions',
      type: 'object',
      fields: [
        defineField({
          name: 'projectDescription',
          title: 'Project Description Helper',
          type: 'string',
          description: 'Helper text to guide users when describing their project',
        }),
        defineField({
          name: 'timeline',
          title: 'Timeline Helper',
          type: 'string',
          description: 'Helper text for timeline selection',
        }),
        defineField({
          name: 'budget',
          title: 'Budget Helper',
          type: 'string',
          description: 'Helper text for budget selection',
        }),
        defineField({
          name: 'additionalNotes',
          title: 'Additional Notes Helper',
          type: 'string',
          description: 'Helper text for the notes field',
        }),
      ],
    }),
    defineField({
      name: 'successMessage',
      title: 'Success Message',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
      description: 'Message displayed after successful form submission',
    }),
    defineField({
      name: 'submitButtonText',
      title: 'Submit Button Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Send Message',
    }),
    defineField({
      name: 'errorMessage',
      title: 'Error Message',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Generic error message if form submission fails',
      initialValue: 'There was an error submitting the form. Please try again.',
    }),
  ],
  preview: {
    select: { successMessage: 'successMessage' },
    prepare() {
      return {
        title: 'Contact Form Text',
        subtitle: 'All labels, placeholders, and messages for the contact form',
      }
    },
  },
})
