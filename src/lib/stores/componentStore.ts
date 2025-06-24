import { writable } from 'svelte/store'

interface ComponentState {
  html: string
  css: string
}

function createComponentStore() {
  const { subscribe, set, update } = writable<ComponentState>({
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