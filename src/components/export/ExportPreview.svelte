<script lang="ts">
  import CodeBlock from '../shared/CodeBlock.svelte'
  
  interface Props {
    content: string
  }
  
  let { content }: Props = $props()
</script>

<div class="export-preview-card">
  <h3>Vista previa</h3>
  <div class="export-preview">
    <CodeBlock code={content} maxHeight="400px" />
  </div>
</div>

<style>
  .export-preview-card {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--spacing-lg);
  }
  
  .export-preview-card h3 {
    margin: 0 0 var(--spacing-md) 0;
    color: var(--color-text);
    font-size: var(--font-size-lg);
  }
  
  .export-preview {
    margin: 0;
  }
</style>