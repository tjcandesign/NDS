'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

interface HeroParallaxImageProps {
  src: string
  alt: string
}

/**
 * Full-bleed hero image with a subtle parallax effect.
 * The image translates down at ~40% of scroll speed while the hero is in view,
 * giving depth without overwhelming the content. Respects prefers-reduced-motion.
 */
export default function HeroParallaxImage({ src, alt }: HeroParallaxImageProps) {
  const [offset, setOffset] = useState(0)
  const ticking = useRef(false)

  useEffect(() => {
    // Bail out if the user prefers reduced motion
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          // Cap the parallax range to the viewport height so the image
          // doesn't keep translating once the hero is offscreen.
          const y = Math.min(window.scrollY, window.innerHeight) * 0.4
          setOffset(y)
          ticking.current = false
        })
        ticking.current = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className="absolute inset-0 will-change-transform"
      style={{ transform: `translate3d(0, ${offset}px, 0)` }}
    >
      {/* Scaled up so the translated image never exposes its edges */}
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover scale-110"
        priority
        sizes="100vw"
      />
    </div>
  )
}
