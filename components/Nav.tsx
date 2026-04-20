'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import type { NavigationLink } from '@/lib/sanity'

interface NavProps {
  links: NavigationLink[]
}

export default function Nav({ links }: NavProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY

          // Show nav if scrolling up or near the top
          if (currentScrollY < lastScrollY || currentScrollY < 50) {
            setIsVisible(true)
          }
          // Hide nav if scrolling down and past the top
          else if (currentScrollY > lastScrollY && currentScrollY > 50) {
            setIsVisible(false)
          }

          setLastScrollY(currentScrollY)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  // Show nav on hover
  const handleMouseEnter = () => {
    setIsHovering(true)
    setIsVisible(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
  }

  const shouldShow = isVisible || isHovering

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-stone-50/90 backdrop-blur-sm border-b border-stone-200 will-change-transform"
      style={{
        transform: shouldShow ? 'translateY(0)' : 'translateY(-100%)',
        opacity: shouldShow ? 1 : 0,
        transition:
          'transform 700ms cubic-bezier(0.16, 1, 0.3, 1), opacity 500ms ease-out',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center h-full">
          <img
            src="/nds-circle-logo-black-2.svg"
            alt="Niche Design Studio"
            className="h-8 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm tracking-widest uppercase transition-colors ${
                pathname === href
                  ? 'text-navy-blue font-medium'
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-stone-700"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className="block w-5 h-px bg-current mb-1" />
          <span className="block w-5 h-px bg-current mb-1" />
          <span className="block w-5 h-px bg-current" />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="md:hidden border-t border-stone-200 bg-stone-50">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`block px-6 py-3 text-sm tracking-widest uppercase border-b border-stone-100 ${
                pathname === href ? 'text-navy-blue font-medium' : 'text-stone-500'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
