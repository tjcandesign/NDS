// Use native fetch (built-in Node 18+)

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'qb84mjun'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_WRITE_TOKEN

if (!token) {
  console.error('❌ Error: SANITY_WRITE_TOKEN not found in environment variables')
  process.exit(1)
}

const apiUrl = `https://${projectId}.api.sanity.io/v2021-06-07/data/mutate/${dataset}`

const pages = [
  {
    _type: 'page',
    title: 'Spaces That Tell Your Story',
    slug: { current: 'home' },
    heroSubtitle: 'Interior Architecture · Washington, DC',
    heroDescription: 'We craft interiors that balance beauty, function, and the spirit of the people who inhabit them.',
    philosophyQuote: '"Good design isn\'t decorating space — it\'s revealing it."',
  },
  {
    _type: 'page',
    title: 'About',
    slug: { current: 'about' },
    heroSubtitle: 'About Niche Design Studios',
    heroDescription: 'We are a team of interior architects dedicated to creating spaces that inspire and reflect the personalities of those who inhabit them.',
  },
  {
    _type: 'page',
    title: 'Project Inquiry',
    slug: { current: 'contact' },
    heroSubtitle: 'Get in Touch',
    heroDescription: 'Let\'s discuss your project and create something beautiful together.',
  },
]

async function seedSanity() {
  try {
    console.log('🌱 Starting seed...\n')

    for (const page of pages) {
      try {
        // Check if page exists
        const query = encodeURIComponent(`*[_type == "page" && slug.current == "${page.slug.current}"][0]._id`)
        const checkUrl = `https://${projectId}.api.sanity.io/v2021-06-07/data/query/${dataset}?query=${query}`

        const checkResponse = await fetch(checkUrl, {
          headers: { Authorization: `Bearer ${token}` },
        })
        const checkData = await checkResponse.json()

        if (checkData.result) {
          console.log(`✓ Page "${page.title}" already exists`)
        } else {
          const mutations = [{ create: page }]
          const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ mutations }),
          })

          const data = await response.json()

          if (response.ok) {
            console.log(`✓ Created page: "${page.title}"`)
          } else {
            console.error(`✗ Error creating "${page.title}":`, data.message)
          }
        }
      } catch (error) {
        console.error(`✗ Error with page "${page.title}":`, error.message)
      }
    }

    console.log('\n✨ Seed complete!')
  } catch (error) {
    console.error('❌ Error seeding Sanity:', error.message)
    process.exit(1)
  }
}

seedSanity()
