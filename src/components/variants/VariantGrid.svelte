<script lang="ts">
  import type { Variant } from '../../types'
  import VariantCard from './VariantCard.svelte'
  
  interface Props {
    variants: Variant[]
    onViewCode: (variant: Variant) => void
  }
  
  let { variants, onViewCode }: Props = $props()
</script>

<div class="variants-grid">
  {#each variants as variant}
    <VariantCard {variant} {onViewCode} />
  {/each}
</div>

<style>
  .variants-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: var(--spacing-lg);
  }
  
  @media (max-width: 768px) {
    .variants-grid {
      grid-template-columns: 1fr;
    }
  }
</style>