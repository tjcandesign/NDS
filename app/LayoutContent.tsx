import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { getSettings } from '@/lib/sanity'

export async function LayoutContent({ children }: { children: React.ReactNode }) {
  const settings = await getSettings()

  return (
    <>
      <Nav links={settings.navigationLinks} />
      {children}
      <Footer />
    </>
  )
}
