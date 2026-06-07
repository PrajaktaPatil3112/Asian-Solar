import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Send, CheckCircle2, Loader2, User } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import Button from '../ui/Button'
import { site } from '../../config/site'
import { sendLead, emailjsConfigured } from '../../lib/emailjs'
import { telLink, mailtoLink } from '../../lib/contact'

const empty = { name: '', phone: '', email: '', location: '', bill: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(empty)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const update = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
    setErrors((er) => ({ ...er, [e.target.name]: '' }))
  }

  const validate = () => {
    const er = {}
    if (!form.name.trim()) er.name = 'Please enter your name'
    if (!/^[0-9+\-\s]{7,15}$/.test(form.phone.trim())) er.phone = 'Enter a valid phone number'
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      er.email = 'Enter a valid email'
    if (!form.location.trim()) er.location = 'Please enter your location'
    setErrors(er)
    return Object.keys(er).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setStatus('sending')
    try {
      if (emailjsConfigured()) {
        // Sends silently to the owner's inbox (Vishup072@gmail.com).
        await sendLead(form)
        setStatus('success')
        setForm(empty)
      } else {
        // No EmailJS keys yet → open the visitor's email client, pre-addressed
        // to the owner with all enquiry details filled in.
        window.location.href = mailtoLink(form)
        setStatus('success')
        setForm(empty)
      }
    } catch (err) {
      // Email send failed → fall back to the visitor's mail client.
      window.location.href = mailtoLink(form)
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="section-pad bg-slate-50 dark:bg-slate-900">
      <div className="container-px">
        <SectionHeading
          eyebrow="Contact Us"
          title="Get Your Free Solar Quote"
          subtitle="Fill in the form and our team will get back to you, or reach out directly by call or email."
        />

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <div className="card-base h-full p-7">
              <h3 className="text-xl font-semibold">Talk to our solar expert</h3>
              <div className="mt-6 space-y-5">
                <InfoRow icon={User} label="Contact Person" value={site.contactPerson} />
                <InfoRow
                  icon={Phone}
                  label="Phone"
                  value={site.phoneDisplay}
                  href={telLink()}
                />
                <InfoRow
                  icon={Mail}
                  label="Email"
                  value={site.ownerEmail}
                  href={`mailto:${site.ownerEmail}`}
                />
                <InfoRow icon={MapPin} label="Location" value={site.location} />
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button href={telLink()} variant="secondary" className="flex-1">
                  <Phone className="h-5 w-5" /> Call Now
                </Button>
                <Button href={`mailto:${site.ownerEmail}`} className="flex-1">
                  <Mail className="h-5 w-5" /> Email Us
                </Button>
              </div>

              {/* Google Maps */}
              <div className="mt-7 overflow-hidden rounded-2xl">
                <iframe
                  title="Asian Solar location"
                  src={site.mapsEmbedSrc}
                  width="100%"
                  height="220"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="card-base p-7" noValidate>
              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <CheckCircle2 className="h-16 w-16 text-brand-green" />
                  <h3 className="mt-4 text-xl font-semibold">Thank you!</h3>
                  <p className="mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400">
                    Your request has been received. {site.contactPerson} will contact you shortly with
                    your free solar quote.
                  </p>
                  <Button as="button" type="button" onClick={() => setStatus('idle')} className="mt-6">
                    Send Another Enquiry
                  </Button>
                </div>
              ) : (
                <>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field name="name" label="Full Name *" value={form.name} onChange={update} error={errors.name} placeholder="Your name" />
                    <Field name="phone" label="Phone Number *" value={form.phone} onChange={update} error={errors.phone} placeholder="97641 89583" />
                    <Field name="email" label="Email" type="email" value={form.email} onChange={update} error={errors.email} placeholder="you@example.com" />
                    <Field name="location" label="Location *" value={form.location} onChange={update} error={errors.location} placeholder="City / Area" />
                    <Field name="bill" label="Monthly Electricity Bill (₹)" type="number" value={form.bill} onChange={update} placeholder="3000" />
                  </div>

                  <div className="mt-5">
                    <label className="mb-1.5 block text-sm font-medium">Message</label>
                    <textarea
                      name="message"
                      rows="4"
                      value={form.message}
                      onChange={update}
                      placeholder="Tell us about your property or any questions..."
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/30 dark:border-slate-700 dark:bg-slate-950"
                    />
                  </div>

                  {status === 'error' && (
                    <p className="mt-4 text-sm text-red-500">
                      We couldn't send your request automatically — we've opened your email app so
                      you can reach us directly.
                    </p>
                  )}

                  <Button
                    as="button"
                    type="submit"
                    size="lg"
                    className="mt-6 w-full"
                    disabled={status === 'sending'}
                  >
                    {status === 'sending' ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" /> Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" /> Get Free Quote
                      </>
                    )}
                  </Button>
                </>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
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
        className={`w-full rounded-xl border bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/30 dark:bg-slate-950 ${error
            ? 'border-red-400 focus:border-red-400'
            : 'border-slate-200 focus:border-brand-orange dark:border-slate-700'
          }`}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
}

function InfoRow({ icon: Icon, label, value, href }) {
  const content = (
    <div className="flex items-start gap-3">
      <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-orange/10 text-brand-orange">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="text-xs text-slate-400">{label}</div>
        <div className="font-medium">{value}</div>
      </div>
    </div>
  )
  return href ? (
    <a href={href} className="block transition-colors hover:text-brand-orange">
      {content}
    </a>
  ) : (
    content
  )
}
