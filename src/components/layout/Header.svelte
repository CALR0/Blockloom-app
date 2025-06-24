<script lang="ts">
  import { themeStore } from '../../stores'
  
  function toggleTheme() {
    themeStore.toggle()
  }
</script>

<header class="header">
  <div class="container">
    <div class="header-content">
      <div class="logo">
        <h1>
          <span class="logo-icon">🧱</span>
          Blockloom
        </h1>
        <p>Genera variantes, analiza accesibilidad y extrae tokens de diseño</p>
      </div>
      
      <div class="header-actions">
        <button class="theme-toggle" onclick={toggleTheme} aria-label="Cambiar tema">
          <div class="toggle-track">
            <div class="toggle-thumb {$themeStore === 'dark' ? 'dark' : 'light'}">
              <span class="toggle-icon sun">☀️</span>
              <span class="toggle-icon moon">🌙</span>
            </div>
          </div>
        </button>
      </div>
    </div>
  </div>
</header>

<style>
  .header {
    background: var(--color-surface);
    border-bottom: 1px solid var(--color-border);
    padding: var(--spacing-xl) 0;
    box-shadow: var(--shadow-sm);
  }
  
  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--spacing-lg);
  }
  
  .logo {
    flex: 1;
  }
  
  .logo h1 {
    margin: 0;
    font-size: 2.5rem;
    font-weight: 800;
    color: var(--color-primary);
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    line-height: 1.2;
  }
  
  .logo-icon {
    font-size: 2.2rem;
    filter: drop-shadow(0 2px 4px rgba(37, 99, 235, 0.2));
  }
  
  .logo p {
    margin: var(--spacing-sm) 0 0 0;
    color: var(--color-text-muted);
    font-size: var(--font-size-base);
    font-weight: 400;
    line-height: var(--line-height-relaxed);
    max-width: 500px;
  }
  
  .header-actions {
    display: flex;
    align-items: center;
  }
  
  .theme-toggle {
    background: none;
    border: none;
    cursor: pointer;
    padding: var(--spacing-xs);
    border-radius: var(--radius-lg);
    transition: all 0.2s ease;
  }
  
  .theme-toggle:hover {
    background: var(--color-surface-alt);
  }
  
  .toggle-track {
    width: 60px;
    height: 32px;
    background: var(--color-border);
    border-radius: 16px;
    position: relative;
    transition: background-color 0.3s ease;
    border: 2px solid var(--color-border);
  }
  
  .toggle-thumb {
    width: 28px;
    height: 28px;
    background: var(--color-surface);
    border-radius: 50%;
    position: absolute;
    top: 0;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border: 1px solid var(--color-border);
  }
  
  .toggle-thumb.light {
    left: 0;
    background: linear-gradient(135deg, #fbbf24, #f59e0b);
  }
  
  .toggle-thumb.dark {
    left: 28px;
    background: linear-gradient(135deg, #6366f1, #4f46e5);
  }
  
  .toggle-icon {
    font-size: 14px;
    position: absolute;
    transition: all 0.2s ease;
  }
  
  .toggle-thumb.light .sun {
    opacity: 1;
    transform: scale(1);
  }
  
  .toggle-thumb.light .moon {
    opacity: 0;
    transform: scale(0.5);
  }
  
  .toggle-thumb.dark .sun {
    opacity: 0;
    transform: scale(0.5);
  }
  
  .toggle-thumb.dark .moon {
    opacity: 1;
    transform: scale(1);
  }
  
  @media (max-width: 768px) {
    .header {
      padding: var(--spacing-lg) 0;
    }
    
    .header-content {
      flex-direction: column;
      text-align: center;
      gap: var(--spacing-md);
    }
    
    .logo h1 {
      font-size: 2rem;
      justify-content: center;
    }
    
    .logo-icon {
      font-size: 1.8rem;
    }
    
    .logo p {
      font-size: var(--font-size-sm);
    }
  }
  
  @media (max-width: 480px) {
    .logo h1 {
      font-size: 1.75rem;
    }
    
    .logo-icon {
      font-size: 1.6rem;
    }
  }
</style>