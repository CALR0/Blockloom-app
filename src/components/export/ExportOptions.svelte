<script lang="ts">
  import type { ExportFormat } from '../../types'
  
  interface Props {
    exportFormat: ExportFormat
    includeTokens: boolean
    includeVariants: boolean
    includeAccessibility: boolean
    onFormatChange: (format: ExportFormat) => void
    onOptionsChange: (options: { includeTokens: boolean, includeVariants: boolean, includeAccessibility: boolean }) => void
  }
  
  let { exportFormat, includeTokens, includeVariants, includeAccessibility, onFormatChange, onOptionsChange }: Props = $props()
  
  function handleFormatChange(format: ExportFormat) {
    onFormatChange(format)
  }
  
  function handleOptionChange() {
    onOptionsChange({ includeTokens, includeVariants, includeAccessibility })
  }
</script>

<div class="export-options-card">
  <h3>Opciones de Exportación</h3>
  
  <div class="option-group">
    <label class="option-label">
      Formato de exportación:
      <select class="input" bind:value={exportFormat} onchange={() => handleFormatChange(exportFormat)}>
        <option value="html">HTML Completo</option>
        <option value="json">JSON Data</option>
        <option value="zip">Archivo ZIP (Demo)</option>
      </select>
    </label>
  </div>
  
  <div class="option-group">
    <h4>Incluir en la exportación:</h4>
    <label class="checkbox-label">
      <input type="checkbox" bind:checked={includeVariants} onchange={handleOptionChange} />
      Variantes del componente
    </label>
    <label class="checkbox-label">
      <input type="checkbox" bind:checked={includeTokens} onchange={handleOptionChange} />
      Tokens de diseño
    </label>
    <label class="checkbox-label">
      <input type="checkbox" bind:checked={includeAccessibility} onchange={handleOptionChange} />
      Reporte de accesibilidad
    </label>
  </div>
</div>

<style>
  .export-options-card {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--spacing-lg);
  }
  
  .export-options-card h3 {
    margin: 0 0 var(--spacing-md) 0;
    color: var(--color-text);
    font-size: var(--font-size-lg);
  }
  
  .option-group {
    margin-bottom: var(--spacing-lg);
  }
  
  .option-group:last-of-type {
    margin-bottom: 0;
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
</style>