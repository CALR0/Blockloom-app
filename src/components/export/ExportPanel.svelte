<script lang="ts">
  import { componentStore, variantStore, tokenStore, accessibilityStore } from '../../stores'
  import { ExportService } from '../../services/exportService'
  import { ClipboardUtils } from '../../utils/clipboard'
  import { DownloadUtils } from '../../utils/download'
  import type { ExportFormat } from '../../types'
  import ExportOptions from './ExportOptions.svelte'
  import ExportPreview from './ExportPreview.svelte'
  import ExportSummary from './ExportSummary.svelte'
  
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
  
  function handleFormatChange(format: ExportFormat) {
    exportFormat = format
  }
  
  function handleOptionsChange(options: { includeTokens: boolean, includeVariants: boolean, includeAccessibility: boolean }) {
    includeTokens = options.includeTokens
    includeVariants = options.includeVariants
    includeAccessibility = options.includeAccessibility
  }
</script>

<div class="export-container">
  <div class="export-header">
    <h2>Exportar componente</h2>
    <p class="text-muted">Descarga tu componente con todas sus variantes y tokens.</p>
  </div>
  
  <div class="export-grid">
    <div class="export-left">
      <ExportOptions 
        {exportFormat}
        {includeTokens}
        {includeVariants}
        {includeAccessibility}
        onFormatChange={handleFormatChange}
        onOptionsChange={handleOptionsChange}
      />
      
      <div class="export-actions">
        <button class="btn btn-primary" onclick={downloadExport}>
          Descargar
        </button>
        <button class="btn btn-secondary" onclick={copyExport}>
          Copiar
        </button>
      </div>
    </div>
    
    <ExportPreview content={generateExport()} />
  </div>
  
  <ExportSummary 
    variants={$variantStore}
    tokens={$tokenStore}
    {includeTokens}
    {includeVariants}
    {includeAccessibility}
  />
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
  
  .export-left {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
  }
  
  .export-actions {
    display: flex;
    gap: var(--spacing-sm);
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