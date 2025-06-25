<script lang="ts">
  import type { Variant } from '../../types'
  import Badge from '../shared/Badge.svelte'
  import VariantPreview from './VariantPreview.svelte'
  
  interface Props {
    variant: Variant
    onViewCode: (variant: Variant) => void
  }
  
  let { variant, onViewCode }: Props = $props()
</script>

<div class="variant-card">
  <div class="variant-header">
    <h4>{variant.name}</h4>
    <Badge type={variant.type}>{variant.type}</Badge>
  </div>
  
  <VariantPreview 
    html={variant.html} 
    css={variant.css} 
    className={variant.className} 
  />
  
  <div class="variant-actions">
    <button 
      class="btn btn-secondary btn-sm"
      onclick={() => onViewCode(variant)}
    >
      📄 Ver código
    </button>
  </div>
</div>

<style>
  .variant-card {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--spacing-lg);
    transition: all 0.2s ease;
    display: flex;
    flex-direction: column;
    height: fit-content;
  }
  
  .variant-card:hover {
    box-shadow: var(--shadow-md);
  }
  
  .variant-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-md);
    flex-shrink: 0;
  }
  
  .variant-header h4 {
    margin: 0;
    font-size: var(--font-size-lg);
    color: var(--color-text);
  }
  
  .variant-actions {
    display: flex;
    justify-content: center;
    margin-top: auto;
    padding-top: var(--spacing-sm);
  }
  
  .btn-sm {
    padding: var(--spacing-xs) var(--spacing-sm);
    font-size: var(--font-size-sm);
    min-height: 32px;
  }
</style>