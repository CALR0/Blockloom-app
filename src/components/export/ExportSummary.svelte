<script lang="ts">
  import type { Variant, DesignToken } from '../../types'
  
  interface Props {
    variants: Variant[]
    tokens: DesignToken[]
    includeTokens: boolean
    includeVariants: boolean
    includeAccessibility: boolean
  }
  
  let { variants, tokens, includeTokens, includeVariants, includeAccessibility }: Props = $props()
</script>

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
        {includeVariants ? `✓ ${variants.length} variantes` : '✗ No incluidas'}
      </div>
    </div>
    <div class="summary-item">
      <div class="summary-label">Tokens</div>
      <div class="summary-value">
        {includeTokens ? `✓ ${tokens.length} tokens` : '✗ No incluidos'}
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

<style>
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
</style>