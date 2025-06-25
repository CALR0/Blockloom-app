<script lang="ts">
  import { tokenStore } from '../../stores'
  import { ClipboardUtils } from '../../utils/clipboard'
  import CodeBlock from '../shared/CodeBlock.svelte'
  
  interface Props {
    exportFormat: string
    onFormatChange: (format: string) => void
  }
  
  let { exportFormat, onFormatChange }: Props = $props()
  
  async function copyTokens() {
    try {
      const tokens = tokenStore.getFormattedTokens(exportFormat)
      await ClipboardUtils.copy(tokens)
    } catch (error) {
      console.error('Failed to copy tokens:', error)
    }
  }
</script>

<div class="export-card">
  <div class="card-header">
    <h3>Exportar Tokens</h3>
    <div class="format-selector">
      <select class="input" bind:value={exportFormat} onchange={() => onFormatChange(exportFormat)}>
        <option value="json">JSON</option>
        <option value="scss">SCSS</option>
        <option value="css">CSS Variables</option>
        <option value="js">JavaScript</option>
      </select>
    </div>
  </div>
  
  <div class="export-preview">
    <CodeBlock code={tokenStore.getFormattedTokens(exportFormat)} maxHeight="300px" />
  </div>
  
  <div class="export-actions">
    <button class="btn btn-primary" onclick={copyTokens}>
      Copiar Tokens
    </button>
  </div>
</div>

<style>
  .export-card {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--spacing-lg);
  }
  
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-md);
  }
  
  .card-header h3 {
    margin: 0;
    color: var(--color-text);
    font-size: var(--font-size-lg);
  }
  
  .format-selector select {
    min-width: 120px;
  }
  
  .export-preview {
    margin-bottom: var(--spacing-md);
  }
  
  .export-actions {
    display: flex;
    justify-content: center;
    gap: var(--spacing-sm);
  }
</style>