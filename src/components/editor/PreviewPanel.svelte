<script lang="ts">
  interface Props {
    html: string
    css: string
  }
  
  let { html, css }: Props = $props()
</script>

<div class="preview-section">
  <h3>Vista previa</h3>
  <div class="preview-container">
    <div class="preview-frame">
      <style>
        {css}
      </style>
      {@html html}
    </div>
  </div>
</div>

<style>
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
</style>