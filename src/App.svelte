<script lang="ts">
  import Header from './components/layout/Header.svelte'
  import TabNavigation from './components/navigation/TabNavigation.svelte'
  import ComponentEditor from './components/editor/ComponentEditor.svelte'
  import VariantGenerator from './components/variants/VariantGenerator.svelte'
  import AccessibilityAnalyzer from './components/accessibility/AccessibilityAnalyzer.svelte'
  import TokenExtractor from './components/tokens/TokenExtractor.svelte'
  import ExportPanel from './components/export/ExportPanel.svelte'
  
  let activeTab = $state('editor')
  
  function handleTabChange(tabId: string) {
    activeTab = tabId
  }
</script>

<div class="app">
  <Header />
  
  <main class="main-content">
    <div class="container">
      <TabNavigation {activeTab} onTabChange={handleTabChange} />
      
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
  }
</style>