<script lang="ts">
  import type { AccessibilityCheck } from '../../types'
  import CheckItem from './CheckItem.svelte'
  
  interface Props {
    checks: AccessibilityCheck[]
  }
  
  let { checks }: Props = $props()
</script>

<div class="checks-card">
  <h3>Verificaciones</h3>
  <div class="checks-list">
    {#each checks as check}
      <CheckItem {check} />
    {/each}
  </div>
</div>

<style>
  .checks-card {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--spacing-lg);
    height: fit-content;
  }
  
  .checks-card h3 {
    margin: 0 0 var(--spacing-md) 0;
    color: var(--color-text);
    font-size: var(--font-size-lg);
  }
  
  .checks-list {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }
</style>