<script lang="ts">
  import { componentStore } from './stores/componentStore'
  
  let htmlInput = $state('')
  let cssInput = $state('')
  
  $effect(() => {
    htmlInput = $componentStore.html
    cssInput = $componentStore.css
  })
  
  function updateComponent() {
    componentStore.update(htmlInput, cssInput)
  }
  
  function loadExample() {
    htmlInput = '<button class="btn-primary">Click me</button>'
    cssInput = `.btn-primary {
  background: #2563eb;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary:hover {
  background: #1d4ed8;
  transform: translateY(-1px);
}

.btn-primary:active {
  transform: translateY(0);
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}`
    updateComponent()
  }
</script>

<div class="editor-container">
  <div class="editor-header">
    <h2>Editor de Componente</h2>
    <button class="btn btn-secondary" onclick={loadExample}>
      Cargar Ejemplo
    </button>
  </div>
  
  <div class="editor-grid">
    <div class="editor-section">
      <h3>HTML</h3>
      <textarea 
        class="input textarea code-editor"
        bind:value={htmlInput}
        oninput={updateComponent}
        placeholder="Ingresa tu HTML aquí..."
      ></textarea>
    </div>
    
    <div class="editor-section">
      <h3>CSS</h3>
      <textarea 
        class="input textarea code-editor"
        bind:value={cssInput}
        oninput={updateComponent}
        placeholder="Ingresa tu CSS aquí..."
      ></textarea>
    </div>
  </div>
  
  <div class="preview-section">
    <h3>Vista Previa</h3>
    <div class="preview-container">
      <div class="preview-frame">
        <style>
          {$componentStore.css}
        </style>
        {@html $componentStore.html}
      </div>
    </div>
  </div>
</div>

<style>
  .editor-container {
    max-width: 1200px;
  }
  
  .editor-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-lg);
  }
  
  .editor-header h2 {
    margin: 0;
    color: var(--color-text);
  }
  
  .editor-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-lg);
    margin-bottom: var(--spacing-xl);
  }
  
  .editor-section h3 {
    margin: 0 0 var(--spacing-sm) 0;
    color: var(--color-text);
    font-size: var(--font-size-lg);
  }
  
  .code-editor {
    min-height: 300px;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: 14px;
    line-height: 1.5;
  }
  
  .preview-section h3 {
    margin: 0 0 var(--spacing-md) 0;
    color: var(--color-text);
    font-size: var(--font-size-lg);
  }
  
  .preview-container {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--spacing-xl);
    min-height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .preview-frame {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-md);
    flex-wrap: wrap;
  }
  
  @media (max-width: 768px) {
    .editor-grid {
      grid-template-columns: 1fr;
    }
    
    .editor-header {
      flex-direction: column;
      gap: var(--spacing-md);
      align-items: stretch;
    }
  }
</style>