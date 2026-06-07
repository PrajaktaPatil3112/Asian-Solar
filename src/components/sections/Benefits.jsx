import { motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import { benefits } from '../../data/benefits'

export default function Benefits() {
  return (
    <section id="benefits" className="section-pad bg-white dark:bg-slate-950">
      <div className="container-px">
        <SectionHeading
          eyebrow="Why Go Solar"
          title="Benefits of Solar Energy"
          subtitle="Solar isn't just good for the planet — it's a smart financial decision for your home or business."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, i) => {
            const Icon = b.icon
            return (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: (i % 3) * 0.1 }}
                className="flex items-start gap-4 rounded-2xl border border-slate-100 p-6 transition-colors hover:border-brand-green/40 dark:border-slate-800"
              >
                <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold">{b.title}</h3>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{b.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
