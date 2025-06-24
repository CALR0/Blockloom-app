import { writable } from 'svelte/store'
import type { Theme } from '../types'
import { ThemeService } from '../services/themeService'

function createThemeStore() {
  const initialTheme = ThemeService.getInitialTheme()
  const { subscribe, set, update } = writable<Theme>(initialTheme)
  
  // Apply initial theme
  ThemeService.apply(initialTheme)
  
  return {
    subscribe,
    toggle: () => {
      update(currentTheme => {
        const newTheme: Theme = currentTheme === 'light' ? 'dark' : 'light'
        ThemeService.save(newTheme)
        ThemeService.apply(newTheme)
        return newTheme
      })
    },
    set: (theme: Theme) => {
      set(theme)
      ThemeService.save(theme)
      ThemeService.apply(theme)
    }
  }
}

export const themeStore = createThemeStore()