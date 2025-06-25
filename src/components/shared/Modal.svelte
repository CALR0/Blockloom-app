<script lang="ts">
  interface Props {
    show: boolean
    onClose: () => void
    title: string
    subtitle?: string
  }
  
  let { show, onClose, title, subtitle }: Props = $props()
  
  function handleModalClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }
  
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && show) {
      onClose()
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if show}
  <div class="modal-overlay" onclick={handleModalClick}>
    <div class="modal-content">
      <div class="modal-header">
        <div class="modal-title">
          <h3>{title}</h3>
          {#if subtitle}
            <span class="badge badge-{subtitle}">{subtitle}</span>
          {/if}
        </div>
        <button class="modal-close" onclick={onClose} aria-label="Cerrar modal">
          ✕
        </button>
      </div>
      
      <slot name="tabs" />
      <slot name="body" />
      <slot name="footer" />
    </div>
  </div>
{/if}

<style>
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
  
  @media (max-width: 768px) {
    .modal-overlay {
      padding: var(--spacing-sm);
    }
    
    .modal-content {
      max-height: 95vh;
    }
    
    .modal-header {
      padding: var(--spacing-md);
    }
  }
</style>