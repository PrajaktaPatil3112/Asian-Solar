/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Refined, restrained palette: deep ink/navy + a single solar-amber
        // accent + muted emerald used sparingly. Built on warm neutrals.
        brand: {
          // amber = the one true accent (CTAs, highlights)
          orange: '#E8930C',
          orangeDark: '#C2740A',
          // ink/navy = headings, dark sections, secondary actions
          blue: '#14253D',
          blueDark: '#0C1828',
          sky: '#1E3A5F',
          // muted emerald = eco accents only
          green: '#0E7A53',
          greenDark: '#0A5C3E',
        },
        ink: {
          DEFAULT: '#101828',
          soft: '#475467',
          muted: '#667085',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Segoe UI', 'sans-serif'],
        display: ['Sora', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(16,24,40,0.04), 0 12px 32px -12px rgba(16,24,40,0.12)',
        card: '0 1px 3px rgba(16,24,40,0.06), 0 1px 2px rgba(16,24,40,0.04)',
        glow: '0 12px 28px -10px rgba(232,147,12,0.5)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
      },
    },
  },
  plugins: [],
}
