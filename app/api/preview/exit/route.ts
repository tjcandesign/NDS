import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

/**
 * Preview mode exit
 * Usage: /api/preview/exit
 */
export async function GET() {
  const draft = await draftMode()
  draft.disable()

  redirect('/')
}
