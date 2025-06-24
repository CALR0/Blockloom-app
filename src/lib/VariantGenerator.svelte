<script lang="ts">
  import { componentStore } from './stores/componentStore'
  import { variantStore } from './stores/variantStore'
  
  $effect(() => {
    if ($componentStore.html && $componentStore.css) {
      variantStore.generateVariants($componentStore.html, $componentStore.css)
    }
  })
</script>

<div class="variants-container">
  <div class="variants-header">
    <h2>Variantes Generadas</h2>
    <p class="text-muted">Visualiza todas las variantes de tu componente automáticamente generadas</p>
  </div>
  
  {#if $variantStore.length === 0}
    <div class="empty-state">
      <p>No hay variantes disponibles. Primero crea un componente en el editor.</p>
    </div>
  {:else}
    <div class="variants-grid">
      {#each $variantStore as variant}
        <div class="variant-card">
          <div class="variant-header">
            <h4>{variant.name}</h4>
            <span class="badge badge-{variant.type}">{variant.type}</span>
          </div>
          
          <div class="variant-preview">
            <style>
              {variant.css}
            </style>
            <div class="variant-content {variant.className}">
              {@html variant.html}
            </div>
          </div>
          
          <div class="variant-code">
            <details>
              <summary>Ver código</summary>
              <div class="code-block">
                <div class="code-section">
                  <strong>HTML:</strong>
                  <pre><code>{variant.html}</code></pre>
                </div>
                <div class="code-section">
                  <strong>CSS:</strong>
                  <pre><code>{variant.css}</code></pre>
                </div>
              </div>
            </details>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .variants-container {
    max-width: 1200px;
  }
  
  .variants-header {
    margin-bottom: var(--spacing-xl);
  }
  
  .variants-header h2 {
    margin: 0 0 var(--spacing-sm) 0;
    color: var(--color-text);
  }
  
  .empty-state {
    text-align: center;
    padding: var(--spacing-2xl);
    color: var(--color-text-muted);
  }
  
  .variants-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--spacing-lg);
  }
  
  .variant-card {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--spacing-lg);
    transition: all 0.2s ease;
  }
  
  .variant-card:hover {
    box-shadow: var(--shadow-md);
  }
  
  .variant-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-md);
  }
  
  .variant-header h4 {
    margin: 0;
    font-size: var(--font-size-lg);
    color: var(--color-text);
  }
  
  .variant-preview {
    background: var(--color-surface-alt);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: var(--spacing-xl);
    margin-bottom: var(--spacing-md);
    min-height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .variant-content.hover-variant:hover,
  .variant-content.focus-variant:focus,
  .variant-content.active-variant:active {
    /* Variants will apply their own styles */
  }
  
  .variant-code details {
    margin-top: var(--spacing-sm);
  }
  
  .variant-code summary {
    cursor: pointer;
    padding: var(--spacing-sm);
    background: var(--color-surface-alt);
    border-radius: var(--radius-sm);
    font-size: var(--font-size-sm);
    font-weight: 500;
  }
  
  .code-section {
    margin-bottom: var(--spacing-md);
  }
  
  .code-section:last-child {
    margin-bottom: 0;
  }
  
  .code-section strong {
    display: block;
    margin-bottom: var(--spacing-xs);
    color: var(--color-text);
  }
  
  .code-section pre {
    margin: 0;
    font-size: var(--font-size-sm);
    line-height: 1.4;
    overflow-x: auto;
  }
  
  .badge-state {
    background: rgb(59 130 246 / 0.1);
    color: #3b82f6;
  }
  
  .badge-theme {
    background: rgb(139 92 246 / 0.1);
    color: #8b5cf6;
  }
  
  .badge-responsive {
    background: rgb(34 197 94 / 0.1);
    color: #22c55e;
  }
</style>