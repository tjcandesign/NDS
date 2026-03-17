import { client } from '@/sanity/lib/client'
import { SETTINGS_QUERY, PAGE_QUERY, ALL_PROJECTS_QUERY, PROJECT_QUERY, FEATURED_PROJECTS_QUERY } from '@/sanity/lib/queries'

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

export interface Page {
  _id: string
  title: string
  slug: { current: string }
  heroSubtitle: string
  heroDescription: string
  philosophyQuote: string
  body: any
  seoDescription: string
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

// Fallback settings for when Sanity is unavailable
const FALLBACK_SETTINGS: SiteSettings = {
  _id: 'siteSettings',
  title: 'Niche Design Studios',
  tagline: 'Interior Architecture & Design',
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
 */
export async function getAllProjects(): Promise<Project[]> {
  try {
    const projects = await client.fetch(ALL_PROJECTS_QUERY)
    return projects || []
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

/**
 * Fetch a single project by slug
 */
export async function getProject(slug: string): Promise<Project | null> {
  try {
    const project = await client.fetch(PROJECT_QUERY, { slug })
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
