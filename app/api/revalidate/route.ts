import { revalidatePath } from 'next/cache'
import type { NextRequest } from 'next/server'

const REVALIDATE_SECRET = process.env.SANITY_REVALIDATE_SECRET

export async function POST(request: NextRequest) {
  // Verify the secret token
  const secret = request.headers.get('x-sanity-webhook-secret')

  if (secret !== REVALIDATE_SECRET) {
    return new Response('Unauthorized', { status: 401 })
  }

  try {
    const body = await request.json()

    // Determine what was changed based on the webhook payload
    const changedTypes = body._type || body.type || []

    // Revalidate the entire site for siteSettings changes
    if (changedTypes === 'siteSettings') {
      revalidatePath('/', 'layout')
      return new Response('Revalidated site settings', { status: 200 })
    }

    // Revalidate homepage for project changes
    if (changedTypes === 'project') {
      revalidatePath('/', 'layout')
      revalidatePath('/portfolio', 'page')
    }

    // Revalidate page for page changes
    if (changedTypes === 'page') {
      revalidatePath('/', 'layout')
    }

    return new Response('Revalidation triggered', { status: 200 })
  } catch (error) {
    console.error('Revalidation error:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
