<script lang="ts">
  import type { AccessibilityCheck } from '../../types'
  
  interface Props {
    check: AccessibilityCheck
  }
  
  let { check }: Props = $props()
</script>

<div class="check-item">
  <div class="check-icon {check.status}">
    {#if check.status === 'pass'}
      ✓
    {:else if check.status === 'warning'}
      ⚠
    {:else}
      ✗
    {/if}
  </div>
  <div class="check-content">
    <div class="check-title">{check.title}</div>
    <div class="check-description">{check.description}</div>
    {#if check.suggestion}
      <div class="check-suggestion">💡 {check.suggestion}</div>
    {/if}
  </div>
</div>

<style>
  .check-item {
    display: flex;
    gap: var(--spacing-sm);
    padding: var(--spacing-sm);
    border-radius: var(--radius-sm);
    background: var(--color-surface-alt);
  }
  
  .check-icon {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: var(--font-size-sm);
    flex-shrink: 0;
  }
  
  .check-icon.pass {
    background: var(--color-success);
    color: white;
  }
  
  .check-icon.warning {
    background: var(--color-warning);
    color: white;
  }
  
  .check-icon.fail {
    background: var(--color-error);
    color: white;
  }
  
  .check-content {
    flex: 1;
  }
  
  .check-title {
    font-weight: 600;
    color: var(--color-text);
    margin-bottom: var(--spacing-xs);
  }
  
  .check-description {
    font-size: var(--font-size-sm);
    color: var(--color-text-muted);
    margin-bottom: var(--spacing-xs);
  }
  
  .check-suggestion {
    font-size: var(--font-size-sm);
    color: var(--color-primary);
    font-style: italic;
  }
</style>