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
    <p class="text-muted">Evaluación automática basada en WCAG 2.1 AA/AAA.</p>
  </div>
  
  {#if !$accessibilityStore}
    <div class="empty-state">
      <p>No hay análisis disponible. Primero crea un componente en el editor.</p>
    </div>
  {:else}
    <div class="accessibility-grid">
      <div class="score-section">
        <ScoreCard score={$accessibilityStore.overallScore} />
      </div>
      <div class="checks-section">
        <ChecksList checks={$accessibilityStore.checks} />
      </div>
      <div class="contrast-section">
        <ContrastAnalysis contrastChecks={$accessibilityStore.contrastChecks} />
      </div>
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
    grid-template-columns: 300px 1fr 300px;
    grid-template-areas: "score checks contrast";
    gap: var(--spacing-lg);
    align-items: start;
  }
  
  .score-section {
    grid-area: score;
  }
  
  .checks-section {
    grid-area: checks;
  }
  
  .contrast-section {
    grid-area: contrast;
  }
  
  @media (max-width: 1024px) {
    .accessibility-grid {
      grid-template-columns: 1fr 1fr;
      grid-template-areas: 
        "score contrast"
        "checks checks";
    }
  }
  
  @media (max-width: 768px) {
    .accessibility-grid {
      grid-template-columns: 1fr;
      grid-template-areas: 
        "score"
        "checks"
        "contrast";
    }
  }
</style>