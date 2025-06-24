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
    { id: 'editor', label: 'Editor', icon: 'edit' },
    { id: 'variants', label: 'Variantes', icon: 'layers' },
    { id: 'accessibility', label: 'Accesibilidad', icon: 'shield-check' },
    { id: 'tokens', label: 'Tokens', icon: 'palette' },
    { id: 'export', label: 'Exportar', icon: 'download' }
  ]
</script>

<div class="app">
  <Header />
  
  <main class="container">
    <div class="tabs mb-lg">
      <div class="tab-list">
        {#each tabs as tab}
          <button 
            class="tab-button {activeTab === tab.id ? 'active' : ''}"
            onclick={() => activeTab = tab.id}
          >
            {tab.label}
          </button>
        {/each}
      </div>
    </div>
    
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
  </main>
</div>

<style>
  .app {
    min-height: 100vh;
    background: var(--color-surface-alt);
  }
  
  .tabs {
    border-bottom: 1px solid var(--color-border);
  }
  
  .tab-list {
    display: flex;
    gap: var(--spacing-sm);
    overflow-x: auto;
    padding-bottom: var(--spacing-sm);
  }
  
  .tab-button {
    padding: var(--spacing-sm) var(--spacing-md);
    border: none;
    background: transparent;
    color: var(--color-text-muted);
    font-weight: 500;
    cursor: pointer;
    border-radius: var(--radius-md);
    transition: all 0.2s ease;
    white-space: nowrap;
  }
  
  .tab-button:hover {
    background: var(--color-surface-alt);
    color: var(--color-text);
  }
  
  .tab-button.active {
    background: var(--color-primary);
    color: white;
  }
  
  .tab-content {
    padding: var(--spacing-lg) 0;
  }
</style>