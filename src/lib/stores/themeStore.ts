import { writable } from 'svelte/store'

type Theme = 'light' | 'dark'

// Standard browser detection instead of SvelteKit's browser
const isBrowser = typeof window !== 'undefined'

function createThemeStore() {
  // Get initial theme from localStorage or default to 'light'
  const initialTheme: Theme = isBrowser 
    ? (localStorage.getItem('theme') as Theme) || 'light'
    : 'light'
  
  const { subscribe, set } = writable<Theme>(initialTheme)
  
  // Apply theme to document
  if (isBrowser) {
    applyTheme(initialTheme)
  }
  
  return {
    subscribe,
    toggle: () => {
      subscribe(currentTheme => {
        const newTheme: Theme = currentTheme === 'light' ? 'dark' : 'light'
        set(newTheme)
        
        if (isBrowser) {
          localStorage.setItem('theme', newTheme)
          applyTheme(newTheme)
        }
        
        return newTheme
      })()
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