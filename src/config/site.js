// ─────────────────────────────────────────────────────────────
// Single source of truth for business + integration config.
// Edit the values here to update contact details everywhere.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: 'Asian Solar',
  tagline: 'Go Solar, Save Money, Go Green',
  contactPerson: 'Vishal Patil',

  // Phone shown to users (formatted) and the tel digits (with country code, no symbols)
  phoneDisplay: '97641 89583',
  phoneTel: '+919764189583', // used for tel: links

  // Where every website enquiry is sent.
  ownerEmail: 'Vishup072@gmail.com',

  location: 'Maharashtra, India',
  // Google Maps embed src — replace with the exact business location embed.
  mapsEmbedSrc:
    'https://www.google.com/maps?q=Maharashtra,India&output=embed',

  social: {
    facebook: '#',
    instagram: '#',
    youtube: '#',
  },
}

// EmailJS config (free, no backend). Create an account at https://www.emailjs.com
// → add an Email Service + Template, then paste the IDs/key below.
// Template variables expected: from_name, phone, email, location, bill, message, to_email
export const emailjsConfig = {
  serviceId: 'YOUR_EMAILJS_SERVICE_ID',
  templateId: 'YOUR_EMAILJS_TEMPLATE_ID',
  publicKey: 'YOUR_EMAILJS_PUBLIC_KEY',
}

// Company highlight stats (animated counters in the hero)
export const stats = [
  { label: 'Installations', value: 500, suffix: '+' },
  { label: 'Years Panel Warranty', value: 25, suffix: '' },
  { label: 'Cities Served', value: 30, suffix: '+' },
  { label: 'Happy Customers', value: 480, suffix: '+' },
]
