'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

interface GalleryLightboxProps {
  images: any[]
  title: string
}

export default function GalleryLightbox({ images, title }: GalleryLightboxProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      if (e.key === 'Escape') {
        setIsOpen(false)
      } else if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
      } else if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, images.length])

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX
    const diff = touchStart - touchEnd

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
      } else {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
      }
    }
  }

  return (
    <>
      {/* Gallery Grid */}
      <div className="bg-stone-50">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {images.map((image, idx) => (
              <div
                key={idx}
                className={`relative bg-stone-200 overflow-hidden cursor-pointer group ${
                  idx % 3 === 2 ? 'md:col-span-2' : ''
                }`}
                style={{
                  aspectRatio: idx % 3 === 2 ? '16 / 9' : '1 / 1',
                }}
                onClick={() => {
                  setCurrentIndex(idx)
                  setIsOpen(true)
                }}
              >
                <Image
                  src={urlFor(image).width(1200).height(1200).url()}
                  alt={image.alt || `${title} - Image ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={() => setIsOpen(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Close button */}
          <button
            className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors z-50"
            onClick={() => setIsOpen(false)}
            aria-label="Close lightbox"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Image */}
          <div
            className="relative w-full h-full flex items-center justify-center px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={urlFor(images[currentIndex]).width(1920).height(1440).url()}
              alt={images[currentIndex].alt || `${title} - Image ${currentIndex + 1}`}
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Navigation arrows */}
          <button
            className="absolute left-6 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors p-2"
            onClick={(e) => {
              e.stopPropagation()
              setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
            }}
            aria-label="Previous image"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <button
            className="absolute right-6 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors p-2"
            onClick={(e) => {
              e.stopPropagation()
              setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
            }}
            aria-label="Next image"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Image counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm tracking-wide">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  )
}
