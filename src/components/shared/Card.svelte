<script lang="ts">
  interface Props {
    hover?: boolean
    children: any
  }
  
  let { hover = false, children }: Props = $props()
</script>

<div class="card {hover ? 'card-hover' : ''}">
  {@render children()}
</div>

<style>
  .card {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--spacing-lg);
    box-shadow: var(--shadow-sm);
    transition: all 0.2s ease;
  }

  .card-hover:hover {
    box-shadow: var(--shadow-md);
  }
</style>