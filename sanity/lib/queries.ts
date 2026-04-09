// Site-wide settings query
export const SETTINGS_QUERY = `
  *[_type == "siteSettings" && _id == "siteSettings"][0] {
    _id,
    title,
    tagline,
    email,
    phone,
    address,
    instagram,
    linkedin,
    seoDescription,
    navigationLinks[] {
      label,
      href,
    },
    processSteps[] {
      id,
      title,
      description,
    },
  }
`

// Page query for dynamic pages (about, etc.)
export const PAGE_QUERY = `
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    heroSubtitle,
    heroDescription,
    body,
    seoDescription,
    introParagraphs,
    philosophyTitle,
    philosophyParagraphs,
    aboutImage,
    showAboutImagePlaceholder,
    services[] {
      title,
      description,
    },
  }
`

// All projects for portfolio page (only published)
export const ALL_PROJECTS_QUERY = `
  *[_type == "project" && published == true] | order(order asc, completionYear desc) {
    _id,
    title,
    slug,
    category,
    location,
    completionYear,
    shortDescription,
    "coverImage": coverImage.asset->url,
    featured,
    published,
  }
`

// All projects including drafts (for preview mode)
export const ALL_PROJECTS_PREVIEW_QUERY = `
  *[_type == "project"] | order(order asc, completionYear desc) {
    _id,
    title,
    slug,
    category,
    location,
    completionYear,
    shortDescription,
    "coverImage": coverImage.asset->url,
    featured,
    published,
  }
`

// Single project query (only if published)
export const PROJECT_QUERY = `
  *[_type == "project" && slug.current == $slug && published == true][0] {
    _id,
    title,
    slug,
    category,
    location,
    completionYear,
    projectSize,
    scope,
    shortDescription,
    "coverImage": coverImage.asset->url,
    images[] {
      "asset": asset->url,
      alt,
      caption,
    },
    body,
    featured,
    published,
  }
`

// Single project query (including drafts for preview)
export const PROJECT_PREVIEW_QUERY = `
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    category,
    location,
    completionYear,
    projectSize,
    scope,
    shortDescription,
    "coverImage": coverImage.asset->url,
    images[] {
      "asset": asset->url,
      alt,
      caption,
    },
    body,
    featured,
    published,
  }
`

// Featured projects for homepage
export const FEATURED_PROJECTS_QUERY = `
  *[_type == "project" && featured == true && published == true] | order(order asc) {
    _id,
    title,
    slug,
    category,
    shortDescription,
    "coverImage": coverImage.asset->url,
    "images": images[0..1] {
      "asset": asset->url,
      alt,
    },
    published,
  }
`

// Form configuration query
export const FORM_CONFIG_QUERY = `
  *[_type == "formConfig"][0] {
    projectTypes[],
    timelineOptions[],
    budgetRanges[],
    professionalsOptions[]
  }
`

// Home page text query
export const HOME_PAGE_TEXT_QUERY = `
  *[_type == "homePageText"][0] {
    processHeading,
    processSubheading,
    processDescription,
    ctaHeading,
    ctaSubheading,
    ctaDescription
  }
`
