<script lang="ts">
  import { componentStore, tokenStore } from '../../stores'
  import TokensList from './TokensList.svelte'
  import ExportPanel from './ExportPanel.svelte'
  
  let exportFormat = $state('json')
  
  $effect(() => {
    if ($componentStore.html && $componentStore.css) {
      tokenStore.extractTokens($componentStore.css)
    }
  })
  
  function handleFormatChange(format: string) {
    exportFormat = format
  }
</script>

<div class="tokens-container">
  <div class="tokens-header">
    <h2>Tokens de Diseño</h2>
    <p class="text-muted">Propiedades extraídas automáticamente de tu componente.</p>
  </div>
  
  {#if $tokenStore.length === 0}
    <div class="empty-state">
      <p>No hay tokens disponibles. Primero crea un componente en el editor.</p>
    </div>
  {:else}
    <div class="tokens-grid">
      <TokensList tokens={$tokenStore} />
      <ExportPanel {exportFormat} onFormatChange={handleFormatChange} />
    </div>
  {/if}
</div>

<style>
  .tokens-container {
    max-width: 1200px;
  }
  
  .tokens-header {
    margin-bottom: var(--spacing-xl);
  }
  
  .tokens-header h2 {
    margin: 0 0 var(--spacing-sm) 0;
    color: var(--color-text);
  }
  
  .empty-state {
    text-align: center;
    padding: var(--spacing-2xl);
    color: var(--color-text-muted);
  }
  
  .tokens-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-lg);
  }
  
  @media (max-width: 768px) {
    .tokens-grid {
      grid-template-columns: 1fr;
    }
  }
</style>