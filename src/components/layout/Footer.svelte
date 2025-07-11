<script lang="ts">
  // Footer component for Blockloom
</script>

<footer class="footer">
  <div class="container">
    <div class="footer-content">
      <div class="footer-main">
        <div class="brand-section">
          <h3 class="brand-name">Blockloom</h3>
        </div>
        
        <div class="divider"></div>
        
        <div class="info-section">
          <div class="copyright">© 2025 Todos los derechos reservados</div>
          <div class="location">
            <span class="location-dot"></span>
            Santa Marta, Colombia
          </div>
        </div>
      </div>
      
      <div class="footer-accent"></div>
    </div>
  </div>
</footer>

<style>
  .footer {
    background: linear-gradient(135deg, var(--color-surface) 0%, var(--color-surface-alt) 100%);
    border-top: 1px solid var(--color-border);
    margin-top: auto;
    padding: var(--spacing-xl) 0 var(--spacing-lg) 0;
    position: relative;
    overflow: hidden;
  }
  
  .footer::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--color-primary), transparent);
    opacity: 0.6;
  }
  
  .footer-content {
    position: relative;
    z-index: 1;
  }
  
  .footer-main {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-lg);
    text-align: center;
    max-width: 600px;
    margin: 0 auto;
  }
  
  .brand-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-sm);
  }
  
  .brand-name {
    margin: 0;
    font-size: 2rem;
    font-weight: 800;
    background: linear-gradient(135deg, var(--color-primary), #8b5cf6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: -0.02em;
    line-height: 1.1;
  }
  
  .brand-tagline {
    font-size: var(--font-size-sm);
    color: var(--color-text-muted);
    font-weight: 500;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }
  
  .divider {
    width: 60px;
    height: 2px;
    background: linear-gradient(90deg, var(--color-primary), #8b5cf6);
    border-radius: 1px;
    opacity: 0.8;
  }
  
  .info-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-sm);
  }
  
  .copyright {
    font-size: var(--font-size-sm);
    color: var(--color-text);
    font-weight: 500;
  }
  
  .location {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    font-size: var(--font-size-sm);
    color: var(--color-text-muted);
    font-weight: 400;
  }
  
  .location-dot {
    width: 6px;
    height: 6px;
    background: var(--color-primary);
    border-radius: 50%;
    flex-shrink: 0;
  }
  
  .footer-accent {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background: linear-gradient(90deg, transparent, var(--color-primary), transparent);
    opacity: 0.4;
  }
  
  @media (max-width: 768px) {
    .footer {
      padding: var(--spacing-lg) 0 var(--spacing-md) 0;
    }
    
    .footer-main {
      gap: var(--spacing-md);
    }
    
    .brand-name {
      font-size: 1.75rem;
    }
    
    .brand-tagline {
      font-size: 12px;
    }
    
    .divider {
      width: 40px;
    }
  }
  
  @media (max-width: 480px) {
    .footer {
      padding: var(--spacing-md) 0 var(--spacing-sm) 0;
    }
    
    .footer-main {
      gap: var(--spacing-sm);
    }
    
    .brand-name {
      font-size: 1.5rem;
    }
    
    .info-section {
      gap: var(--spacing-xs);
    }
    
    .copyright,
    .location {
      font-size: 12px;
    }
  }
</style>