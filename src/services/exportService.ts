import type { ComponentState, Variant, DesignToken, AccessibilityReport, ExportFormat } from '../types'

export class ExportService {
  static generateExport(
    component: ComponentState,
    variants: Variant[],
    tokens: DesignToken[],
    accessibility: AccessibilityReport | null,
    format: ExportFormat,
    options: {
      includeTokens: boolean
      includeVariants: boolean
      includeAccessibility: boolean
    }
  ): string {
    switch (format) {
      case 'html':
        return this.generateHTMLExport(component, variants, tokens, options)
      case 'json':
        return this.generateJSONExport(component, variants, tokens, accessibility, options)
      case 'zip':
        return this.generateZipManifest()
      default:
        return ''
    }
  }

  private static generateHTMLExport(
    component: ComponentState,
    variants: Variant[],
    tokens: DesignToken[],
    options: any
  ): string {
    return `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Component Export</title>
    <style>
        /* Base Component Styles */
        ${component.css}
        
        /* Variant Styles */
        ${options.includeVariants ? variants.map(v => v.css).join('\n\n') : ''}
    </style>
</head>
<body>
    <div class="component-showcase">
        <h1>Component Showcase</h1>
        
        <!-- Base Component -->
        <section>
            <h2>Base Component</h2>
            ${component.html}
        </section>
        
        ${options.includeVariants ? `
        <!-- Variants -->
        <section>
            <h2>Variants</h2>
            ${variants.map(v => `
            <div class="variant-demo">
                <h3>${v.name}</h3>
                ${v.html}
            </div>
            `).join('')}
        </section>
        ` : ''}
        
        ${options.includeTokens ? `
        <!-- Design Tokens -->
        <section>
            <h2>Design Tokens</h2>
            <pre><code>${this.formatTokensAsCSS(tokens)}</code></pre>
        </section>
        ` : ''}
    </div>
</body>
</html>`
  }

  private static generateJSONExport(
    component: ComponentState,
    variants: Variant[],
    tokens: DesignToken[],
    accessibility: AccessibilityReport | null,
    options: any
  ): string {
    const exportData = {
      component,
      variants: options.includeVariants ? variants : [],
      tokens: options.includeTokens ? tokens : [],
      accessibility: options.includeAccessibility ? accessibility : null,
      metadata: {
        exportedAt: new Date().toISOString(),
        version: '1.0.0'
      }
    }
    
    return JSON.stringify(exportData, null, 2)
  }

  private static generateZipManifest(): string {
    return `Archivo ZIP contendría:

📁 component-export/
├── 📄 index.html (Componente principal)
├── 📄 styles.css (Estilos base)
├── 📄 variants.css (Estilos de variantes)
├── 📄 tokens.json (Tokens de diseño)
├── 📄 tokens.scss (Tokens en SCSS)
├── 📄 accessibility-report.json (Reporte de accesibilidad)
└── 📄 README.md (Documentación)`
  }

  private static formatTokensAsCSS(tokens: DesignToken[]): string {
    return `:root {\n${tokens.map(token => `  --${token.name}: ${token.value};`).join('\n')}\n}`
  }
}