<script lang="ts">
  interface Props {
    html: string
    css: string
    className: string
  }
  
  let { html, css, className }: Props = $props()
</script>

<div class="variant-preview">
  <style>
    {css}
  </style>
  <div class="variant-content {className}">
    {@html html}
  </div>
</div>

<style>
  .variant-preview {
    background: var(--color-surface-alt);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: var(--spacing-lg);
    margin-bottom: var(--spacing-md);
    min-height: 120px;
    max-height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
    flex-shrink: 0;
  }
  
  .variant-content {
    max-width: 100%;
    max-height: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: var(--spacing-sm);
    text-align: center;
  }
  
  /* Ensure content inside variants doesn't overflow */
  .variant-content :global(*) {
    max-width: 100% !important;
    word-wrap: break-word !important;
    overflow-wrap: break-word !important;
    hyphens: auto !important;
  }
  
  /* Handle images specifically */
  .variant-content :global(img) {
    max-width: 100% !important;
    max-height: 200px !important;
    height: auto !important;
    object-fit: contain !important;
  }
  
  /* Handle text content */
  .variant-content :global(p),
  .variant-content :global(div),
  .variant-content :global(span) {
    font-size: clamp(12px, 2vw, 14px) !important;
    line-height: 1.4 !important;
    max-width: 100% !important;
  }
  
  /* Handle long text specifically */
  .variant-content :global(*) {
    text-overflow: ellipsis !important;
    white-space: nowrap !important;
    overflow: hidden !important;
  }
  
  /* Allow wrapping for certain elements */
  .variant-content :global(p),
  .variant-content :global(.description),
  .variant-content :global(.text) {
    white-space: normal !important;
    display: -webkit-box !important;
    -webkit-line-clamp: 3 !important;
    -webkit-box-orient: vertical !important;
    overflow: hidden !important;
  }
  
  @media (max-width: 768px) {
    .variant-preview {
      min-height: 100px;
      max-height: 250px;
      padding: var(--spacing-md);
    }
    
    .variant-content :global(*) {
      font-size: 12px !important;
    }
  }
  
  @media (max-width: 480px) {
    .variant-preview {
      min-height: 80px;
      max-height: 200px;
      padding: var(--spacing-sm);
    }
    
    .variant-content :global(p),
    .variant-content :global(.description),
    .variant-content :global(.text) {
      -webkit-line-clamp: 2 !important;
    }
  }
</style>