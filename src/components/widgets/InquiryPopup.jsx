import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Sun } from 'lucide-react'
import Button from '../ui/Button'

const STORAGE_KEY = 'asiansolar_inquiry_dismissed'

// One-time promotional popup that appears after a short delay.
export default function InquiryPopup() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return
    const timer = setTimeout(() => setOpen(true), 6000)
    return () => clearTimeout(timer)
  }, [])

  const dismiss = () => {
    setOpen(false)
    localStorage.setItem(STORAGE_KEY, '1')
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={dismiss}
        >
          <motion.div
            className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-slate-900"
            initial={{ scale: 0.85, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.85, y: 30 }}
            transition={{ type: 'spring', damping: 22 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={dismiss}
              aria-label="Close"
              className="absolute right-4 top-4 rounded-full p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="bg-gradient-to-br from-brand-orange to-brand-orangeDark px-8 py-7 text-white">
              <Sun className="mb-3 h-10 w-10" />
              <h3 className="text-2xl font-bold">Get a FREE Solar Quote</h3>
              <p className="mt-1 text-white/90">
                Find out how much you can save. Plus government subsidy assistance included!
              </p>
            </div>

            <div className="space-y-3 px-8 py-6 text-center">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Book your free rooftop survey today — no obligation.
              </p>
              <Button href="#contact" onClick={dismiss} className="w-full" size="lg">
                Claim My Free Quote
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
