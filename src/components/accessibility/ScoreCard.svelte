<script lang="ts">
  interface Props {
    score: number
  }
  
  let { score }: Props = $props()
  
  function getScoreColor(score: number) {
    if (score >= 90) return 'success'
    if (score >= 70) return 'warning'
    return 'error'
  }
  
  function getScoreLabel(score: number) {
    if (score >= 90) return 'Excelente'
    if (score >= 70) return 'Bueno'
    return 'Necesita mejoras'
  }
</script>

<div class="score-card">
  <h3>Puntuación General</h3>
  <div class="score-display">
    <div class="score-circle score-{getScoreColor(score)}">
      {score}
    </div>
    <div class="score-label">
      {getScoreLabel(score)}
    </div>
  </div>
</div>

<style>
  .score-card {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--spacing-lg);
  }
  
  .score-card h3 {
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
</style>