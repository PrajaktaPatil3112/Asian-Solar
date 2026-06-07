// Reusable button that renders as <a> when href is given, else <button>.
const variants = {
  primary:
    'bg-brand-orange hover:bg-brand-orangeDark text-white shadow-glow',
  secondary:
    'bg-brand-blue hover:bg-brand-blueDark text-white',
  outline:
    'border-2 border-white/80 text-white hover:bg-white hover:text-brand-blue',
  ghost:
    'border border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800',
}

const sizes = {
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
}

export default function Button({
  as,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-brand-orange/50 ${variants[variant]} ${sizes[size]} ${className}`

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }
  const Tag = as || 'button'
  return (
    <Tag className={classes} {...props}>
      {children}
    </Tag>
  )
}
