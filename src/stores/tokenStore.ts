import { writable } from 'svelte/store'
import type { DesignToken } from '../types'
import { TokenExtractorService } from '../services/tokenExtractor'

function createTokenStore() {
  const { subscribe, set } = writable<DesignToken[]>([])

  return {
    subscribe,
    extractTokens: (css: string) => {
      const tokens = TokenExtractorService.extract(css)
      set(tokens)
    },
    getFormattedTokens: (format: string) => {
      let tokens: DesignToken[] = []
      subscribe(value => tokens = value)()
      
      return TokenExtractorService.format(tokens, format)
    }
  }
}

export const tokenStore = createTokenStore()