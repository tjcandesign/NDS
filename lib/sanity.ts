import { client } from '@/sanity/lib/client'
import { SETTINGS_QUERY, PAGE_QUERY, ALL_PROJECTS_QUERY, ALL_PROJECTS_PREVIEW_QUERY, PROJECT_QUERY, PROJECT_PREVIEW_QUERY, FEATURED_PROJECTS_QUERY, FORM_CONFIG_QUERY, HOME_PAGE_TEXT_QUERY } from '@/sanity/lib/queries'
import { draftMode } from 'next/headers'

// Type definitions
export interface NavigationLink {
  label: string
  href: string
}

export interface ProcessStep {
  id: string
  title: string
  description: string
}

export interface SiteSettings {
  _id: string
  title: string
  tagline: string
  email: string
  phone: string
  address: string
  instagram: string
  linkedin: string
  seoDescription: string
  navigationLinks: NavigationLink[]
  processSteps: ProcessStep[]
}

export interface Service {
  title: string
  description: string
}

export interface Page {
  _id: string
  title: string
  slug: { current: string }
  heroSubtitle: string
  heroDescription: string
  body: any
  seoDescription: string
  introParagraphs?: string[]
  philosophyTitle?: string
  philosophyParagraphs?: string[]
  services?: Service[]
}

export interface Project {
  _id: string
  title: string
  slug: { current: string }
  category: string
  location: string
  completionYear: number
  shortDescription: string
  coverImage: string
  images?: Array<{
    asset: string
    alt: string
    caption?: string
  }>
  projectSize?: string
  scope?: string[]
  body?: any
  featured: boolean
}

export interface FormConfig {
  projectTypes: string[]
  timelineOptions: Array<{ label: string; value: string }>
  budgetRanges: Array<{ label: string; value: string }>
  professionalsOptions: string[]
}

export interface HomePageText {
  processHeading: string
  processSubheading: string
  processDescription: string
  ctaHeading: string
  ctaSubheading: string
  ctaDescription: string
}

// Fallback form configuration
const FALLBACK_FORM_CONFIG: FormConfig = {
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

// Fallback home page text
const FALLBACK_HOME_PAGE_TEXT: HomePageText = {
  processHeading: 'How We Work',
  processSubheading: 'Our Design Process',
  processDescription: 'We believe great interior design comes from a thoughtful, collaborative process that honors your vision while solving real-world challenges.',
  ctaHeading: 'Ready to Begin?',
  ctaSubheading: "Let's Design Something Together",
  ctaDescription: "Whether it's a full renovation or a single room, we'd love to hear about your project.",
}

// Fallback settings for when Sanity is unavailable
const FALLBACK_SETTINGS: SiteSettings = {
  _id: 'siteSettings',
  title: 'Niche Design Studios',
  tagline: 'Interior Design',
  email: 'hello@nichedesignstudios.com',
  phone: '(202) 555-0100',
  address: 'Washington, DC',
  instagram: 'https://www.instagram.com/melkimball/',
  linkedin: 'https://www.linkedin.com',
  seoDescription: 'Interior architecture and design based in Washington, DC.',
  navigationLinks: [
    { label: 'About', href: '/about' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Project Inquiry', href: '/contact' },
  ],
  processSteps: [
    {
      id: 'discover',
      title: 'Discover',
      description: 'We listen deeply to understand your lifestyle, work patterns, and design preferences. Through in-depth conversations and space assessments, we uncover the stories your home or business should tell.',
    },
    {
      id: 'design',
      title: 'Design',
      description: 'We develop detailed concepts that balance aesthetics with functionality. Our designs reflect your unique vision while optimizing for how you actually live and work.',
    },
    {
      id: 'refine',
      title: 'Refine',
      description: 'We iterate through feedback and options, fine-tuning every element. Your input shapes the final direction, ensuring the result feels authentically yours.',
    },
    {
      id: 'deliver',
      title: 'Deliver',
      description: 'We oversee implementation with meticulous attention to detail, coordinating contractors, materials, and timelines. The result is a thoughtfully realized space.',
    },
  ],
}

/**
 * Fetch site settings from Sanity
 * Falls back to defaults if not found or if there's an error
 */
export async function getSettings(): Promise<SiteSettings> {
  try {
    const settings = await client.fetch(SETTINGS_QUERY)

    if (!settings) {
      console.warn('No site settings found in Sanity, using fallback')
      return FALLBACK_SETTINGS
    }

    return {
      ...FALLBACK_SETTINGS,
      ...settings,
    }
  } catch (error) {
    console.error('Error fetching site settings:', error)
    return FALLBACK_SETTINGS
  }
}

/**
 * Fetch a page by slug from Sanity
 */
export async function getPage(slug: string): Promise<Page | null> {
  try {
    const page = await client.fetch(PAGE_QUERY, { slug })
    return page || null
  } catch (error) {
    console.error(`Error fetching page "${slug}":`, error)
    return null
  }
}

/**
 * Fetch all projects for portfolio grid
 * Includes draft projects when in preview mode
 */
export async function getAllProjects(): Promise<Project[]> {
  try {
    const draft = await draftMode()
    const query = draft.isEnabled ? ALL_PROJECTS_PREVIEW_QUERY : ALL_PROJECTS_QUERY
    const projects = await client.fetch(query)
    return projects || []
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

/**
 * Fetch a single project by slug
 * Includes draft projects when in preview mode
 */
export async function getProject(slug: string): Promise<Project | null> {
  try {
    const draft = await draftMode()
    const query = draft.isEnabled ? PROJECT_PREVIEW_QUERY : PROJECT_QUERY
    const project = await client.fetch(query, { slug })
    return project || null
  } catch (error) {
    console.error(`Error fetching project "${slug}":`, error)
    return null
  }
}

/**
 * Fetch featured projects for homepage
 */
export async function getFeaturedProjects(): Promise<Project[]> {
  try {
    const projects = await client.fetch(FEATURED_PROJECTS_QUERY)
    return projects || []
  } catch (error) {
    console.error('Error fetching featured projects:', error)
    return []
  }
}

/**
 * Fetch form configuration from Sanity
 * Falls back to defaults if not found or if there's an error
 */
export async function getFormConfig(): Promise<FormConfig> {
  try {
    const config = await client.fetch(FORM_CONFIG_QUERY)
    return config || FALLBACK_FORM_CONFIG
  } catch (error) {
    console.error('Error fetching form config:', error)
    return FALLBACK_FORM_CONFIG
  }
}

/**
 * Fetch home page text from Sanity
 * Falls back to defaults if not found or if there's an error
 */
export async function getHomePageText(): Promise<HomePageText> {
  try {
    const text = await client.fetch(HOME_PAGE_TEXT_QUERY)
    return text || FALLBACK_HOME_PAGE_TEXT
  } catch (error) {
    console.error('Error fetching home page text:', error)
    return FALLBACK_HOME_PAGE_TEXT
  }
}
