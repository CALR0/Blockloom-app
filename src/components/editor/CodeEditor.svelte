<script lang="ts">
  interface Props {
    value: string
    placeholder: string
    label: string
    onInput: (value: string) => void
  }
  
  let { value, placeholder, label, onInput }: Props = $props()
</script>

<div class="editor-section">
  <h3>{label}</h3>
  <textarea 
    class="input textarea code-editor"
    bind:value
    oninput={() => onInput(value)}
    {placeholder}
  ></textarea>
</div>

<style>
  .editor-section h3 {
    margin: 0 0 var(--spacing-sm) 0;
    color: var(--color-text);
    font-size: var(--font-size-lg);
  }
  
  .code-editor {
    min-height: 300px;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: 14px;
    line-height: 1.5;
  }
</style>