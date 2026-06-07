import emailjs from '@emailjs/browser'
import { emailjsConfig, site } from '../config/site'

// Returns true once real EmailJS credentials have been filled in.
export function emailjsConfigured() {
  return (
    emailjsConfig.serviceId &&
    !emailjsConfig.serviceId.startsWith('YOUR_') &&
    emailjsConfig.templateId &&
    !emailjsConfig.templateId.startsWith('YOUR_') &&
    emailjsConfig.publicKey &&
    !emailjsConfig.publicKey.startsWith('YOUR_')
  )
}

// Send a lead to the owner's inbox via EmailJS (no backend required).
// `form` = { name, phone, email, location, bill, message }
export async function sendLead(form) {
  if (!emailjsConfigured()) {
    throw new Error('EmailJS not configured')
  }

  const templateParams = {
    from_name: form.name,
    phone: form.phone,
    email: form.email,
    location: form.location,
    bill: form.bill,
    message: form.message,
    to_email: site.ownerEmail,
  }

  return emailjs.send(
    emailjsConfig.serviceId,
    emailjsConfig.templateId,
    templateParams,
    { publicKey: emailjsConfig.publicKey },
  )
}
