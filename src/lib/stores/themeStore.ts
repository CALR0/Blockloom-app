import { writable } from 'svelte/store'

type Theme = 'light' | 'dark'

// Standard browser detection instead of SvelteKit's browser
const isBrowser = typeof window !== 'undefined'

function createThemeStore() {
  // Get initial theme from localStorage with proper validation
  const getInitialTheme = (): Theme => {
    if (!isBrowser) return 'light'
    
    const storedTheme = localStorage.getItem('theme')
    // Validate that the stored theme is actually a valid Theme value
    if (storedTheme === 'light' || storedTheme === 'dark') {
      return storedTheme
    }
    return 'light' // Default fallback
  }
  
  const initialTheme: Theme = getInitialTheme()
  
  const { subscribe, set, update } = writable<Theme>(initialTheme)
  
  // Apply theme to document
  if (isBrowser) {
    applyTheme(initialTheme)
  }
  
  return {
    subscribe,
    toggle: () => {
      update(currentTheme => {
        const newTheme: Theme = currentTheme === 'light' ? 'dark' : 'light'
        
        if (isBrowser) {
          localStorage.setItem('theme', newTheme)
          applyTheme(newTheme)
        }
        
        return newTheme
      })
    },
    set: (theme: Theme) => {
      set(theme)
      if (isBrowser) {
        localStorage.setItem('theme', theme)
        applyTheme(theme)
      }
    }
  }
}

function applyTheme(theme: Theme) {
  if (isBrowser) {
    document.documentElement.setAttribute('data-theme', theme)
  }
}

export const themeStore = createThemeStore()