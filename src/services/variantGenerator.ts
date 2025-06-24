import type { Variant } from '../types'

export class VariantGenerator {
  static generateAll(html: string, css: string): Variant[] {
    const variants: Variant[] = []
    
    variants.push(this.generateHover(html, css))
    variants.push(this.generateFocus(html, css))
    variants.push(this.generateActive(html, css))
    variants.push(this.generateDisabled(html, css))
    variants.push(this.generateDarkMode(html, css))
    variants.push(this.generateMobile(html, css))
    
    return variants
  }

  private static generateHover(html: string, css: string): Variant {
    return {
      name: 'Hover',
      type: 'state',
      html,
      css: css + '\n\n/* Hover Variant */\n' + this.generateHoverCSS(css),
      className: 'hover-variant'
    }
  }

  private static generateFocus(html: string, css: string): Variant {
    return {
      name: 'Focus',
      type: 'state',
      html,
      css: css + '\n\n/* Focus Variant */\n' + this.generateFocusCSS(css),
      className: 'focus-variant'
    }
  }

  private static generateActive(html: string, css: string): Variant {
    return {
      name: 'Active',
      type: 'state',
      html,
      css: css + '\n\n/* Active Variant */\n' + this.generateActiveCSS(css),
      className: 'active-variant'
    }
  }

  private static generateDisabled(html: string, css: string): Variant {
    return {
      name: 'Disabled',
      type: 'state',
      html: html.replace(/>/g, ' disabled>'),
      css: css + '\n\n/* Disabled Variant */\n' + this.generateDisabledCSS(css),
      className: 'disabled-variant'
    }
  }

  private static generateDarkMode(html: string, css: string): Variant {
    return {
      name: 'Dark Mode',
      type: 'theme',
      html: `<div data-theme="dark">${html}</div>`,
      css: css + '\n\n/* Dark Mode Variant */\n' + this.generateDarkModeCSS(css),
      className: 'dark-variant'
    }
  }

  private static generateMobile(html: string, css: string): Variant {
    return {
      name: 'Mobile',
      type: 'responsive',
      html,
      css: css + '\n\n/* Mobile Variant */\n@media (max-width: 768px) {\n' + this.generateMobileCSS(css) + '\n}',
      className: 'mobile-variant'
    }
  }

  private static generateHoverCSS(originalCSS: string): string {
    const classMatches = originalCSS.match(/\.[\w-]+/g) || []
    const uniqueClasses = [...new Set(classMatches)]
    
    return uniqueClasses.map(className => {
      return `${className}:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  filter: brightness(1.05);
}`
    }).join('\n\n')
  }

  private static generateFocusCSS(originalCSS: string): string {
    const classMatches = originalCSS.match(/\.[\w-]+/g) || []
    const uniqueClasses = [...new Set(classMatches)]
    
    return uniqueClasses.map(className => {
      return `${className}:focus {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
}`
    }).join('\n\n')
  }

  private static generateActiveCSS(originalCSS: string): string {
    const classMatches = originalCSS.match(/\.[\w-]+/g) || []
    const uniqueClasses = [...new Set(classMatches)]
    
    return uniqueClasses.map(className => {
      return `${className}:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  filter: brightness(0.95);
}`
    }).join('\n\n')
  }

  private static generateDisabledCSS(originalCSS: string): string {
    const classMatches = originalCSS.match(/\.[\w-]+/g) || []
    const uniqueClasses = [...new Set(classMatches)]
    
    return uniqueClasses.map(className => {
      return `${className}:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
  filter: grayscale(0.5);
}`
    }).join('\n\n')
  }

  private static generateDarkModeCSS(originalCSS: string): string {
    const classMatches = originalCSS.match(/\.[\w-]+/g) || []
    const uniqueClasses = [...new Set(classMatches)]
    
    return uniqueClasses.map(className => {
      return `[data-theme="dark"] ${className} {
  background: #1e293b;
  color: #f1f5f9;
  border-color: #334155;
}`
    }).join('\n\n')
  }

  private static generateMobileCSS(originalCSS: string): string {
    const classMatches = originalCSS.match(/\.[\w-]+/g) || []
    const uniqueClasses = [...new Set(classMatches)]
    
    return uniqueClasses.map(className => {
      return `  ${className} {
    font-size: 14px;
    padding: 8px 16px;
    min-height: 44px;
  }`
    }).join('\n\n')
  }
}