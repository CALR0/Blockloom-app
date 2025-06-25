<script lang="ts">
  import { componentStore, variantStore, tokenStore, accessibilityStore } from '../../stores'
  import { ExportService } from '../../services/exportService'
  import { ClipboardUtils } from '../../utils/clipboard'
  import { DownloadUtils } from '../../utils/download'
  import type { ExportFormat } from '../../types'
  
  let exportFormat: ExportFormat = $state('html')
  let includeTokens = $state(true)
  let includeVariants = $state(true)
  let includeAccessibility = $state(false)
  
  function generateExport() {
    return ExportService.generateExport(
      $componentStore,
      $variantStore,
      $tokenStore,
      $accessibilityStore,
      exportFormat,
      {
        includeTokens,
        includeVariants,
        includeAccessibility
      }
    )
  }
  
  async function copyExport() {
    try {
      const content = generateExport()
      await ClipboardUtils.copy(content)
    } catch (error) {
      console.error('Failed to copy export:', error)
    }
  }
  
  function downloadExport() {
    const content = generateExport()
    const extension = exportFormat === 'html' ? 'html' : exportFormat === 'json' ? 'json' : 'txt'
    DownloadUtils.downloadText(content, `component-export.${extension}`)
  }
</script>

<div class="export-container">
  <div class="export-header">
    <h2>Exportar componente</h2>
    <p class="text-muted">Descarga tu componente con todas sus variantes y tokens.</p>
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
          Descargar
        </button>
        <button class="btn btn-secondary" onclick={copyExport}>
          Copiar
        </button>
      </div>
    </div>
    
    <div class="export-preview-card">
      <h3>Vista previa</h3>
      <div class="export-preview">
        <pre class="code-block"><code>{generateExport()}</code></pre>
      </div>
    </div>
  </div>
  
  <div class="export-summary">
    <h3>Resumen de exportación</h3>
    <div class="summary-grid">
      <div class="summary-item">
        <div class="summary-label">Componente base</div>
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