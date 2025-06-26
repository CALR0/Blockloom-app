<script lang="ts">
  import { TABS } from '../../constants/tabs'
  
  interface Props {
    activeTab: string
    onTabChange: (tabId: string) => void
  }
  
  let { activeTab, onTabChange }: Props = $props()
</script>

<nav class="navigation">
  <div class="tab-list">
    {#each TABS as tab}
      <button 
        class="tab-button {activeTab === tab.id ? 'active' : ''}"
        onclick={() => onTabChange(tab.id)}
        aria-pressed={activeTab === tab.id}
      >
        <span class="tab-icon">{tab.icon}</span>
        <span class="tab-label">{tab.label}</span>
      </button>
    {/each}
  </div>
</nav>

<style>
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
    padding: var(--spacing-sm) var(--spacing-md);
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
    min-height: 40px;
    width: fit-content;
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
    padding: var(--spacing-sm) var(--spacing-md);
  }
  
  .tab-icon {
    font-size: var(--font-size-lg);
    line-height: 1;
    flex-shrink: 0;
  }
  
  .tab-label {
    font-weight: 600;
    flex-shrink: 0;
  }
  
  @media (max-width: 768px) {
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
    
    .tab-button.active {
      padding: var(--spacing-sm) var(--spacing-md);
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
    
    .tab-button.active {
      padding: var(--spacing-sm);
    }
  }
</style>