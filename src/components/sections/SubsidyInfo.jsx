import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  BadgePercent,
  HandCoins,
  Sun,
  CheckCircle2,
  ArrowRight,
  Loader2,
  Send,
} from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import Button from '../ui/Button'
import { site } from '../../config/site'
import { sendLead, emailjsConfigured } from '../../lib/emailjs'
import { mailtoLink } from '../../lib/contact'

// PM Surya Ghar Yojana subsidy slabs (as per current scheme).
const subsidyPlans = [
  { kw: 1, subsidy: 30000, ideal: 'Ideal for small homes' },
  { kw: 2, subsidy: 60000, ideal: 'Ideal for medium-sized homes' },
  { kw: 3, subsidy: 78000, ideal: 'Ideal for larger homes' },
]

const capacityOptions = ['1 KW', '2 KW', '3 KW', '5 KW', '10 KW+']

function formatINR(n) {
  return '₹' + n.toLocaleString('en-IN')
}

export default function SubsidyInfo() {
  const [selected, setSelected] = useState(subsidyPlans[2]) // default 3 KW

  return (
    <section id="subsidy" className="section-pad bg-slate-50 dark:bg-slate-900">
      <div className="container-px">
        <SectionHeading
          eyebrow="PM Surya Ghar Yojana"
          title="Government Solar Subsidy"
          subtitle="Reduce your investment with the government's rooftop solar subsidy. We handle the entire application for you."
        />

        {/* Highlight banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 overflow-hidden rounded-3xl bg-gradient-to-r from-brand-orange to-brand-orangeDark px-6 py-8 text-center text-white shadow-glow md:px-12"
        >
          <Sun className="mx-auto mb-3 h-10 w-10" />
          <h3 className="text-2xl font-extrabold md:text-3xl">
            Get Up To ₹78,000 Government Subsidy on Rooftop Solar!
          </h3>
          <p className="mx-auto mt-2 max-w-2xl text-white/90">
            Save on electricity bills and take advantage of government incentives while switching to
            clean, renewable energy.
          </p>
        </motion.div>

        {/* Pricing / subsidy cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {subsidyPlans.map((plan, i) => (
            <motion.div
              key={plan.kw}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className={`card-base relative flex flex-col items-center p-8 text-center ${
                plan.kw === 3 ? 'ring-2 ring-brand-orange' : ''
              }`}
            >
              {plan.kw === 3 && (
                <span className="absolute -top-3 rounded-full bg-brand-orange px-4 py-1 text-xs font-semibold text-white">
                  Most Popular
                </span>
              )}
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-green/10 text-brand-green">
                <Sun className="h-8 w-8" />
              </div>
              <h4 className="mt-4 text-xl font-bold">{plan.kw} KW Solar System</h4>
              <div className="mt-3 text-sm font-medium text-slate-400">Government Subsidy</div>
              <div className="text-3xl font-extrabold text-brand-green">
                {formatINR(plan.subsidy)}
              </div>
              <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">{plan.ideal}</p>
              <Button href="#subsidy-form" variant="ghost" className="mt-6 w-full">
                Enquire Now
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Subsidy calculator + lead form */}
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Calculator */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="card-base p-8"
          >
            <div className="mb-6 flex items-center gap-3">
              <BadgePercent className="h-7 w-7 text-brand-orange" />
              <h3 className="text-xl font-semibold">Subsidy Calculator</h3>
            </div>

            <label className="mb-3 block text-sm font-medium">Select your system size</label>
            <div className="grid grid-cols-3 gap-3">
              {subsidyPlans.map((plan) => (
                <button
                  key={plan.kw}
                  onClick={() => setSelected(plan)}
                  className={`rounded-xl border-2 py-4 text-center font-semibold transition-all ${
                    selected.kw === plan.kw
                      ? 'border-brand-orange bg-brand-orange/10 text-brand-orange'
                      : 'border-slate-200 hover:border-brand-orange/50 dark:border-slate-700'
                  }`}
                >
                  {plan.kw} KW
                </button>
              ))}
            </div>

            <div className="mt-6 rounded-2xl bg-brand-green/10 p-6 text-center">
              <div className="text-sm font-medium text-slate-500 dark:text-slate-300">
                Estimated Government Subsidy
              </div>
              <div className="mt-1 text-4xl font-extrabold text-brand-green">
                {formatINR(selected.subsidy)}
              </div>
              <div className="mt-1 text-xs text-slate-400">on a {selected.kw} KW rooftop system</div>
            </div>

            <Button href="#subsidy-form" className="mt-6 w-full" size="lg">
              Check Your Subsidy Eligibility <ArrowRight className="h-5 w-5" />
            </Button>

            <p className="mt-4 text-xs text-slate-400">
              Note: Subsidy eligibility and amount are subject to current government policies and
              approval. Figures shown are indicative as per the PM Surya Ghar Yojana.
            </p>
          </motion.div>

          {/* Free consultation lead form */}
          <SubsidyForm preferredCapacity={`${selected.kw} KW`} />
        </div>
      </div>
    </section>
  )
}

