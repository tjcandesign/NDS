'use client'

import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export function LayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      {children}
      <Footer />
    </>
  )
}
