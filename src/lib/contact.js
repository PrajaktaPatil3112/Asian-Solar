import { site } from '../config/site'

// tel: link from the configured phone number.
export function telLink() {
  return `tel:${site.phoneTel}`
}

// Build a readable enquiry body from lead fields.
function leadBody(form) {
  const lines = [
    'New solar enquiry from the website:',
    '',
    `Name: ${form.name || '-'}`,
    `Phone: ${form.phone || '-'}`,
    form.email ? `Email: ${form.email}` : null,
    `Location: ${form.location || '-'}`,
    `Monthly bill: ₹${form.bill || '-'}`,
    `Message: ${form.message || '-'}`,
  ].filter(Boolean)
  return lines.join('\n')
}

// mailto: link as the no-config fallback — opens the visitor's email client
// with the enquiry pre-filled and addressed to the owner's inbox.
export function mailtoLink(form) {
  const subject = encodeURIComponent(`Solar Enquiry — ${form.name || 'Website'}`)
  const body = encodeURIComponent(leadBody(form))
  return `mailto:${site.ownerEmail}?subject=${subject}&body=${body}`
}
