<script lang="ts">
  import { componentStore, accessibilityStore } from '../../stores'
  
  $effect(() => {
    if ($componentStore.html && $componentStore.css) {
      accessibilityStore.analyze($componentStore.html, $componentStore.css)
    }
  })
  
  function getScoreColor(score: number) {
    if (score >= 90) return 'success'
    if (score >= 70) return 'warning'
    return 'error'
  }
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
      <div class="score-card">
        <h3>Puntuación General</h3>
        <div class="score-display">
          <div class="score-circle score-{getScoreColor($accessibilityStore.overallScore)}">
            {$accessibilityStore.overallScore}
          </div>
          <div class="score-label">
            {#if $accessibilityStore.overallScore >= 90}
              Excelente
            {:else if $accessibilityStore.overallScore >= 70}
              Bueno
            {:else}
              Necesita mejoras
            {/if}
          </div>
        </div>
      </div>
      
      <div class="checks-card">
        <h3>Verificaciones</h3>
        <div class="checks-list">
          {#each $accessibilityStore.checks as check}
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
          {/each}
        </div>
      </div>
      
      <div class="contrast-card">
        <h3>Análisis de Contraste</h3>
        <div class="contrast-list">
          {#each $accessibilityStore.contrastChecks as contrast}
            <div class="contrast-item">
              <div class="contrast-preview">
                <div 
                  class="contrast-sample"
                  style="background-color: {contrast.background}; color: {contrast.foreground};"
                >
                  Aa
                </div>
              </div>
              <div class="contrast-info">
                <div class="contrast-ratio">
                  Ratio: <strong>{contrast.ratio}</strong>
                </div>
                <div class="contrast-levels">
                  <span class="badge badge-{contrast.wcagAA ? 'success' : 'error'}">
                    AA {contrast.wcagAA ? '✓' : '✗'}
                  </span>
                  <span class="badge badge-{contrast.wcagAAA ? 'success' : 'error'}">
                    AAA {contrast.wcagAAA ? '✓' : '✗'}
                  </span>
                </div>
              </div>
            </div>
          {/each}
        </div>
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
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--spacing-lg);
  }
  
  .score-card,
  .checks-card,
  .contrast-card {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--spacing-lg);
  }
  
  .score-card h3,
  .checks-card h3,
  .contrast-card h3 {
    margin: 0 0 var(--spacing-md) 0;
    color: var(--color-text);
    font-size: var(--font-size-lg);
  }
  
  .score-display {
    text-align: center;
  }
  
  .score-circle {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--font-size-2xl);
    font-weight: 700;
    margin: 0 auto var(--spacing-sm) auto;
  }
  
  .score-circle.score-success {
    background: rgb(5 150 105 / 0.1);
    color: var(--color-success);
    border: 3px solid var(--color-success);
  }
  
  .score-circle.score-warning {
    background: rgb(217 119 6 / 0.1);
    color: var(--color-warning);
    border: 3px solid var(--color-warning);
  }
  
  .score-circle.score-error {
    background: rgb(220 38 38 / 0.1);
    color: var(--color-error);
    border: 3px solid var(--color-error);
  }
  
  .score-label {
    font-weight: 600;
    color: var(--color-text);
  }
  
  .checks-list {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }
  
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
  
  .contrast-list {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }
  
  .contrast-item {
    display: flex;
    gap: var(--spacing-md);
    padding: var(--spacing-sm);
    border-radius: var(--radius-sm);
    background: var(--color-surface-alt);
    align-items: center;
  }
  
  .contrast-preview {
    flex-shrink: 0;
  }
  
  .contrast-sample {
    width: 48px;
    height: 48px;
    border-radius: var(--radius-sm);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: var(--font-size-lg);
    border: 1px solid var(--color-border);
  }
  
  .contrast-info {
    flex: 1;
  }
  
  .contrast-ratio {
    font-size: var(--font-size-sm);
    color: var(--color-text);
    margin-bottom: var(--spacing-xs);
  }
  
  .contrast-levels {
    display: flex;
    gap: var(--spacing-xs);
  }
</style>