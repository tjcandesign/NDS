import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { LayoutContent } from './LayoutContent'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: {
    default: 'Niche Design Studios',
    template: '%s | Niche Design Studios',
  },
  description: 'Interior architecture and design based in Capitol Hill, Washington DC.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased">
        <LayoutContent>{children}</LayoutContent>
      </body>
    </html>
  )
}
