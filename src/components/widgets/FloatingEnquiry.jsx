import { Mail } from 'lucide-react'

// Subtle floating button that takes visitors to the enquiry form (bottom-right).
export default function FloatingEnquiry() {
  return (
    <a
      href="#contact"
      aria-label="Send an enquiry"
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-brand-orange px-4 py-3.5 text-sm font-semibold text-white shadow-glow transition-all hover:bg-brand-orangeDark"
    >
      <Mail className="h-5 w-5" />
      <span className="hidden sm:inline">Enquire Now</span>
    </a>
  )
}
