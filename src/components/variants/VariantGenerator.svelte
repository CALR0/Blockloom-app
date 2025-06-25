<script lang="ts">
  import { componentStore, variantStore } from '../../stores'
  import type { Variant } from '../../types'
  import VariantGrid from './VariantGrid.svelte'
  import CodeModal from './CodeModal.svelte'
  
  let showCodeModal = $state(false)
  let selectedVariant = $state<Variant | null>(null)
  
  $effect(() => {
    if ($componentStore.html && $componentStore.css) {
      variantStore.generateVariants($componentStore.html, $componentStore.css)
    }
  })
  
  function openCodeModal(variant: Variant) {
    selectedVariant = variant
    showCodeModal = true
  }
  
  function closeCodeModal() {
    showCodeModal = false
    selectedVariant = null
  }
</script>

<div class="variants-container">
  <div class="variants-header">
    <h2>Variantes generadas</h2>
    <p class="text-muted">Visualiza todas las variantes de tu componente automáticamente generadas.</p>
  </div>
  
  {#if $variantStore.length === 0}
    <div class="empty-state">
      <p>No hay variantes disponibles. Primero crea un componente en el editor.</p>
    </div>
  {:else}
    <VariantGrid variants={$variantStore} onViewCode={openCodeModal} />
  {/if}
</div>

<CodeModal 
  show={showCodeModal} 
  variant={selectedVariant} 
  onClose={closeCodeModal} 
/>

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
</style>