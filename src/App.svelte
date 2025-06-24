<script lang="ts">
  import Header from './lib/Header.svelte'
  import ComponentEditor from './lib/ComponentEditor.svelte'
  import VariantGenerator from './lib/VariantGenerator.svelte'
  import AccessibilityAnalyzer from './lib/AccessibilityAnalyzer.svelte'
  import TokenExtractor from './lib/TokenExtractor.svelte'
  import ExportPanel from './lib/ExportPanel.svelte'
  import { componentStore } from './lib/stores/componentStore'
  
  let activeTab = $state('editor')
  
  const tabs = [
    { id: 'editor', label: 'Editor', icon: '✏️' },
    { id: 'variants', label: 'Variantes', icon: '🎨' },
    { id: 'accessibility', label: 'Accesibilidad', icon: '♿' },
    { id: 'tokens', label: 'Tokens', icon: '🎯' },
    { id: 'export', label: 'Exportar', icon: '📦' }
  ]
</script>

<div class="app">
  <Header />
  
  <main class="main-content">
    <div class="container">
      <nav class="navigation">
        <div class="tab-list">
          {#each tabs as tab}
            <button 
              class="tab-button {activeTab === tab.id ? 'active' : ''}"
              onclick={() => activeTab = tab.id}
              aria-pressed={activeTab === tab.id}
            >
              <span class="tab-icon">{tab.icon}</span>
              <span class="tab-label">{tab.label}</span>
            </button>
          {/each}
        </div>
      </nav>
      
      <div class="tab-content">
        {#if activeTab === 'editor'}
          <ComponentEditor />
        {:else if activeTab === 'variants'}
          <VariantGenerator />
        {:else if activeTab === 'accessibility'}
          <AccessibilityAnalyzer />
        {:else if activeTab === 'tokens'}
          <TokenExtractor />
        {:else if activeTab === 'export'}
          <ExportPanel />
        {/if}
      </div>
    </div>
  </main>
</div>

<style>
  .app {
    min-height: 100vh;
    background: var(--color-surface-alt);
    display: flex;
    flex-direction: column;
  }
  
  .main-content {
    flex: 1;
    padding-top: var(--spacing-xl);
  }
  
  .navigation {
    margin-bottom: var(--spacing-xl);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--spacing-sm);
    box-shadow: var(--shadow-sm);
    display: flex;
    justify-content: center;
    max-width: fit-content;
    margin-left: auto;
    margin-right: auto;
  }
  
  .tab-list {
    display: flex;
    gap: var(--spacing-xs);
    align-items: center;
    padding: 0;
    margin: 0;
  }
  
  .tab-button {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-md) var(--spacing-lg);
    border: none;
    background: transparent;
    color: var(--color-text-muted);
    font-weight: 500;
    font-size: var(--font-size-base);
    cursor: pointer;
    border-radius: var(--radius-md);
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    white-space: nowrap;
    position: relative;
    min-height: 48px;
  }
  
  .tab-button:hover:not(.active) {
    background: var(--color-surface-alt);
    color: var(--color-text);
    transform: translateY(-1px);
  }
  
  .tab-button.active {
    background: var(--color-primary);
    color: white;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
    transform: translateY(-1px);
  }
  
  .tab-icon {
    font-size: var(--font-size-lg);
    line-height: 1;
  }
  
  .tab-label {
    font-weight: 600;
  }
  
  .tab-content {
    animation: fadeIn 0.3s ease-out;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @media (max-width: 768px) {
    .main-content {
      padding-top: var(--spacing-lg);
    }
    
    .navigation {
      margin-left: var(--spacing-sm);
      margin-right: var(--spacing-sm);
      max-width: none;
    }
    
    .tab-list {
      justify-content: center;
      flex-wrap: wrap;
    }
    
    .tab-button {
      padding: var(--spacing-sm) var(--spacing-md);
      min-height: 44px;
    }
    
    .tab-label {
      display: none;
    }
    
    .tab-icon {
      font-size: var(--font-size-xl);
    }
  }
  
  @media (max-width: 480px) {
    .navigation {
      margin: 0 var(--spacing-sm) var(--spacing-xl) var(--spacing-sm);
      border-radius: var(--radius-md);
    }
    
    .tab-list {
      gap: var(--spacing-xs);
    }
    
    .tab-button {
      padding: var(--spacing-sm);
      min-width: 48px;
    }
  }
</style>