import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

const PREVIEW_SECRET = process.env.SANITY_PREVIEW_SECRET

/**
 * Preview mode activation
 * Usage: /api/preview?secret=YOUR_SECRET&slug=/portfolio
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug') || '/'

  // Validate secret
  if (secret !== PREVIEW_SECRET) {
    return new Response('Invalid preview secret', { status: 401 })
  }

  // Enable draft mode
  const draft = await draftMode()
  draft.enable()

  // Redirect to the path to preview
  redirect(slug)
}
