import type { DesignToken } from '../types'

export class TokenExtractorService {
  static extract(css: string): DesignToken[] {
    const tokens: DesignToken[] = []
    
    this.extractColors(css, tokens)
    this.extractSpacing(css, tokens)
    this.extractFontSizes(css, tokens)
    this.extractBorderRadius(css, tokens)
    this.extractShadows(css, tokens)
    this.extractFontWeights(css, tokens)
    
    return this.removeDuplicates(tokens)
  }

  static format(tokens: DesignToken[], format: string): string {
    switch (format) {
      case 'json':
        return this.formatAsJSON(tokens)
      case 'scss':
        return this.formatAsSCSS(tokens)
      case 'css':
        return this.formatAsCSS(tokens)
      case 'js':
        return this.formatAsJS(tokens)
      default:
        return JSON.stringify(tokens, null, 2)
    }
  }

  private static extractColors(css: string, tokens: DesignToken[]): void {
    const colorMatches = css.match(/(color|background-color|background|border-color):\s*([^;]+)/g) || []
    colorMatches.forEach((match, index) => {
      const value = match.split(':')[1].trim().replace(';', '')
      if (this.isValidColor(value)) {
        tokens.push({
          name: `color-${index + 1}`,
          value: value,
          type: 'color',
          category: 'colors'
        })
      }
    })
  }

  private static extractSpacing(css: string, tokens: DesignToken[]): void {
    const spacingMatches = css.match(/(padding|margin|gap):\s*([^;]+)/g) || []
    spacingMatches.forEach((match, index) => {
      const value = match.split(':')[1].trim().replace(';', '')
      if (this.isValidSpacing(value)) {
        tokens.push({
          name: `spacing-${index + 1}`,
          value: value,
          type: 'spacing',
          category: 'spacing'
        })
      }
    })
  }

  private static extractFontSizes(css: string, tokens: DesignToken[]): void {
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
  }

  private static extractBorderRadius(css: string, tokens: DesignToken[]): void {
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
  }

  private static extractShadows(css: string, tokens: DesignToken[]): void {
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
  }

  private static extractFontWeights(css: string, tokens: DesignToken[]): void {
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
  }

  private static removeDuplicates(tokens: DesignToken[]): DesignToken[] {
    return tokens.filter((token, index, self) => 
      index === self.findIndex(t => t.value === token.value && t.type === token.type)
    )
  }

  private static isValidColor(value: string): boolean {
    return /^(#[0-9a-f]{3,6}|rgb\(|rgba\(|hsl\(|hsla\(|\w+)/.test(value.toLowerCase())
  }

  private static isValidSpacing(value: string): boolean {
    return /^\d+(\.\d+)?(px|rem|em|%|vh|vw)/.test(value)
  }

  private static formatAsJSON(tokens: DesignToken[]): string {
    return JSON.stringify(
      tokens.reduce((acc, token) => {
        acc[token.name] = token.value
        return acc
      }, {} as Record<string, string>),
      null,
      2
    )
  }

  private static formatAsSCSS(tokens: DesignToken[]): string {
    return tokens.map(token => `$${token.name}: ${token.value};`).join('\n')
  }

  private static formatAsCSS(tokens: DesignToken[]): string {
    return `:root {\n${tokens.map(token => `  --${token.name}: ${token.value};`).join('\n')}\n}`
  }

  private static formatAsJS(tokens: DesignToken[]): string {
    return `export const tokens = {\n${tokens.map(token => `  '${token.name}': '${token.value}',`).join('\n')}\n}`
  }
}