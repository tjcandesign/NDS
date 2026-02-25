import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Project Inquiry',
  description: 'Submit a project inquiry to Niche Design Studios.',
}

const inputClass =
  'w-full border-b border-stone-300 bg-transparent py-2 text-stone-900 placeholder:text-stone-300 focus:outline-none focus:border-stone-700 transition-colors'

const labelClass = 'block text-xs tracking-widest uppercase text-stone-400 mb-2'

const optionalBadge = (
  <span className="ml-2 text-stone-300 normal-case tracking-normal text-xs font-normal">
    optional
  </span>
)

export default function Contact() {
  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 px-6 max-w-6xl mx-auto">
        <p className="text-xs tracking-widest uppercase text-stone-400 mb-4">Get In Touch</p>
        <h1 className="font-serif text-4xl md:text-6xl max-w-2xl leading-tight">
          Project Inquiry
        </h1>
        <p className="mt-6 text-stone-500 max-w-xl leading-relaxed">
          We accept a limited number of projects each year to ensure every client receives
          our full attention. Fill out the form below and we'll be in touch shortly.
        </p>
      </section>

      <section className="max-w-3xl mx-auto px-6 pb-24">
        {/* Contact info strip */}
        <div className="flex flex-wrap gap-x-10 gap-y-3 mb-12 text-sm text-stone-500 border-t border-b border-stone-200 py-5">
          <span>Capitol Hill, Washington DC</span>
          <a href="mailto:hello@nichedesignstudios.com" className="hover:text-stone-900 transition-colors">
            hello@nichedesignstudios.com
          </a>
          <span>Mon – Fri, 9am – 6pm EST</span>
        </div>

        {/* Form — action points to Formspree; replace endpoint before launch */}
        <form
          className="space-y-10"
          action="https://formspree.io/f/placeholder"
          method="POST"
        >
          {/* ── Section 1: About You ─────────────────────────────── */}
          <fieldset className="space-y-6">
            <legend className="text-xs tracking-[0.3em] uppercase text-stone-400 border-b border-stone-200 pb-2 w-full mb-6">
              About You
            </legend>

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
          </fieldset>

          {/* ── Section 2: The Project ────────────────────────────── */}
          <fieldset className="space-y-6">
            <legend className="text-xs tracking-[0.3em] uppercase text-stone-400 border-b border-stone-200 pb-2 w-full mb-6">
              The Project
            </legend>

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

            <div>
              <label htmlFor="project-description" className={labelClass}>
                Please explain your project <span className="text-stone-900">*</span>
              </label>
              <p className="text-xs text-stone-400 mb-2">e.g. New home, Renovation, Addition, Interiors</p>
              <textarea
                id="project-description"
                name="project-description"
                rows={4}
                required
                className={`${inputClass} resize-none`}
              />
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
                {['Realtor', 'Contractor', 'Interior Designer', 'Other'].map((prof) => (
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
              <label htmlFor="schedule" className={labelClass}>
                Do you have a schedule or timetable in mind? <span className="text-stone-900">*</span>
              </label>
              <textarea
                id="schedule"
                name="schedule"
                rows={2}
                required
                className={`${inputClass} resize-none`}
                placeholder="e.g. hoping to start by fall, need to complete before lease ends..."
              />
            </div>
          </fieldset>

          {/* ── Section 3: Your Vision ─────────────────────────────── */}
          <fieldset className="space-y-6">
            <legend className="text-xs tracking-[0.3em] uppercase text-stone-400 border-b border-stone-200 pb-2 w-full mb-6">
              Your Vision
            </legend>

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
          </fieldset>

          <button
            type="submit"
            className="w-full py-4 bg-stone-900 text-stone-50 text-sm tracking-widest uppercase hover:bg-stone-700 transition-colors"
          >
            Submit Inquiry
          </button>

          <p className="text-xs text-stone-400 text-center">
            Fields marked <span className="text-stone-900">*</span> are required.
            We'll respond within 2–3 business days.
          </p>
        </form>
      </section>
    </>
  )
}
