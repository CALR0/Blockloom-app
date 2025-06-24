<script lang="ts">
  import { componentStore } from './stores/componentStore'
  import { variantStore } from './stores/variantStore'
  import { tokenStore } from './stores/tokenStore'
  import { accessibilityStore } from './stores/accessibilityStore'
  
  let exportFormat = $state('html')
  let includeTokens = $state(true)
  let includeVariants = $state(true)
  let includeAccessibility = $state(false)
  
  function generateExport() {
    let exportContent = ''
    
    if (exportFormat === 'html') {
      exportContent = generateHTMLExport()
    } else if (exportFormat === 'json') {
      exportContent = generateJSONExport()
    } else if (exportFormat === 'zip') {
      // For demo purposes, we'll show what would be in the zip
      exportContent = generateZipManifest()
    }
    
    return exportContent
  }
  
  function generateHTMLExport() {
    let html = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Component Export</title>
    <style>
        /* Base Component Styles */
        ${$componentStore.css}
        
        /* Variant Styles */
        ${includeVariants ? $variantStore.map(v => v.css).join('\n\n') : ''}
    </style>
</head>
<body>
    <div class="component-showcase">
        <h1>Component Showcase</h1>
        
        <!-- Base Component -->
        <section>
            <h2>Base Component</h2>
            ${$componentStore.html}
        </section>
        
        ${includeVariants ? `
        <!-- Variants -->
        <section>
            <h2>Variants</h2>
            ${$variantStore.map(v => `
            <div class="variant-demo">
                <h3>${v.name}</h3>
                ${v.html}
            </div>
            `).join('')}
        </section>
        ` : ''}
        
        ${includeTokens ? `
        <!-- Design Tokens -->
        <section>
            <h2>Design Tokens</h2>
            <pre><code>${tokenStore.getFormattedTokens('css')}</code></pre>
        </section>
        ` : ''}
    </div>
</body>
</html>`
    
    return html
  }
  
  function generateJSONExport() {
    const exportData = {
      component: {
        html: $componentStore.html,
        css: $componentStore.css
      },
      variants: includeVariants ? $variantStore : [],
      tokens: includeTokens ? $tokenStore : [],
      accessibility: includeAccessibility ? $accessibilityStore : null,
      metadata: {
        exportedAt: new Date().toISOString(),
        version: '1.0.0'
      }
    }
    
    return JSON.stringify(exportData, null, 2)
  }
  
  function generateZipManifest() {
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
  
  function copyExport() {
    const content = generateExport()
    navigator.clipboard.writeText(content)
  }
  
  function downloadExport() {
    const content = generateExport()
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `component-export.${exportFormat === 'html' ? 'html' : exportFormat === 'json' ? 'json' : 'txt'}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }
</script>

