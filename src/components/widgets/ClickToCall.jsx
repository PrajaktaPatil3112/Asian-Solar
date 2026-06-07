import { Phone } from 'lucide-react'
import { telLink } from '../../lib/contact'

// Fixed click-to-call button (mainly useful on mobile), bottom-left.
export default function ClickToCall() {
  return (
    <a
      href={telLink()}
      aria-label="Call us now"
      className="fixed bottom-5 left-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-brand-blue text-white shadow-lg transition-transform hover:scale-110 sm:hidden"
    >
      <Phone className="h-6 w-6" />
    </a>
  )
}
