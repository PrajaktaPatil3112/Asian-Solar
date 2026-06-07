import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext({ theme: 'light', toggle: () => {} })

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light'
    // Default to the clean white theme. Only use dark if the user explicitly
    // chose it before (we intentionally ignore the OS dark-mode preference).
    return localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  return useContext(ThemeContext)
}
