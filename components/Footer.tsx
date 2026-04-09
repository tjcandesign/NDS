import Link from 'next/link'
import Image from 'next/image'
import { getSettings } from '@/lib/sanity'

export default async function Footer() {
  const settings = await getSettings()
  return (
    <footer className="bg-navy-blue-dark text-stone-400">
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <div className="mb-6 w-32">
            <Image src="/nds-logo.svg" alt="NDS Logo" width={121} height={81} />
          </div>
          <p className="font-serif text-stone-100 text-lg mb-3">Niche Design Studio</p>
          <p className="text-sm leading-relaxed">
            Thoughtfully designed spaces that reflect who you are and how you live.
          </p>
        </div>

        <div>
          <p className="text-stone-100 text-xs tracking-widest uppercase mb-4">Navigate</p>
          <ul className="space-y-2 text-sm">
            {[
              { href: '/about', label: 'About' },
              { href: '/portfolio', label: 'Portfolio' },
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
          <div className="mt-4 flex gap-4">
            {settings.instagram && (
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
            )}
            <a
              href="https://www.pinterest.com/nichedesignstudios/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block hover:text-stone-100 transition-colors"
              aria-label="Pinterest"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
              </svg>
            </a>
            <a
              href="https://www.houzz.com/pro/nichedesignstudios/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block hover:text-stone-100 transition-colors"
              aria-label="Houzz"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.5 0L5.4 3.5v7.1L12.5 7v6.6l-7.1 3.5V24l7.1-3.5v-7.1l7.1 3.5v-6.6l-7.1-3.5V0z"/>
              </svg>
            </a>
          </div>
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
