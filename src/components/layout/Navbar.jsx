import { useEffect, useState } from 'react'
import { Menu, X, Sun, Moon, Phone } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { site } from '../../config/site'
import { telLink } from '../../lib/contact'
import Button from '../ui/Button'

const links = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Benefits', href: '#benefits' },
  { label: 'Calculator', href: '#calculator' },
  { label: 'Subsidy', href: '#subsidy' },
  { label: 'Projects', href: '#projects' },
  { label: 'FAQ', href: '#faq' },
]

export default function Navbar() {
  const { theme, toggle } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setOpen(false)

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled || open
          ? 'border-slate-200/80 bg-white/85 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/85'
          : 'border-transparent bg-white/60 backdrop-blur-sm dark:bg-slate-950/60'
      }`}
    >
      <nav className="container-px flex h-20 items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2" onClick={closeMenu}>
          <Sun className="h-7 w-7 text-brand-orange" />
          <span className="text-xl font-bold tracking-tight text-ink dark:text-white">
            Asian<span className="text-brand-orange">Solar</span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-6 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-medium text-ink-soft transition-colors hover:text-brand-orange dark:text-slate-300"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label="Toggle dark mode"
            className="btn-ring rounded-full p-2 text-ink-soft transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          <Button href="#contact" size="md" className="hidden sm:inline-flex">
            Get Free Quote
          </Button>

          <a
            href={telLink()}
            aria-label={`Call ${site.phoneDisplay}`}
            className="inline-flex rounded-full bg-brand-green p-3 text-white sm:hidden"
          >
            <Phone className="h-5 w-5" />
          </a>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            className="rounded-full p-2 text-ink dark:text-white lg:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-slate-100 bg-white px-5 pb-6 pt-2 lg:hidden dark:border-slate-800 dark:bg-slate-950">
          <ul className="flex flex-col">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={closeMenu}
                  className="block border-b border-slate-100 py-3 text-ink-soft hover:text-brand-orange dark:border-slate-800 dark:text-slate-200"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <Button href="#contact" onClick={closeMenu} className="mt-5 w-full">
            Get Free Quote
          </Button>
        </div>
      )}
    </header>
  )
}
