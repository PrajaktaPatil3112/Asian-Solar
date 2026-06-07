import { motion } from 'framer-motion'
import { Target, Eye, Award, Users, CheckCircle2 } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import { site } from '../../config/site'

const whyUs = [
  'Experienced, certified installation team',
  'End-to-end government subsidy paperwork handled for you',
  'Premium panels with 25-year performance warranty',
  'Transparent pricing — no hidden costs',
  'Dedicated after-sales service & maintenance',
]

const aboutImage = '/indian_solar_team.png'

export default function About() {
  return (
    <section id="about" className="section-pad bg-white dark:bg-slate-950">
      <div className="container-px">
        <SectionHeading
          eyebrow="About Us"
          title="Your Trusted Solar Energy Partner"
          subtitle={`Asian Solar helps homes and businesses across ${site.location} make a smooth, affordable switch to clean energy.`}
        />

        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <img
              src={aboutImage}
              alt="Solar installation team at work"
              className="h-[360px] w-full rounded-3xl object-cover shadow-soft ring-1 ring-slate-200/60 md:h-[480px] dark:ring-slate-800"
              loading="lazy"
            />
            <div className="absolute -bottom-6 -right-4 hidden rounded-2xl bg-brand-orange px-6 py-4 text-white shadow-glow sm:block">
              <div className="text-3xl font-extrabold">500+</div>
              <div className="text-xs">Installations Completed</div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-slate-600 dark:text-slate-300">
              Founded with a mission to make clean energy accessible to everyone, Asian Solar
              designs and installs rooftop solar systems tailored to your needs and budget. From the
              first free site survey to subsidy approval and long-term support, we make going solar
              simple.
            </p>

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <div className="rounded-2xl bg-brand-blue/5 p-5 dark:bg-slate-900">
                <Target className="mb-2 h-7 w-7 text-brand-blue" />
                <h4 className="font-semibold">Our Mission</h4>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  To accelerate the shift to renewable energy with affordable, high-quality solar
                  solutions.
                </p>
              </div>
              <div className="rounded-2xl bg-brand-green/5 p-5 dark:bg-slate-900">
                <Eye className="mb-2 h-7 w-7 text-brand-green" />
                <h4 className="font-semibold">Our Vision</h4>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  A future where every rooftop generates clean, money-saving power.
                </p>
              </div>
            </div>

            <ul className="mt-7 space-y-3">
              {whyUs.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-200">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-green" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-7 flex gap-6">
              <div className="flex items-center gap-2">
                <Award className="h-6 w-6 text-brand-orange" />
                <span className="text-sm font-medium">Quality Assured</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-6 w-6 text-brand-orange" />
                <span className="text-sm font-medium">Customer First</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
