import { motion } from 'framer-motion'

// Consistent eyebrow + title + subtitle heading block for every section.
export default function SectionHeading({ eyebrow, title, subtitle, center = true, inverted = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className={`max-w-2xl ${center ? 'mx-auto text-center' : ''} mb-12`}
    >
      {eyebrow && <span className="eyebrow mb-3 block">{eyebrow}</span>}
      <h2 className={`text-3xl font-bold md:text-4xl ${inverted ? 'text-white' : ''}`}>{title}</h2>
      {subtitle && (
        <p className={`mt-4 text-base ${inverted ? 'text-slate-300' : 'text-ink-soft dark:text-slate-400'}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
