import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import { testimonials } from '../../data/testimonials'

function Stars({ rating }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`}
        />
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section id="reviews" className="section-pad bg-slate-50 dark:bg-slate-900">
      <div className="container-px">
        <SectionHeading
          eyebrow="Testimonials"
          title="What Our Customers Say"
          subtitle="Hundreds of happy homes and businesses have switched to solar with Asian Solar."
        />

        {/* Google reviews summary */}
        <div className="mx-auto mb-10 flex max-w-md items-center justify-center gap-4 rounded-2xl bg-white p-5 shadow-soft dark:bg-slate-950">
          <div className="text-4xl font-extrabold text-brand-orange">4.9</div>
          <div>
            <Stars rating={5} />
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Based on verified Google Reviews
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: (i % 4) * 0.08 }}
              className="card-base relative flex flex-col p-6"
            >
              <Quote className="absolute right-5 top-5 h-8 w-8 text-brand-orange/15" />
              <Stars rating={t.rating} />
              <p className="mt-4 flex-1 text-sm text-slate-600 dark:text-slate-300">"{t.text}"</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-blue/10 font-bold text-brand-blue">
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-slate-400">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
