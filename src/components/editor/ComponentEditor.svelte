<script lang="ts">
  import { componentStore } from '../../stores'
  import { EXAMPLE_COMPONENT } from '../../constants/examples'
  import EditorHeader from './EditorHeader.svelte'
  import CodeEditor from './CodeEditor.svelte'
  import PreviewPanel from './PreviewPanel.svelte'
  
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
    htmlInput = EXAMPLE_COMPONENT.html
    cssInput = EXAMPLE_COMPONENT.css
    updateComponent()
  }
  
  function handleHtmlInput(value: string) {
    htmlInput = value
    updateComponent()
  }
  
  function handleCssInput(value: string) {
    cssInput = value
    updateComponent()
  }
</script>

<div class="editor-container">
  <EditorHeader onLoadExample={loadExample} />
  
  <div class="editor-grid">
    <CodeEditor 
      value={htmlInput}
      placeholder="Ingresa tu HTML aquí..."
      label="HTML"
      onInput={handleHtmlInput}
    />
    
    <CodeEditor 
      value={cssInput}
      placeholder="Ingresa tu CSS aquí..."
      label="CSS"
      onInput={handleCssInput}
    />
  </div>
  
  <PreviewPanel html={$componentStore.html} css={$componentStore.css} />
</div>

<style>
  .editor-container {
    max-width: 1200px;
  }
  
  .editor-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-lg);
    margin-bottom: var(--spacing-xl);
  }
  
  @media (max-width: 768px) {
    .editor-grid {
      grid-template-columns: 1fr;
    }
  }
</style>