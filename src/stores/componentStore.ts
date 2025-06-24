import { writable } from 'svelte/store'
import type { ComponentState } from '../types'

function createComponentStore() {
  const { subscribe, set } = writable<ComponentState>({
    html: '',
    css: ''
  })

  return {
    subscribe,
    update: (html: string, css: string) => {
      set({ html, css })
    },
    reset: () => {
      set({ html: '', css: '' })
    }
  }
}

export const componentStore = createComponentStore()