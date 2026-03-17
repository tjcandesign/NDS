import Link from 'next/link'
import Image from 'next/image'
import { getSettings } from '@/lib/sanity'

export default async function Footer() {
  const settings = await getSettings()
  return (
    <footer className="bg-navy-blue-dark text-stone-400">
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <div className="mb-6 w-20">
            <Image src="/nds-logo.svg" alt="NDS Logo" width={121} height={81} />
          </div>
          <p className="font-serif text-stone-100 text-lg mb-3">Niche Design Studio</p>
          <p className="text-sm leading-relaxed">
            Interior architecture for spaces that reflect who you are.
            Based in Washington, DC.
          </p>
        </div>

        <div>
          <p className="text-stone-100 text-xs tracking-widest uppercase mb-4">Navigate</p>
          <ul className="space-y-2 text-sm">
            {[
              { href: '/about', label: 'About' },
              { href: '/portfolio', label: 'Portfolio' },
              { href: '/blog', label: 'Journal' },
              { href: '/contact', label: 'Contact' },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="hover:text-stone-100 transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-stone-100 text-xs tracking-widest uppercase mb-4">Get In Touch</p>
          <p className="text-sm">{settings.address}</p>
          <a
            href={`mailto:${settings.email}`}
            className="text-sm hover:text-stone-100 transition-colors"
          >
            {settings.email}
          </a>
          {settings.instagram && (
            <div className="mt-4">
              <a
                href={settings.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block hover:text-stone-100 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.117.6c-.779.267-1.459.645-2.083 1.27-.645.624-1.004 1.294-1.27 2.084-.266.778-.467 1.648-.527 2.926C.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.527 2.926.267.78.645 1.455 1.27 2.08.645.624 1.29.96 2.084 1.27.778.26 1.648.462 2.926.522C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.926-.527.78-.267 1.453-.645 2.083-1.27.645-.625.96-1.29 1.27-2.084.26-.778.462-1.648.522-2.926.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.527-2.926-.267-.78-.645-1.454-1.27-2.083-.625-.645-1.29-.96-2.084-1.27-.778-.267-1.648-.467-2.926-.527C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.009 4.849.070 1.17.054 1.805.244 2.227.408.56.217.96.477 1.382.896.419.42.679.822.896 1.381.164.422.354 1.057.408 2.227.061 1.264.07 1.646.07 4.849s-.009 3.585-.07 4.849c-.054 1.17-.244 1.805-.408 2.227-.217.56-.477.96-.896 1.382-.42.419-.822.679-1.381.896-.422.164-1.057.354-2.227.408-1.264.061-1.646.07-4.849.07s-3.585-.009-4.849-.07c-1.17-.054-1.805-.244-2.227-.408-.56-.217-.96-.477-1.382-.896-.419-.42-.679-.822-.896-1.381-.164-.422-.354-1.057-.408-2.227-.061-1.264-.07-1.646-.07-4.849s.009-3.585.07-4.849c.054-1.17.244-1.805.408-2.227.217-.56.477-.96.896-1.382.42-.419.822-.679 1.381-.896.422-.164 1.057-.354 2.227-.408 1.264-.061 1.646-.07 4.849-.07z"/>
                  <circle cx="12" cy="12" r="3.846"/>
                  <circle cx="18.406" cy="5.594" r=".9"/>
                </svg>
              </a>
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-navy-blue-dark max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-stone-600">
        <p>&copy; {new Date().getFullYear()} Niche Design Studio. All rights reserved.</p>
        <Link href="/studio" className="hover:text-stone-400 transition-colors">
          Studio
        </Link>
      </div>
    </footer>
  )
}
