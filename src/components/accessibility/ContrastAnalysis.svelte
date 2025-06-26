<script lang="ts">
  import type { ContrastCheck } from '../../types'
  import Badge from '../shared/Badge.svelte'
  
  interface Props {
    contrastChecks: ContrastCheck[]
  }
  
  let { contrastChecks }: Props = $props()
</script>

<div class="contrast-card">
  <h3>Análisis de Contraste</h3>
  <div class="contrast-list">
    {#each contrastChecks as contrast}
      <div class="contrast-item">
        <div class="contrast-preview">
          <div 
            class="contrast-sample"
            style="background-color: {contrast.background}; color: {contrast.foreground};"
          >
            Aa
          </div>
        </div>
        <div class="contrast-info">
          <div class="contrast-ratio">
            Ratio: <strong>{contrast.ratio}</strong>
          </div>
          <div class="contrast-levels">
            <Badge type={contrast.wcagAA ? 'success' : 'error'}>
              AA {contrast.wcagAA ? '✓' : '✗'}
            </Badge>
            <Badge type={contrast.wcagAAA ? 'success' : 'error'}>
              AAA {contrast.wcagAAA ? '✓' : '✗'}
            </Badge>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .contrast-card {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--spacing-lg);
    height: fit-content;
  }
  
  .contrast-card h3 {
    margin: 0 0 var(--spacing-md) 0;
    color: var(--color-text);
    font-size: var(--font-size-lg);
  }
  
  .contrast-list {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }
  
  .contrast-item {
    display: flex;
    gap: var(--spacing-md);
    padding: var(--spacing-sm);
    border-radius: var(--radius-sm);
    background: var(--color-surface-alt);
    align-items: center;
  }
  
  .contrast-preview {
    flex-shrink: 0;
  }
  
  .contrast-sample {
    width: 48px;
    height: 48px;
    border-radius: var(--radius-sm);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: var(--font-size-lg);
    border: 1px solid var(--color-border);
  }
  
  .contrast-info {
    flex: 1;
    min-width: 0;
  }
  
  .contrast-ratio {
    font-size: var(--font-size-sm);
    color: var(--color-text);
    margin-bottom: var(--spacing-xs);
  }
  
  .contrast-levels {
    display: flex;
    gap: var(--spacing-xs);
    flex-wrap: wrap;
  }
</style>