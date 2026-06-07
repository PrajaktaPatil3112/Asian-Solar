import { Sun, Phone, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react'
import { site } from '../../config/site'
import { telLink } from '../../lib/contact'

const quickLinks = [
  { label: 'About Us', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Solar Calculator', href: '#calculator' },
  { label: 'Projects', href: '#projects' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="container-px grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <div className="mb-4 flex items-center gap-2">
            <Sun className="h-8 w-8 text-brand-orange" />
            <span className="text-xl font-extrabold text-white">
              Asian<span className="text-brand-orange">Solar</span>
            </span>
          </div>
          <p className="text-sm leading-relaxed text-slate-400">
            {site.tagline}. Trusted rooftop solar installation for homes and businesses across {site.location}.
          </p>
          <div className="mt-5 flex gap-3">
            <a href={site.social.facebook} aria-label="Facebook" className="rounded-full bg-slate-800 p-2 hover:bg-brand-orange">
              <Facebook className="h-4 w-4" />
            </a>
            <a href={site.social.instagram} aria-label="Instagram" className="rounded-full bg-slate-800 p-2 hover:bg-brand-orange">
              <Instagram className="h-4 w-4" />
            </a>
            <a href={site.social.youtube} aria-label="YouTube" className="rounded-full bg-slate-800 p-2 hover:bg-brand-orange">
              <Youtube className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-slate-400 transition-colors hover:text-brand-orange">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Our Services</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>Residential Solar</li>
            <li>Commercial Solar</li>
            <li>Industrial Solar</li>
            <li>Solar Water Pumps</li>
            <li>Maintenance &amp; AMC</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Get In Touch</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 text-brand-orange" />
              <a href={telLink()} className="hover:text-brand-orange">
                {site.contactPerson} — {site.phoneDisplay}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 text-brand-orange" />
              <a href={`mailto:${site.ownerEmail}`} className="hover:text-brand-orange">
                {site.ownerEmail}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 text-brand-orange" />
              <span>{site.location}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800 py-6 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} {site.name}. All rights reserved.
      </div>
    </footer>
  )
}
