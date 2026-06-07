import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import { faqs } from '../../data/faqs'

export default function FAQ() {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="section-pad bg-white dark:bg-slate-950">
      <div className="container-px">
        <SectionHeading
          eyebrow="FAQ"
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about going solar with Asian Solar."
        />

        <div className="mx-auto max-w-3xl space-y-4">
          {faqs.map((item, i) => {
            const isOpen = open === i
            return (
              <div
                key={item.q}
                className="overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-800"
              >
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold">{item.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-brand-orange transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="px-6 pb-5 text-sm text-slate-500 dark:text-slate-400">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
