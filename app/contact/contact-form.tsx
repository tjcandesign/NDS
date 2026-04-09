'use client'

import { useState } from 'react'

const inputClass =
  'w-full border-b border-stone-300 bg-transparent py-3 text-base text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-700 transition-colors'

const labelClass = 'block text-xs tracking-widest uppercase text-stone-700 mb-3 font-medium'

const optionalBadge = (
  <span className="ml-2 text-stone-500 normal-case tracking-normal text-xs font-normal">
    optional
  </span>
)

interface FormConfig {
  projectTypes: string[]
  timelineOptions: Array<{ label: string; value: string }>
  budgetRanges?: Array<{ label: string; value: string }>
  professionalsOptions: string[]
}

export function ContactForm({ formConfig }: { formConfig: FormConfig }) {
  const [submitted, setSubmitted] = useState(false)

  const handleFirstSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 px-6 max-w-4xl mx-auto">
        <p className="text-xs tracking-widest uppercase text-stone-400 mb-4">Get In Touch</p>
        <h1 className="font-serif text-4xl md:text-6xl max-w-2xl leading-tight">
          We Would Love to Hear About Your Project
        </h1>
        <p className="mt-6 text-stone-600 max-w-xl leading-relaxed">
          Fill out the form below and we'll be in touch shortly. We look forward to learning about your vision.
        </p>
      </section>

      <section className="relative py-24 px-6">

        <div className="relative max-w-4xl mx-auto">
          {!submitted ? (
            <form onSubmit={handleFirstSubmit} className="space-y-8">
              {/* ── Section 1: About You ─────────────────────────────── */}
              <fieldset className="bg-stone-50 rounded-lg shadow-lg space-y-6">
                <legend className="text-xs tracking-[0.3em] uppercase text-stone-700 px-8 pt-8 pb-3 mb-8 font-semibold border-b-2 border-navy-blue">
                  About You
                </legend>

                <div className="px-8 pb-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className={labelClass}>
                  Your Name <span className="text-stone-900">*</span>
                </label>
                <input id="name" name="name" type="text" required placeholder="Full name" className={inputClass} />
              </div>
              <div>
                <label htmlFor="phone" className={labelClass}>
                  Phone Number <span className="text-stone-900">*</span>
                </label>
                <input id="phone" name="phone" type="tel" required placeholder="(202) 555-0100" className={inputClass} />
              </div>
            </div>

            <div>
              <label htmlFor="email" className={labelClass}>
                Email <span className="text-stone-900">*</span>
              </label>
              <input id="email" name="email" type="email" required placeholder="you@example.com" className={inputClass} />
            </div>

            <div>
              <label htmlFor="referral" className={labelClass}>
                How did you hear about Niche Design Studio? <span className="text-stone-900">*</span>
              </label>
              <textarea
                id="referral"
                name="referral"
                rows={2}
                required
                className={`${inputClass} resize-none`}
              />
            </div>
                </div>
          </fieldset>

              {/* ── Section 2: The Project ────────────────────────────── */}
              <fieldset className="bg-stone-50 rounded-lg shadow-lg space-y-6">
                <legend className="text-xs tracking-[0.3em] uppercase text-stone-700 px-8 pt-8 pb-3 mb-8 font-semibold border-b-2 border-navy-blue">
                  The Project
                </legend>

                <div className="px-8 pb-8 space-y-6">
            <div>
              <label htmlFor="address" className={labelClass}>
                Project Address <span className="text-stone-900">*</span>
              </label>
              <input id="address" name="address" type="text" required placeholder="Street, City, State, Zip" className={inputClass} />
            </div>

            <div>
              <label htmlFor="living-at-property" className={labelClass}>
                Are you currently living at this property?{optionalBadge}
              </label>
              <div className="flex flex-wrap gap-4 mt-1">
                {['Yes', 'No', 'Maybe'].map((opt) => (
                  <label key={opt} className="flex items-center gap-2 text-sm text-stone-700 cursor-pointer">
                    <input type="radio" name="living-at-property" value={opt.toLowerCase()} className="accent-stone-700" />
                    {opt}
                  </label>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <label className={labelClass}>
                What type of project are you interested in? <span className="text-stone-900">*</span>
              </label>
              <div className="space-y-3 mt-2">
                {formConfig.projectTypes.map((type) => (
                  <label key={type} className="flex items-center gap-3 text-sm text-stone-700 cursor-pointer">
                    <input
                      type="radio"
                      name="project-type"
                      value={type.toLowerCase()}
                      required
                      className="accent-stone-700 w-4 h-4"
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="sqft" className={labelClass}>
                  Approximate Square Footage <span className="text-stone-900">*</span>
                </label>
                <input id="sqft" name="sqft" type="number" min={0} required placeholder="e.g. 1800" className={inputClass} />
              </div>

              <div>
                <label htmlFor="budget" className={labelClass}>
                  Anticipated Budget <span className="text-stone-900">*</span>
                </label>
                <select id="budget" name="budget" required className={`${inputClass} cursor-pointer`}>
                  <option value="">Select range</option>
                  <option value="under-25k">Under $25,000</option>
                  <option value="25k-75k">$25,000 – $75,000</option>
                  <option value="100k-300k">$100,000 – $300,000</option>
                  <option value="300k+">$300,000+</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className={labelClass}>
                Are you currently working with other professionals?{optionalBadge}
              </label>
              <div className="flex flex-wrap gap-x-6 gap-y-2 mt-1">
                {formConfig.professionalsOptions.map((prof) => (
                  <label key={prof} className="flex items-center gap-2 text-sm text-stone-700 cursor-pointer">
                    <input type="checkbox" name="professionals" value={prof.toLowerCase()} className="accent-stone-700" />
                    {prof}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="plans" className={labelClass}>
                Do you have existing plans of your home? <span className="text-stone-900">*</span>
              </label>
              <div className="flex flex-wrap gap-4 mt-1">
                {[
                  { label: 'Yes, physical copies', value: 'physical' },
                  { label: 'Yes, digital (.dwg or .pdf)', value: 'digital' },
                  { label: 'No plans', value: 'none' },
                ].map(({ label, value }) => (
                  <label key={value} className="flex items-center gap-2 text-sm text-stone-700 cursor-pointer">
                    <input type="radio" name="plans" value={value} required className="accent-stone-700" />
                    {label}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="timeline" className={labelClass}>
                What's your timeline? <span className="text-stone-900">*</span>
              </label>
              <select id="timeline" name="timeline" required className={`${inputClass} cursor-pointer`}>
                <option value="">Select timeframe</option>
                {formConfig.timelineOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
                </div>
              </fieldset>

              {/* ── Submit Button ─────────────────────────────── */}
              <div className="pt-8">
                <button
                  type="submit"
                  className="w-full py-4 bg-navy-blue text-white text-sm tracking-widest uppercase hover:bg-navy-blue-dark transition-colors font-medium rounded-lg"
                >
                  Submit Inquiry
                </button>

                <p className="text-xs text-stone-300 text-center mt-6">
                  Fields marked <span className="text-stone-50 font-medium">*</span> are required.
                  We'll respond within 2–3 business days.
                </p>
              </div>
            </form>
          ) : (
            /* Thank you screen with optional additional questions */
            <div className="max-w-2xl">
              <div className="bg-stone-50 rounded-lg p-8 mb-12 shadow-lg">
                <h2 className="font-serif text-2xl text-stone-900 mb-3">Thank You!</h2>
                <p className="text-stone-700 leading-relaxed mb-4">
                  We've received your inquiry and will review it carefully. We'll be in touch within 2–3 business days.
                </p>
                <p className="text-stone-700 leading-relaxed mb-4">
                  In the meantime, would you like to answer a few additional questions to help us better understand your vision?
                </p>
                <p className="text-stone-600 italic">Fondly,<br />Niche Design Studio</p>
              </div>

              <form action="https://formspree.io/f/placeholder" method="POST" className="space-y-8">
                {/* Hidden - submit first form data */}
                <input type="hidden" name="_next" value={typeof window !== 'undefined' ? window.location.href : ''} />

                {/* ── Additional Vision Questions ─────────────────────────────── */}
                <fieldset className="bg-stone-50 rounded-lg shadow-lg space-y-6">
                  <legend className="text-xs tracking-[0.3em] uppercase text-stone-700 px-8 pt-8 pb-3 mb-8 font-semibold border-b-2 border-navy-blue">
                    Your Vision (Optional)
                  </legend>

                  <div className="px-8 pb-8 space-y-6">
            <div>
              <label htmlFor="vision" className={labelClass}>
                Vision Statement <span className="text-stone-900">*</span>
              </label>
              <textarea
                id="vision"
                name="vision"
                rows={4}
                required
                className={`${inputClass} resize-none`}
                placeholder="Describe the feeling or atmosphere you want to create..."
              />
            </div>

            <div>
              <label htmlFor="spaces" className={labelClass}>
                Particular spaces or design features important to this project <span className="text-stone-900">*</span>
              </label>
              <textarea
                id="spaces"
                name="spaces"
                rows={3}
                required
                className={`${inputClass} resize-none`}
                placeholder="e.g. open kitchen, primary suite, home office, natural light..."
              />
            </div>

            <div>
              <label htmlFor="style" className={labelClass}>
                How would you define your design style?{optionalBadge}
              </label>
              <input
                id="style"
                name="style"
                type="text"
                placeholder="e.g. modern traditional, Scandinavian minimalist..."
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="dislikes" className={labelClass}>
                Do you have any strong dislikes?{optionalBadge}
              </label>
              <textarea
                id="dislikes"
                name="dislikes"
                rows={2}
                className={`${inputClass} resize-none`}
                placeholder="Materials, colors, or styles you want to avoid..."
              />
            </div>

            <div>
              <label htmlFor="inspiration" className={labelClass}>
                Images, Pinterest or Houzz boards to share? <span className="text-stone-900">*</span>
              </label>
              <textarea
                id="inspiration"
                name="inspiration"
                rows={2}
                required
                className={`${inputClass} resize-none`}
                placeholder="Paste any links here, or describe your references..."
              />
            </div>

            <div>
              <label htmlFor="comments" className={labelClass}>
                Additional Comments{optionalBadge}
              </label>
              <textarea
                id="comments"
                name="comments"
                rows={3}
                className={`${inputClass} resize-none`}
              />
              </div>
                  </div>
                </fieldset>

                <div className="pt-8">
                  <button
                    type="submit"
                    className="w-full py-4 bg-navy-blue text-white text-sm tracking-widest uppercase hover:bg-navy-blue-dark transition-colors font-medium rounded-lg"
                  >
                    Submit Additional Information
                  </button>

                  <p className="text-xs text-stone-300 text-center mt-6">
                    Thank you for providing more details. We'll use this to better serve your project!
                  </p>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
