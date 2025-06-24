import type { Theme } from '../types'

const isBrowser = typeof window !== 'undefined'

export class ThemeService {
  static getInitialTheme(): Theme {
    if (!isBrowser) return 'light'
    
    const storedTheme = localStorage.getItem('theme')
    if (storedTheme === 'light' || storedTheme === 'dark') {
      return storedTheme
    }
    return 'light'
  }

  static save(theme: Theme): void {
    if (isBrowser) {
      localStorage.setItem('theme', theme)
    }
  }

  static apply(theme: Theme): void {
    if (isBrowser) {
      document.documentElement.setAttribute('data-theme', theme)
    }
  }
}