import { writable } from 'svelte/store'

interface DesignToken {
  name: string
  value: string
  type: 'color' | 'spacing' | 'font-size' | 'border-radius' | 'shadow' | 'font-weight'
  category: string
}

function createTokenStore() {
  const { subscribe, set } = writable<DesignToken[]>([])

  return {
    subscribe,
    extractTokens: (css: string) => {
      const tokens = extractDesignTokens(css)
      set(tokens)
    },
    getFormattedTokens: (format: string) => {
      let tokens: DesignToken[] = []
      subscribe(value => tokens = value)()
      
      return formatTokens(tokens, format)
    }
  }
}

function extractDesignTokens(css: string): DesignToken[] {
  const tokens: DesignToken[] = []
  
  // Extract colors
  const colorMatches = css.match(/(color|background-color|background|border-color):\s*([^;]+)/g) || []
  colorMatches.forEach((match, index) => {
    const value = match.split(':')[1].trim().replace(';', '')
    if (isValidColor(value)) {
      tokens.push({
        name: `color-${index + 1}`,
        value: value,
        type: 'color',
        category: 'colors'
      })
    }
  })
  
  // Extract spacing (padding, margin)
  const spacingMatches = css.match(/(padding|margin|gap):\s*([^;]+)/g) || []
  spacingMatches.forEach((match, index) => {
    const value = match.split(':')[1].trim().replace(';', '')
    if (isValidSpacing(value)) {
      tokens.push({
        name: `spacing-${index + 1}`,
        value: value,
        type: 'spacing',
        category: 'spacing'
      })
    }
  })
  
  // Extract font sizes
  const fontSizeMatches = css.match(/font-size:\s*([^;]+)/g) || []
  fontSizeMatches.forEach((match, index) => {
    const value = match.split(':')[1].trim().replace(';', '')
    tokens.push({
      name: `font-size-${index + 1}`,
      value: value,
      type: 'font-size',
      category: 'typography'
    })
  })
  
  // Extract border radius
  const borderRadiusMatches = css.match(/border-radius:\s*([^;]+)/g) || []
  borderRadiusMatches.forEach((match, index) => {
    const value = match.split(':')[1].trim().replace(';', '')
    tokens.push({
      name: `border-radius-${index + 1}`,
      value: value,
      type: 'border-radius',
      category: 'borders'
    })
  })
  
  // Extract box shadows
  const shadowMatches = css.match(/box-shadow:\s*([^;]+)/g) || []
  shadowMatches.forEach((match, index) => {
    const value = match.split(':')[1].trim().replace(';', '')
    tokens.push({
      name: `shadow-${index + 1}`,
      value: value,
      type: 'shadow',
      category: 'effects'
    })
  })
  
  // Extract font weights
  const fontWeightMatches = css.match(/font-weight:\s*([^;]+)/g) || []
  fontWeightMatches.forEach((match, index) => {
    const value = match.split(':')[1].trim().replace(';', '')
    tokens.push({
      name: `font-weight-${index + 1}`,
      value: value,
      type: 'font-weight',
      category: 'typography'
    })
  })
  
  // Remove duplicates
  const uniqueTokens = tokens.filter((token, index, self) => 
    index === self.findIndex(t => t.value === token.value && t.type === token.type)
  )
  
  return uniqueTokens
}

function isValidColor(value: string): boolean {
  return /^(#[0-9a-f]{3,6}|rgb\(|rgba\(|hsl\(|hsla\(|\w+)/.test(value.toLowerCase())
}

function isValidSpacing(value: string): boolean {
  return /^\d+(\.\d+)?(px|rem|em|%|vh|vw)/.test(value)
}

function formatTokens(tokens: DesignToken[], format: string): string {
  switch (format) {
    case 'json':
      return JSON.stringify(
        tokens.reduce((acc, token) => {
          acc[token.name] = token.value
          return acc
        }, {} as Record<string, string>),
        null,
        2
      )
    
    case 'scss':
      return tokens.map(token => `$${token.name}: ${token.value};`).join('\n')
    
    case 'css':
      return `:root {\n${tokens.map(token => `  --${token.name}: ${token.value};`).join('\n')}\n}`
    
    case 'js':
      return `export const tokens = {\n${tokens.map(token => `  '${token.name}': '${token.value}',`).join('\n')}\n}`
    
    default:
      return JSON.stringify(tokens, null, 2)
  }
}

export const tokenStore = createTokenStore()