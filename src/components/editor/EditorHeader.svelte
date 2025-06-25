<script lang="ts">
  interface Props {
    onLoadExample: () => void
  }
  
  let { onLoadExample }: Props = $props()
</script>

<div class="editor-header">
  <h2>Editor de componente</h2>
  <button class="btn btn-secondary" onclick={onLoadExample}>
    Demo
  </button>
</div>

<style>
  .editor-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-lg);
  }
  
  .editor-header h2 {
    margin: 0;
    color: var(--color-text);
  }
  
  @media (max-width: 768px) {
    .editor-header {
      flex-direction: column;
      gap: var(--spacing-md);
      align-items: stretch;
    }
  }
</style>