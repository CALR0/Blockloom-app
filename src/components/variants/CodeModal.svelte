<script lang="ts">
  import type { Variant } from '../../types'
  import { ClipboardUtils } from '../../utils/clipboard'
  import Modal from '../shared/Modal.svelte'
  import CodeBlock from '../shared/CodeBlock.svelte'
  
  interface Props {
    show: boolean
    variant: Variant | null
    onClose: () => void
  }
  
  let { show, variant, onClose }: Props = $props()
  let activeCodeTab = $state<'html' | 'css'>('html')
  
  async function copyCode() {
    if (!variant) return
    
    try {
      const code = activeCodeTab === 'html' ? variant.html : variant.css
      await ClipboardUtils.copy(code)
    } catch (error) {
      console.error('Failed to copy code:', error)
    }
  }
</script>

<Modal 
  {show} 
  {onClose} 
  title="Código - {variant?.name || ''}" 
  subtitle={variant?.type}
>
  <div slot="tabs" class="modal-tabs">
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
  
  <div slot="body" class="modal-body">
    {#if variant}
      <CodeBlock 
        code={activeCodeTab === 'html' ? variant.html : variant.css}
        maxHeight="400px"
      />
    {/if}
  </div>
  
  <div slot="footer" class="modal-footer">
    <button class="btn btn-primary" onclick={copyCode}>
      Copiar {activeCodeTab.toUpperCase()}
    </button>
    <button class="btn btn-secondary" onclick={onClose}>
      Cerrar
    </button>
  </div>
</Modal>

<style>
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
  
  .modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: var(--spacing-sm);
    padding: var(--spacing-lg);
    border-top: 1px solid var(--color-border);
    flex-shrink: 0;
  }
  
  @media (max-width: 768px) {
    .modal-footer {
      padding: var(--spacing-md);
      flex-direction: column;
    }
  }
</style>