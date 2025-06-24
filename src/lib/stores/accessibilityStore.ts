import { writable } from 'svelte/store'

interface AccessibilityCheck {
  title: string
  description: string
  status: 'pass' | 'warning' | 'fail'
  suggestion?: string
}

interface ContrastCheck {
  foreground: string
  background: string
  ratio: string
  wcagAA: boolean
  wcagAAA: boolean
}

interface AccessibilityReport {
  overallScore: number
  checks: AccessibilityCheck[]
  contrastChecks: ContrastCheck[]
}

function createAccessibilityStore() {
  const { subscribe, set } = writable<AccessibilityReport | null>(null)

  return {
    subscribe,
    analyze: (html: string, css: string) => {
      const report = analyzeAccessibility(html, css)
      set(report)
    }
  }
}

function analyzeAccessibility(html: string, css: string): AccessibilityReport {
  const checks: AccessibilityCheck[] = []
  const contrastChecks: ContrastCheck[] = []
  
  // Check for semantic HTML
  if (html.includes('<button')) {
    checks.push({
      title: 'Elemento semántico',
      description: 'Usa elementos HTML semánticos apropiados',
      status: 'pass'
    })
  } else if (html.includes('onclick') || html.includes('click')) {
    checks.push({
      title: 'Elemento semántico',
      description: 'Elemento interactivo sin semántica apropiada',
      status: 'warning',
      suggestion: 'Considera usar <button> para elementos clickeables'
    })
  }
  
  // Check for alt text on images
  if (html.includes('<img')) {
    if (html.includes('alt=')) {
      checks.push({
        title: 'Texto alternativo',
        description: 'Las imágenes tienen texto alternativo',
        status: 'pass'
      })
    } else {
      checks.push({
        title: 'Texto alternativo',
        description: 'Las imágenes necesitan texto alternativo',
        status: 'fail',
        suggestion: 'Añade atributos alt descriptivos a todas las imágenes'
      })
    }
  }
  
  // Check for focus styles
  if (css.includes(':focus')) {
    checks.push({
      title: 'Estilos de foco',
      description: 'Elementos focusables tienen estilos de foco visibles',
      status: 'pass'
    })
  } else {
    checks.push({
      title: 'Estilos de foco',
      description: 'Faltan estilos de foco para navegación por teclado',
      status: 'warning',
      suggestion: 'Añade estilos :focus para mejorar la navegación por teclado'
    })
  }
  
  // Check for ARIA attributes
  if (html.includes('aria-') || html.includes('role=')) {
    checks.push({
      title: 'Atributos ARIA',
      description: 'Usa atributos ARIA para mejorar la accesibilidad',
      status: 'pass'
    })
  } else {
    checks.push({
      title: 'Atributos ARIA',
      description: 'Considera añadir atributos ARIA cuando sea necesario',
      status: 'warning',
      suggestion: 'Añade aria-label, aria-describedby u otros atributos ARIA según corresponda'
    })
  }
  
  // Extract colors for contrast analysis
  const colorMatches = css.match(/(color|background-color|background):\s*([^;]+)/g) || []
  const colors = extractColors(colorMatches)
  
  // Analyze contrast ratios
  if (colors.foreground.length > 0 && colors.background.length > 0) {
    colors.foreground.forEach(fg => {
      colors.background.forEach(bg => {
        const ratio = calculateContrastRatio(fg, bg)
        contrastChecks.push({
          foreground: fg,
          background: bg,
          ratio: ratio.toFixed(2),
          wcagAA: ratio >= 4.5,
          wcagAAA: ratio >= 7
        })
      })
    })
  } else {
    // Default contrast check
    contrastChecks.push({
      foreground: '#000000',
      background: '#ffffff',
      ratio: '21.00',
      wcagAA: true,
      wcagAAA: true
    })
  }
  
  // Check minimum touch target size
  if (css.includes('padding') || css.includes('min-height')) {
    checks.push({
      title: 'Tamaño de objetivo táctil',
      description: 'Los elementos interactivos tienen tamaño adecuado',
      status: 'pass'
    })
  } else {
    checks.push({
      title: 'Tamaño de objetivo táctil',
      description: 'Los elementos interactivos podrían ser muy pequeños',
      status: 'warning',
      suggestion: 'Asegúrate de que los elementos interactivos tengan al menos 44x44px'
    })
  }
  
  // Calculate overall score
  const passCount = checks.filter(c => c.status === 'pass').length
  const totalChecks = checks.length
  const overallScore = Math.round((passCount / totalChecks) * 100)
  
  return {
    overallScore,
    checks,
    contrastChecks
  }
}

function extractColors(colorMatches: string[]): { foreground: string[], background: string[] } {
  const foreground: string[] = []
  const background: string[] = []
  
  colorMatches.forEach(match => {
    const colorValue = match.split(':')[1].trim().replace(';', '')
    
    if (match.includes('background')) {
      background.push(colorValue)
    } else if (match.includes('color')) {
      foreground.push(colorValue)
    }
  })
  
  // Add defaults if none found
  if (foreground.length === 0) foreground.push('#000000')
  if (background.length === 0) background.push('#ffffff')
  
  return { foreground, background }
}

function calculateContrastRatio(color1: string, color2: string): number {
  // Simplified contrast ratio calculation
  // In a real implementation, you'd convert colors to RGB and calculate luminance
  const luminance1 = getColorLuminance(color1)
  const luminance2 = getColorLuminance(color2)
  
  const lighter = Math.max(luminance1, luminance2)
  const darker = Math.min(luminance1, luminance2)
  
  return (lighter + 0.05) / (darker + 0.05)
}

function getColorLuminance(color: string): number {
  // Simplified luminance calculation
  // This is a basic implementation - a real one would handle all color formats
  if (color.startsWith('#')) {
    const hex = color.slice(1)
    const r = parseInt(hex.slice(0, 2), 16) / 255
    const g = parseInt(hex.slice(2, 4), 16) / 255
    const b = parseInt(hex.slice(4, 6), 16) / 255
    
    return 0.2126 * r + 0.7152 * g + 0.0722 * b
  }
  
  // Default values for common colors
  const colorMap: { [key: string]: number } = {
    'white': 1,
    '#ffffff': 1,
    '#fff': 1,
    'black': 0,
    '#000000': 0,
    '#000': 0,
    '#2563eb': 0.2,
    '#1d4ed8': 0.18
  }
  
  return colorMap[color.toLowerCase()] || 0.5
}

export const accessibilityStore = createAccessibilityStore()