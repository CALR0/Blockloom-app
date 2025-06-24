import { writable } from 'svelte/store'
import type { AccessibilityReport } from '../types'
import { AccessibilityAnalyzer } from '../services/accessibilityAnalyzer'

function createAccessibilityStore() {
  const { subscribe, set } = writable<AccessibilityReport | null>(null)

  return {
    subscribe,
    analyze: (html: string, css: string) => {
      const report = AccessibilityAnalyzer.analyze(html, css)
      set(report)
    }
  }
}

export const accessibilityStore = createAccessibilityStore()