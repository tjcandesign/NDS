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
    philosophyQuote,
    body,
    seoDescription,
    introParagraphs,
    philosophyTitle,
    philosophyParagraphs,
    services[] {
      title,
      description,
    },
  }
`

// All projects for portfolio page
export const ALL_PROJECTS_QUERY = `
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
  }
`

// Single project query
export const PROJECT_QUERY = `
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
  }
`

// Featured projects for homepage
export const FEATURED_PROJECTS_QUERY = `
  *[_type == "project" && featured == true] | order(order asc) {
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
  }
`
