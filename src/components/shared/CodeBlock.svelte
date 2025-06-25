<script lang="ts">
  interface Props {
    code: string
    language?: string
    maxHeight?: string
  }
  
  let { code, language = '', maxHeight = '300px' }: Props = $props()
</script>

<div class="code-container" style="max-height: {maxHeight}">
  <pre class="code-display"><code>{code}</code></pre>
</div>

<style>
  .code-container {
    overflow: auto;
    padding: var(--spacing-lg);
  }
  
  .code-display {
    margin: 0;
    background: var(--color-surface-alt);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: var(--spacing-lg);
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: 14px;
    line-height: 1.5;
    color: var(--color-text);
    white-space: pre-wrap;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }
  
  @media (max-width: 768px) {
    .code-container {
      padding: var(--spacing-md);
    }
    
    .code-display {
      font-size: 12px;
      padding: var(--spacing-md);
    }
  }
</style>