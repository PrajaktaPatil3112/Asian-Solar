import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ZoomIn } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import { projects } from '../../data/projects'

const filters = ['All', 'Residential', 'Commercial']

export default function Gallery() {
  const [filter, setFilter] = useState('All')
  const [active, setActive] = useState(null) // selected project for lightbox

  const visible = filter === 'All' ? projects : projects.filter((p) => p.category === filter)

  return (
    <section id="projects" className="section-pad bg-white dark:bg-slate-950">
      <div className="container-px">
        <SectionHeading
          eyebrow="Our Work"
          title="Recent Solar Projects"
          subtitle="A look at some of the rooftop and commercial installations we've delivered across Maharashtra."
        />

        {/* Filters */}
        <div className="no-scrollbar mb-10 flex justify-center gap-3 overflow-x-auto">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`whitespace-nowrap rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                filter === f
                  ? 'bg-brand-orange text-white shadow-glow'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p, i) => (
            <motion.button
              key={p.title}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, delay: (i % 3) * 0.08 }}
              onClick={() => setActive(p)}
              className="group relative overflow-hidden rounded-2xl text-left shadow-soft"
            >
              <img
                src={p.image}
                alt={p.title}
                loading="lazy"
                className="h-60 w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />
              <div className="absolute bottom-0 w-full p-5 text-white">
                <span className="mb-1 inline-block rounded-full bg-brand-orange px-3 py-0.5 text-xs font-semibold text-white">
                  {p.category} · {p.capacity}
                </span>
                <h3 className="text-lg font-semibold !text-white">{p.title}</h3>
              </div>
              <div className="absolute right-4 top-4 rounded-full bg-white/20 p-2 opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                <ZoomIn className="h-5 w-5 text-white" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <button
              aria-label="Close preview"
              className="absolute right-5 top-5 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
              onClick={() => setActive(null)}
            >
              <X className="h-6 w-6" />
            </button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-3xl overflow-hidden rounded-2xl bg-white dark:bg-slate-900"
            >
              <img src={active.image} alt={active.title} className="max-h-[70vh] w-full object-cover" />
              <div className="p-5">
                <h3 className="text-lg font-semibold">{active.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {active.category} installation · {active.capacity}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
