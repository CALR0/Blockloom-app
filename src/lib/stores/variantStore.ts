import { writable } from 'svelte/store'

interface Variant {
  name: string
  type: 'state' | 'theme' | 'responsive'
  html: string
  css: string
  className: string
}

function createVariantStore() {
  const { subscribe, set } = writable<Variant[]>([])

  return {
    subscribe,
    generateVariants: (html: string, css: string) => {
      const variants: Variant[] = []
      
      // Generate hover variant
      variants.push({
        name: 'Hover',
        type: 'state',
        html: html,
        css: css + '\n\n/* Hover Variant */\n' + generateHoverCSS(css),
        className: 'hover-variant'
      })
      
      // Generate focus variant
      variants.push({
        name: 'Focus',
        type: 'state',
        html: html,
        css: css + '\n\n/* Focus Variant */\n' + generateFocusCSS(css),
        className: 'focus-variant'
      })
      
      // Generate active variant
      variants.push({
        name: 'Active',
        type: 'state',
        html: html,
        css: css + '\n\n/* Active Variant */\n' + generateActiveCSS(css),
        className: 'active-variant'
      })
      
      // Generate disabled variant
      variants.push({
        name: 'Disabled',
        type: 'state',
        html: html.replace(/>/g, ' disabled>'),
        css: css + '\n\n/* Disabled Variant */\n' + generateDisabledCSS(css),
        className: 'disabled-variant'
      })
      
      // Generate dark mode variant
      variants.push({
        name: 'Dark Mode',
        type: 'theme',
        html: `<div data-theme="dark">${html}</div>`,
        css: css + '\n\n/* Dark Mode Variant */\n' + generateDarkModeCSS(css),
        className: 'dark-variant'
      })
      
      // Generate responsive variants
      variants.push({
        name: 'Mobile',
        type: 'responsive',
        html: html,
        css: css + '\n\n/* Mobile Variant */\n@media (max-width: 768px) {\n' + generateMobileCSS(css) + '\n}',
        className: 'mobile-variant'
      })
      
      set(variants)
    }
  }
}

function generateHoverCSS(originalCSS: string): string {
  // Extract class names and generate hover states
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

function generateFocusCSS(originalCSS: string): string {
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

function generateActiveCSS(originalCSS: string): string {
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

function generateDisabledCSS(originalCSS: string): string {
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

function generateDarkModeCSS(originalCSS: string): string {
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

function generateMobileCSS(originalCSS: string): string {
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

export const variantStore = createVariantStore()