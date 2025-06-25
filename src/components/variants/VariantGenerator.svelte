<script lang="ts">
  import { componentStore, variantStore } from '../../stores'
  import { ClipboardUtils } from '../../utils/clipboard'
  
  let showCodeModal = $state(false)
  let selectedVariant = $state<any>(null)
  let activeCodeTab = $state<'html' | 'css'>('html')
  
  $effect(() => {
    if ($componentStore.html && $componentStore.css) {
      variantStore.generateVariants($componentStore.html, $componentStore.css)
    }
  })
  
  function openCodeModal(variant: any) {
    selectedVariant = variant
    showCodeModal = true
    activeCodeTab = 'html'
  }
  
  function closeCodeModal() {
    showCodeModal = false
    selectedVariant = null
  }
  
  async function copyCode() {
    if (!selectedVariant) return
    
    try {
      const code = activeCodeTab === 'html' ? selectedVariant.html : selectedVariant.css
      await ClipboardUtils.copy(code)
    } catch (error) {
      console.error('Failed to copy code:', error)
    }
  }
  
  function handleModalClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      closeCodeModal()
    }
  }
  
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && showCodeModal) {
      closeCodeModal()
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

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
          
          <div class="variant-actions">
            <button 
              class="btn btn-secondary btn-sm"
              onclick={() => openCodeModal(variant)}
            >
              📄 Ver código
            </button>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>

<!-- Code Modal -->
{#if showCodeModal && selectedVariant}
  <div class="modal-overlay" onclick={handleModalClick}>
    <div class="modal-content">
      <div class="modal-header">
        <div class="modal-title">
          <h3>Código - {selectedVariant.name}</h3>
          <span class="badge badge-{selectedVariant.type}">{selectedVariant.type}</span>
        </div>
        <button class="modal-close" onclick={closeCodeModal} aria-label="Cerrar modal">
          ✕
        </button>
      </div>
      
      <div class="modal-tabs">
        <button 
          class="tab-button {activeCodeTab === 'html' ? 'active' : ''}"
          onclick={() => activeCodeTab = 'html'}
        >
          HTML
        </button>
        <button 
          class="tab-button {activeCodeTab === 'css' ? 'active' : ''}"
          onclick={() => activeCodeTab = 'css'}
        >
          CSS
        </button>
      </div>
      
      <div class="modal-body">
        <div class="code-container">
          <pre class="code-display"><code>{activeCodeTab === 'html' ? selectedVariant.html : selectedVariant.css}</code></pre>
        </div>
      </div>
      
      <div class="modal-footer">
        <button class="btn btn-primary" onclick={copyCode}>
          Copiar {activeCodeTab.toUpperCase()}
        </button>
        <button class="btn btn-secondary" onclick={closeCodeModal}>
          Cerrar
        </button>
      </div>
    </div>
  </div>
{/if}

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
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: var(--spacing-lg);
  }
  
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
  
  .variant-preview {
    background: var(--color-surface-alt);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: var(--spacing-lg);
    margin-bottom: var(--spacing-md);
    min-height: 120px;
    max-height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
    flex-shrink: 0;
  }
  
  .variant-content {
    max-width: 100%;
    max-height: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: var(--spacing-sm);
    text-align: center;
  }
  
  /* Ensure content inside variants doesn't overflow */
  .variant-content :global(*) {
    max-width: 100% !important;
    word-wrap: break-word !important;
    overflow-wrap: break-word !important;
    hyphens: auto !important;
  }
  
  /* Handle images specifically */
  .variant-content :global(img) {
    max-width: 100% !important;
    max-height: 200px !important;
    height: auto !important;
    object-fit: contain !important;
  }
  
  /* Handle text content */
  .variant-content :global(p),
  .variant-content :global(div),
  .variant-content :global(span) {
    font-size: clamp(12px, 2vw, 14px) !important;
    line-height: 1.4 !important;
    max-width: 100% !important;
  }
  
  /* Handle long text specifically */
  .variant-content :global(*) {
    text-overflow: ellipsis !important;
    white-space: nowrap !important;
    overflow: hidden !important;
  }
  
  /* Allow wrapping for certain elements */
  .variant-content :global(p),
  .variant-content :global(.description),
  .variant-content :global(.text) {
    white-space: normal !important;
    display: -webkit-box !important;
    -webkit-line-clamp: 3 !important;
    -webkit-box-orient: vertical !important;
    overflow: hidden !important;
  }
  
  .variant-content.hover-variant:hover,
  .variant-content.focus-variant:focus,
  .variant-content.active-variant:active {
    /* Variants will apply their own styles */
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
  
  /* Modal Styles */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: var(--spacing-lg);
    animation: fadeIn 0.2s ease-out;
  }
  
  .modal-content {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
    width: 100%;
    max-width: 800px;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    animation: slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-lg);
    border-bottom: 1px solid var(--color-border);
    flex-shrink: 0;
  }
  
  .modal-title {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
  }
  
  .modal-title h3 {
    margin: 0;
    color: var(--color-text);
    font-size: var(--font-size-xl);
  }
  
  .modal-close {
    background: none;
    border: none;
    font-size: var(--font-size-xl);
    color: var(--color-text-muted);
    cursor: pointer;
    padding: var(--spacing-xs);
    border-radius: var(--radius-sm);
    transition: all 0.2s ease;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .modal-close:hover {
    background: var(--color-surface-alt);
    color: var(--color-text);
  }
  
  .modal-tabs {
    display: flex;
    border-bottom: 1px solid var(--color-border);
    flex-shrink: 0;
  }
  
  .tab-button {
    background: none;
    border: none;
    padding: var(--spacing-md) var(--spacing-lg);
    font-size: var(--font-size-base);
    font-weight: 500;
    color: var(--color-text-muted);
    cursor: pointer;
    transition: all 0.2s ease;
    border-bottom: 2px solid transparent;
  }
  
  .tab-button:hover {
    color: var(--color-text);
    background: var(--color-surface-alt);
  }
  
  .tab-button.active {
    color: var(--color-primary);
    border-bottom-color: var(--color-primary);
    background: var(--color-surface-alt);
  }
  
  .modal-body {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  
  .code-container {
    flex: 1;
    overflow: auto;
    padding: var(--spacing-lg);
  }
  
  .code-display {
    margin: 0;
    background: var(--color-surface-alt);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: var(--spacing-lg);
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: 14px;
    line-height: 1.5;
    color: var(--color-text);
    white-space: pre-wrap;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }
  
  .modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: var(--spacing-sm);
    padding: var(--spacing-lg);
    border-top: 1px solid var(--color-border);
    flex-shrink: 0;
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
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-20px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    .variants-grid {
      grid-template-columns: 1fr;
    }
    
    .variant-preview {
      min-height: 100px;
      max-height: 250px;
      padding: var(--spacing-md);
    }
    
    .variant-content :global(*) {
      font-size: 12px !important;
    }
    
    .modal-overlay {
      padding: var(--spacing-sm);
    }
    
    .modal-content {
      max-height: 95vh;
    }
    
    .modal-header,
    .modal-footer {
      padding: var(--spacing-md);
    }
    
    .code-container {
      padding: var(--spacing-md);
    }
    
    .modal-footer {
      flex-direction: column;
    }
  }
  
  @media (max-width: 480px) {
    .variant-preview {
      min-height: 80px;
      max-height: 200px;
      padding: var(--spacing-sm);
    }
    
    .variant-content :global(p),
    .variant-content :global(.description),
    .variant-content :global(.text) {
      -webkit-line-clamp: 2 !important;
    }
    
    .modal-title h3 {
      font-size: var(--font-size-lg);
    }
    
    .code-display {
      font-size: 12px;
      padding: var(--spacing-md);
    }
  }
</style>