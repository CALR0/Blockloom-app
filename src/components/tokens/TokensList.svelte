<script lang="ts">
  import type { DesignToken } from '../../types'
  import Badge from '../shared/Badge.svelte'
  import TokenItem from './TokenItem.svelte'
  
  interface Props {
    tokens: DesignToken[]
  }
  
  let { tokens }: Props = $props()
</script>

<div class="tokens-list-card">
  <div class="card-header">
    <h3>Tokens Detectados</h3>
    <Badge type="success">{tokens.length} tokens</Badge>
  </div>
  
  <div class="tokens-list">
    {#each tokens as token}
      <TokenItem {token} />
    {/each}
  </div>
</div>

<style>
  .tokens-list-card {
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
  
  .tokens-list {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
    max-height: 400px;
    overflow-y: auto;
  }
</style>