const emptyForm = { name: '', phone: '', city: '', bill: '', capacity: '' }

function SubsidyForm({ preferredCapacity }) {
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const update = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
    setErrors((er) => ({ ...er, [e.target.name]: '' }))
  }

  const validate = () => {
    const er = {}
    if (!form.name.trim()) er.name = 'Please enter your name'
    if (!/^[0-9+\-\s]{7,15}$/.test(form.phone.trim())) er.phone = 'Enter a valid mobile number'
    if (!form.city.trim()) er.city = 'Please enter your city / village'
    setErrors(er)
    return Object.keys(er).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('sending')

    // Map consultation fields onto the shared lead shape.
    const capacity = form.capacity || preferredCapacity
    const lead = {
      name: form.name,
      phone: form.phone,
      email: '',
      location: form.city,
      bill: form.bill,
      message: `Free solar consultation request — Required capacity: ${capacity}`,
    }

    try {
      if (emailjsConfigured()) {
        await sendLead(lead)
        setStatus('success')
        setForm(emptyForm)
      } else {
        window.location.href = mailtoLink(lead)
        setStatus('success')
        setForm(emptyForm)
      }
    } catch (err) {
      window.location.href = mailtoLink(lead)
      setStatus('error')
    }
  }

  return (
    <motion.div
      id="subsidy-form"
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="card-base p-8"
    >
      <div className="mb-6 flex items-center gap-3">
        <HandCoins className="h-7 w-7 text-brand-green" />
        <h3 className="text-xl font-semibold">Get Free Solar Consultation</h3>
      </div>

      {status === 'success' ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <CheckCircle2 className="h-16 w-16 text-brand-green" />
          <h4 className="mt-4 text-lg font-semibold">Thank you!</h4>
          <p className="mt-2 max-w-xs text-sm text-slate-500 dark:text-slate-400">
            Our solar expert will contact you shortly.
          </p>
          <Button as="button" type="button" onClick={() => setStatus('idle')} className="mt-6">
            Send Another Request
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <Field name="name" label="Name *" value={form.name} onChange={update} error={errors.name} placeholder="Your full name" />
          <Field name="phone" label="Mobile Number *" value={form.phone} onChange={update} error={errors.phone} placeholder="97641 89583" />
          <Field name="city" label="City / Village *" value={form.city} onChange={update} error={errors.city} placeholder="Your city or village" />
          <Field name="bill" label="Monthly Electricity Bill (₹)" type="number" value={form.bill} onChange={update} placeholder="3000" />

          <div>
            <label className="mb-1.5 block text-sm font-medium">Required Solar Capacity</label>
            <select
              name="capacity"
              value={form.capacity}
              onChange={update}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/30 dark:border-slate-700 dark:bg-slate-950"
            >
              <option value="">Select capacity</option>
              {capacityOptions.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {status === 'error' && (
            <p className="text-sm text-red-500">
              We couldn't send automatically — we've opened your email app so you can reach us
              directly.
            </p>
          )}

          <Button as="button" type="submit" size="lg" className="w-full" disabled={status === 'sending'}>
            {status === 'sending' ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" /> Sending...
              </>
            ) : (
              <>
                <Send className="h-5 w-5" /> Submit
              </>
            )}
          </Button>

          <p className="text-center text-xs text-slate-400">
            Or call {site.contactPerson} directly at {site.phoneDisplay} for a free site visit & quote.
          </p>
        </form>
      )}
    </motion.div>
  )
}

function Field({ name, label, value, onChange, error, type = 'text', placeholder }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium">{label}</label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full rounded-xl border bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/30 dark:bg-slate-950 ${
          error
            ? 'border-red-400 focus:border-red-400'
            : 'border-slate-200 focus:border-brand-orange dark:border-slate-700'
        }`}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
}
