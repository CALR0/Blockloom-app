<script lang="ts">
  import { componentStore, accessibilityStore } from '../../stores'
  import ScoreCard from './ScoreCard.svelte'
  import ChecksList from './ChecksList.svelte'
  import ContrastAnalysis from './ContrastAnalysis.svelte'
  
  $effect(() => {
    if ($componentStore.html && $componentStore.css) {
      accessibilityStore.analyze($componentStore.html, $componentStore.css)
    }
  })
</script>

<div class="accessibility-container">
  <div class="accessibility-header">
    <h2>Análisis de Accesibilidad</h2>
    <p class="text-muted">Evaluación automática basada en WCAG 2.1 AA/AAA</p>
  </div>
  
  {#if !$accessibilityStore}
    <div class="empty-state">
      <p>No hay análisis disponible. Primero crea un componente en el editor.</p>
    </div>
  {:else}
    <div class="accessibility-grid">
      <ScoreCard score={$accessibilityStore.overallScore} />
      <ChecksList checks={$accessibilityStore.checks} />
      <ContrastAnalysis contrastChecks={$accessibilityStore.contrastChecks} />
    </div>
  {/if}
</div>

<style>
  .accessibility-container {
    max-width: 1200px;
  }
  
  .accessibility-header {
    margin-bottom: var(--spacing-xl);
  }
  
  .accessibility-header h2 {
    margin: 0 0 var(--spacing-sm) 0;
    color: var(--color-text);
  }
  
  .empty-state {
    text-align: center;
    padding: var(--spacing-2xl);
    color: var(--color-text-muted);
  }
  
  .accessibility-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--spacing-lg);
  }
</style>