import { writable } from 'svelte/store'
import type { Variant } from '../types'
import { VariantGenerator } from '../services/variantGenerator'

function createVariantStore() {
  const { subscribe, set } = writable<Variant[]>([])

  return {
    subscribe,
    generateVariants: (html: string, css: string) => {
      const variants = VariantGenerator.generateAll(html, css)
      set(variants)
    }
  }
}

export const variantStore = createVariantStore()