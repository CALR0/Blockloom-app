<script lang="ts">
  import { themeStore } from './stores/themeStore'
  
  function toggleTheme() {
    themeStore.toggle()
  }
</script>

<header class="header">
  <div class="container">
    <div class="header-content">
      <div class="logo">
        <h1>Blockloom</h1>
        <p>Genera variantes, analiza accesibilidad y extrae tokens de diseño.</p>
      </div>
      
      <div class="header-actions">
        <button class="btn btn-secondary" onclick={toggleTheme}>
          {$themeStore === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </div>
  </div>
</header>

<style>
  .header {
    background: var(--color-surface);
    border-bottom: 1px solid var(--color-border);
    padding: var(--spacing-lg) 0;
  }
  
  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--spacing-md);
  }
  
  .logo h1 {
    margin: 0;
    font-size: var(--font-size-2xl);
    font-weight: 700;
    color: var(--color-primary);
  }
  
  .logo p {
    margin: var(--spacing-xs) 0 0 0;
    color: var(--color-text-muted);
    font-size: var(--font-size-sm);
  }
  
  .header-actions {
    display: flex;
    gap: var(--spacing-sm);
  }
  
  @media (max-width: 768px) {
    .header-content {
      flex-direction: column;
      text-align: center;
    }
    
    .logo h1 {
      font-size: var(--font-size-xl);
    }
  }
</style>