<div class="export-container">
  <div class="export-header">
    <h2>Exportar Componente</h2>
    <p class="text-muted">Descarga tu componente con todas sus variantes y tokens</p>
  </div>
  
  <div class="export-grid">
    <div class="export-options-card">
      <h3>Opciones de Exportación</h3>
      
      <div class="option-group">
        <label class="option-label">
          Formato de exportación:
          <select class="input" bind:value={exportFormat}>
            <option value="html">HTML Completo</option>
            <option value="json">JSON Data</option>
            <option value="zip">Archivo ZIP (Demo)</option>
          </select>
        </label>
      </div>
      
      <div class="option-group">
        <h4>Incluir en la exportación:</h4>
        <label class="checkbox-label">
          <input type="checkbox" bind:checked={includeVariants} />
          Variantes del componente
        </label>
        <label class="checkbox-label">
          <input type="checkbox" bind:checked={includeTokens} />
          Tokens de diseño
        </label>
        <label class="checkbox-label">
          <input type="checkbox" bind:checked={includeAccessibility} />
          Reporte de accesibilidad
        </label>
      </div>
      
      <div class="export-actions">
        <button class="btn btn-primary" onclick={downloadExport}>
          📥 Descargar
        </button>
        <button class="btn btn-secondary" onclick={copyExport}>
          📋 Copiar
        </button>
      </div>
    </div>
    
    <div class="export-preview-card">
      <h3>Vista Previa</h3>
      <div class="export-preview">
        <pre class="code-block"><code>{generateExport()}</code></pre>
      </div>
    </div>
  </div>
  
  <div class="export-summary">
    <h3>Resumen de Exportación</h3>
    <div class="summary-grid">
      <div class="summary-item">
        <div class="summary-label">Componente Base</div>
        <div class="summary-value">✓ Incluido</div>
      </div>
      <div class="summary-item">
        <div class="summary-label">Variantes</div>
        <div class="summary-value">
          {includeVariants ? `✓ ${$variantStore.length} variantes` : '✗ No incluidas'}
        </div>
      </div>
      <div class="summary-item">
        <div class="summary-label">Tokens</div>
        <div class="summary-value">
          {includeTokens ? `✓ ${$tokenStore.length} tokens` : '✗ No incluidos'}
        </div>
      </div>
      <div class="summary-item">
        <div class="summary-label">Accesibilidad</div>
        <div class="summary-value">
          {includeAccessibility ? '✓ Reporte incluido' : '✗ No incluido'}
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .export-container {
    max-width: 1200px;
  }
  
  .export-header {
    margin-bottom: var(--spacing-xl);
  }
  
  .export-header h2 {
    margin: 0 0 var(--spacing-sm) 0;
    color: var(--color-text);
  }
  
  .export-grid {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: var(--spacing-lg);
    margin-bottom: var(--spacing-xl);
  }
  
  .export-options-card,
  .export-preview-card {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--spacing-lg);
  }
  
  .export-options-card h3,
  .export-preview-card h3 {
    margin: 0 0 var(--spacing-md) 0;
    color: var(--color-text);
    font-size: var(--font-size-lg);
  }
  
  .option-group {
    margin-bottom: var(--spacing-lg);
  }
  
  .option-group:last-of-type {
    margin-bottom: var(--spacing-xl);
  }
  
  .option-label {
    display: block;
    margin-bottom: var(--spacing-sm);
    color: var(--color-text);
    font-weight: 500;
  }
  
  .option-group h4 {
    margin: 0 0 var(--spacing-sm) 0;
    color: var(--color-text);
    font-size: var(--font-size-base);
    font-weight: 600;
  }
  
  .checkbox-label {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    margin-bottom: var(--spacing-sm);
    color: var(--color-text);
    cursor: pointer;
  }
  
  .checkbox-label input[type="checkbox"] {
    width: 16px;
    height: 16px;
  }
  
  .export-actions {
    display: flex;
    gap: var(--spacing-sm);
  }
  
  .export-preview {
    max-height: 400px;
    overflow-y: auto;
  }
  
  .export-preview pre {
    margin: 0;
    font-size: var(--font-size-sm);
    line-height: 1.4;
  }
  
  .export-summary {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--spacing-lg);
  }
  
  .export-summary h3 {
    margin: 0 0 var(--spacing-md) 0;
    color: var(--color-text);
    font-size: var(--font-size-lg);
  }
  
  .summary-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--spacing-md);
  }
  
  .summary-item {
    padding: var(--spacing-sm);
    border-radius: var(--radius-sm);
    background: var(--color-surface-alt);
  }
  
  .summary-label {
    font-size: var(--font-size-sm);
    color: var(--color-text-muted);
    margin-bottom: var(--spacing-xs);
  }
  
  .summary-value {
    font-weight: 600;
    color: var(--color-text);
  }
  
  @media (max-width: 768px) {
    .export-grid {
      grid-template-columns: 1fr;
    }
    
    .export-actions {
      flex-direction: column;
    }
  }
</style>