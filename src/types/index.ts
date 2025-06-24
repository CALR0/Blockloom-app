export interface ComponentState {
  html: string
  css: string
}

export interface Variant {
  name: string
  type: 'state' | 'theme' | 'responsive'
  html: string
  css: string
  className: string
}

export interface DesignToken {
  name: string
  value: string
  type: 'color' | 'spacing' | 'font-size' | 'border-radius' | 'shadow' | 'font-weight'
  category: string
}

export interface AccessibilityCheck {
  title: string
  description: string
  status: 'pass' | 'warning' | 'fail'
  suggestion?: string
}

export interface ContrastCheck {
  foreground: string
  background: string
  ratio: string
  wcagAA: boolean
  wcagAAA: boolean
}

export interface AccessibilityReport {
  overallScore: number
  checks: AccessibilityCheck[]
  contrastChecks: ContrastCheck[]
}

export type Theme = 'light' | 'dark'

export type ExportFormat = 'html' | 'json' | 'zip'

export interface TabItem {
  id: string
  label: string
  icon: string
}