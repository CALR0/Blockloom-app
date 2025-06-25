<script lang="ts">
  interface Props {
    type: 'success' | 'warning' | 'error' | 'state' | 'theme' | 'responsive'
    children: any
  }
  
  let { type, children }: Props = $props()
</script>

<span class="badge badge-{type}">
  {@render children()}
</span>

<style>
  .badge {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-xs);
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: var(--radius-sm);
    font-size: var(--font-size-sm);
    font-weight: 500;
  }

  .badge-success {
    background: rgb(5 150 105 / 0.1);
    color: var(--color-success);
  }

  .badge-warning {
    background: rgb(217 119 6 / 0.1);
    color: var(--color-warning);
  }

  .badge-error {
    background: rgb(220 38 38 / 0.1);
    color: var(--color-error);
  }
  
  .badge-state {
    background: rgb(59 130 246 / 0.1);
    color: #3b82f6;
  }
  
  .badge-theme {
    background: rgb(139 92 246 / 0.1);
    color: #8b5cf6;
  }
  
  .badge-responsive {
    background: rgb(34 197 94 / 0.1);
    color: #22c55e;
  }
</style>