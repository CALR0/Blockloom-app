<script lang="ts">
  import type { DesignToken } from '../../types'
  
  interface Props {
    token: DesignToken
  }
  
  let { token }: Props = $props()
  
  function getTokenPreview(token: DesignToken) {
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

<div class="token-item">
  <div class="token-preview" style={Object.entries(getTokenPreview(token)).map(([k, v]) => `${k}: ${v}`).join('; ')}></div>
  <div class="token-info">
    <div class="token-name">{token.name}</div>
    <div class="token-value">{token.value}</div>
    <div class="token-type">{token.type}</div>
  </div>
</div>

<style>
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
</style>