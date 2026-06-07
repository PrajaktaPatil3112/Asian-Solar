import { motion } from 'framer-motion'
import { Phone, ArrowRight, ShieldCheck, BadgeIndianRupee, Users } from 'lucide-react'
import Button from '../ui/Button'
import Counter from '../ui/Counter'
import { site, stats } from '../../config/site'
import { telLink } from '../../lib/contact'

// Your generated brand image in /public.
const heroImage = '/indian_solar_roof_hero.png'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08 } }),
}

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden">
      {/* Full-bleed background image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Rooftop solar panel installation"
          className="h-full w-full object-cover"
          style={{ objectPosition: 'center 65%' }}
        />
        {/* Overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-slate-950/30" />
      </div>

      <div className="container-px relative z-10 pt-28 pb-16 text-white">
        <div className="max-w-2xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur"
          >
            <span className="h-2 w-2 rounded-full bg-brand-orange" />
            Rooftop Solar Installation · {site.location}
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="text-4xl font-extrabold leading-[1.1] text-white md:text-6xl"
          >
            Power your future with{' '}
            <span className="text-brand-orange">solar energy</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-5 max-w-md text-lg text-slate-200"
          >
            Cut your electricity bills and claim your government subsidy with expert rooftop solar.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Button href="#contact" size="lg">
              Get Free Quote <ArrowRight className="h-5 w-5" />
            </Button>
            <Button href={telLink()} variant="outline" size="lg">
              <Phone className="h-5 w-5" /> Call Now
            </Button>
          </motion.div>

          {/* Trust row */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={4}
            className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-200"
          >
            <span className="flex items-center gap-2">
              <BadgeIndianRupee className="h-4 w-4 text-brand-green" /> Subsidy Assistance
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-brand-green" /> 25-Year Warranty
            </span>
            <span className="flex items-center gap-2">
              <Users className="h-4 w-4 text-brand-green" /> Expert Team
            </span>
          </motion.div>
        </div>

        {/* Stats strip on the image */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-14 grid max-w-3xl grid-cols-2 gap-4 rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-md md:grid-cols-4"
        >
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-extrabold text-brand-orange md:text-4xl">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-1 text-xs font-medium text-slate-200 md:text-sm">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
