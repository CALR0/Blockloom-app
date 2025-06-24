<script lang="ts">
  import { componentStore } from './stores/componentStore'
  import { tokenStore } from './stores/tokenStore'
  
  let exportFormat = $state('json')
  
  $effect(() => {
    if ($componentStore.html && $componentStore.css) {
      tokenStore.extractTokens($componentStore.css)
    }
  })
  
  function copyTokens() {
    const tokens = tokenStore.getFormattedTokens(exportFormat)
    navigator.clipboard.writeText(tokens)
  }
  
  function getTokenPreview(token: any) {
    if (token.type === 'color') {
      return { backgroundColor: token.value }
    } else if (token.type === 'spacing') {
      return { width: token.value, height: '16px', backgroundColor: 'var(--color-primary)' }
    } else if (token.type === 'border-radius') {
      return { 
        width: '32px', 
        height: '32px', 
        backgroundColor: 'var(--color-border)', 
        borderRadius: token.value 
      }
    }
    return {}
  }
</script>

<div class="tokens-container">
  <div class="tokens-header">
    <h2>Tokens de Diseño</h2>
    <p class="text-muted">Propiedades extraídas automáticamente de tu componente</p>
  </div>
  
  {#if $tokenStore.length === 0}
    <div class="empty-state">
      <p>No hay tokens disponibles. Primero crea un componente en el editor.</p>
    </div>
  {:else}
    <div class="tokens-grid">
      <div class="tokens-list-card">
        <div class="card-header">
          <h3>Tokens Detectados</h3>
          <span class="badge badge-success">{$tokenStore.length} tokens</span>
        </div>
        
        <div class="tokens-list">
          {#each $tokenStore as token}
            <div class="token-item">
              <div class="token-preview" style={Object.entries(getTokenPreview(token)).map(([k, v]) => `${k}: ${v}`).join('; ')}></div>
              <div class="token-info">
                <div class="token-name">{token.name}</div>
                <div class="token-value">{token.value}</div>
                <div class="token-type">{token.type}</div>
              </div>
            </div>
          {/each}
        </div>
      </div>
      
      <div class="export-card">
        <div class="card-header">
          <h3>Exportar Tokens</h3>
          <div class="format-selector">
            <select class="input" bind:value={exportFormat}>
              <option value="json">JSON</option>
              <option value="scss">SCSS</option>
              <option value="css">CSS Variables</option>
              <option value="js">JavaScript</option>
            </select>
          </div>
        </div>
        
        <div class="export-preview">
          <pre class="code-block"><code>{tokenStore.getFormattedTokens(exportFormat)}</code></pre>
        </div>
        
        <div class="export-actions">
          <button class="btn btn-primary" onclick={copyTokens}>
            📋 Copiar Tokens
          </button>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  .tokens-container {
    max-width: 1200px;
  }
  
  .tokens-header {
    margin-bottom: var(--spacing-xl);
  }
  
  .tokens-header h2 {
    margin: 0 0 var(--spacing-sm) 0;
    color: var(--color-text);
  }
  
  .empty-state {
    text-align: center;
    padding: var(--spacing-2xl);
    color: var(--color-text-muted);
  }
  
  .tokens-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-lg);
  }
  
  .tokens-list-card,
  .export-card {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--spacing-lg);
  }
  
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-md);
  }
  
  .card-header h3 {
    margin: 0;
    color: var(--color-text);
    font-size: var(--font-size-lg);
  }
  
  .format-selector select {
    min-width: 120px;
  }
  
  .tokens-list {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
    max-height: 400px;
    overflow-y: auto;
  }
  
  .token-item {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    padding: var(--spacing-sm);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    background: var(--color-surface-alt);
  }
  
  .token-preview {
    width: 32px;
    height: 32px;
    border-radius: var(--radius-sm);
    border: 1px solid var(--color-border);
    flex-shrink: 0;
  }
  
  .token-info {
    flex: 1;
  }
  
  .token-name {
    font-weight: 600;
    color: var(--color-text);
    font-size: var(--font-size-sm);
  }
  
  .token-value {
    color: var(--color-text-muted);
    font-size: var(--font-size-sm);
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  }
  
  .token-type {
    color: var(--color-text-light);
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  .export-preview {
    margin-bottom: var(--spacing-md);
    max-height: 300px;
    overflow-y: auto;
  }
  
  .export-preview pre {
    margin: 0;
    font-size: var(--font-size-sm);
    line-height: 1.4;
  }
  
  .export-actions {
    display: flex;
    gap: var(--spacing-sm);
  }
  
  @media (max-width: 768px) {
    .tokens-grid {
      grid-template-columns: 1fr;
    }
  }
</style>