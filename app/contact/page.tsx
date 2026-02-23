import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Niche Design Studios to discuss your project.',
}

export default function Contact() {
  return (
    <>
      <section className="pt-32 pb-16 px-6 max-w-6xl mx-auto">
        <p className="text-xs tracking-widest uppercase text-stone-400 mb-4">Get In Touch</p>
        <h1 className="font-serif text-4xl md:text-6xl max-w-2xl leading-tight">
          Let's Talk About Your Space
        </h1>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-24 grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Contact info */}
        <div className="space-y-8">
          <div>
            <p className="text-xs tracking-widest uppercase text-stone-400 mb-3">Studio</p>
            <p className="text-stone-700 leading-relaxed">
              Capitol Hill<br />
              Washington, DC
            </p>
          </div>
          <div>
            <p className="text-xs tracking-widest uppercase text-stone-400 mb-3">Email</p>
            <a
              href="mailto:hello@nichedesignstudios.com"
              className="text-stone-700 hover:text-stone-500 transition-colors"
            >
              hello@nichedesignstudios.com
            </a>
          </div>
          <div>
            <p className="text-xs tracking-widest uppercase text-stone-400 mb-3">Hours</p>
            <p className="text-stone-700">Monday – Friday, 9am – 6pm EST</p>
          </div>
          <div className="pt-4 text-sm text-stone-500 leading-relaxed">
            <p>
              We accept a limited number of projects each year to ensure each client receives
              our full attention. We'd love to hear about what you're envisioning.
            </p>
          </div>
        </div>

        {/* Contact form */}
        <form className="space-y-6" action="https://formspree.io/f/placeholder" method="POST">
          <div>
            <label htmlFor="name" className="block text-xs tracking-widest uppercase text-stone-400 mb-2">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full border-b border-stone-300 bg-transparent py-2 text-stone-900 placeholder:text-stone-300 focus:outline-none focus:border-stone-700 transition-colors"
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-xs tracking-widest uppercase text-stone-400 mb-2">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full border-b border-stone-300 bg-transparent py-2 text-stone-900 placeholder:text-stone-300 focus:outline-none focus:border-stone-700 transition-colors"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label htmlFor="project" className="block text-xs tracking-widest uppercase text-stone-400 mb-2">
              Project Type
            </label>
            <select
              id="project"
              name="project"
              className="w-full border-b border-stone-300 bg-transparent py-2 text-stone-900 focus:outline-none focus:border-stone-700 transition-colors"
            >
              <option value="">Select one</option>
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
              <option value="hospitality">Hospitality</option>
              <option value="consulting">Consulting</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="message" className="block text-xs tracking-widest uppercase text-stone-400 mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className="w-full border-b border-stone-300 bg-transparent py-2 text-stone-900 placeholder:text-stone-300 focus:outline-none focus:border-stone-700 transition-colors resize-none"
              placeholder="Tell us about your project..."
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-stone-900 text-stone-50 text-sm tracking-widest uppercase hover:bg-stone-700 transition-colors"
          >
            Send Message
          </button>
        </form>
      </section>
    </>
  )
}
