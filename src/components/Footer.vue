<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-grid">
        <div class="footer-column">
          <img src="/logo.svg" alt="Sonus Prime" class="footer-logo" :class="{ isDark: themeStore.theme === 'dark' }" />
          <p class="footer-text">
            Elevando o padrão digital através de design estratégico e tecnologia de ponta. Transformamos ideias em experiências memoráveis.
          </p>
          <div class="footer-socials">
            <a href="#" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-instagram"></i></a>
            <a href="#" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-linkedin"></i></a>
            <a href="https://wa.me/5543996027177?text=Ol%C3%A1%2C%20gostaria%20de%20falar%20sobre%20um%20projeto%20com%20a%20Sonus%20Prime!" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-whatsapp"></i></a>
          </div>
        </div>

        <div class="footer-column">
          <h4 class="footer-title">Navegação</h4>
          <ul class="footer-links">
            <li><a href="#about">Sobre nós</a></li>
            <li><a href="#services">Nossos Serviços</a></li>
            <li><a href="#portfolio">Projetos</a></li>
            <li><a href="#contact">Contato</a></li>
          </ul>
        </div>

        <div class="footer-column">
          <h4 class="footer-title">Contato</h4>
          <ul class="footer-contact-info">
            <li>
              <i class="fa-solid fa-location-dot"></i> Cambé, PR - Brasil
            </li>
            <li>
              <i class="fa-solid fa-envelope"></i> 
              <a href="mailto:agencia.sonusprime@gmail.com">agencia.sonusprime@gmail.com</a>
            </li>
            <li>
              <i class="fa-solid fa-phone"></i> 
              <a href="https://wa.me/5543996027177?text=Ol%C3%A1%2C%20gostaria%20de%20falar%20sobre%20um%20projeto%20com%20a%20Sonus%20Prime!" target="_blank" rel="noopener noreferrer">+55 (43) 9 9602-7177</a>
            </li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; {{ new Date().getFullYear() }} Sonus Prime Agência WEB. Todos os direitos reservados.</p>
      </div>
    </div>
  </footer>
</template>

<script>
import { themeStore } from '../store/theme';
export default {
  name: 'Footer',
  data() { return { themeStore }; }
};
</script>

<style scoped>
.footer {
  background: var(--bg-secondary);
  padding: 80px 0 40px;
  border-top: 1px solid var(--border-color);
  transition: background 0.5s ease;
}
.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}
.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 60px;
}
.footer-logo {
  height: 40px;
  margin-bottom: 20px;
  filter: invert(0) brightness(0.2);
}
.footer-logo.isDark { filter: invert(0) brightness(2); }
.footer-text {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 25px;
  max-width: 400px;
}
.footer-title {
  font-family: var(--font-display);
  font-size: 1.2rem;
  margin-bottom: 25px;
}
.footer-links, .footer-contact-info {
  list-style: none;
  padding: 0;
}
.footer-links li, .footer-contact-info li {
  margin-bottom: 12px;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  gap: 7px;
}
.footer-links a {
  color: inherit;
  text-decoration: none;
  transition: color 0.3s;
}
.footer-links a:hover { color: var(--text-primary); }

.footer-contact-info a {
  color: inherit;
  text-decoration: underline;
  transition: color 0.3s;
}
.footer-contact-info a:hover {
  color: var(--text-primary);
}

.footer-socials {
  display: flex;
  gap: 20px;
}
.footer-socials a {
  font-size: 1.5rem;
  color: var(--text-primary);
  opacity: 0.6;
  transition: opacity 0.3s, transform 0.3s;
  text-decoration: none;
}
.footer-socials a:hover {
  opacity: 1;
  transform: translateY(-3px);
}
.footer-bottom {
  margin-top: 60px;
  padding-top: 30px;
  border-top: 1px solid var(--border-color);
  text-align: center;
  font-size: 0.9rem;
  color: var(--text-secondary);
}
@media (max-width: 768px) {
  .footer-grid { grid-template-columns: 1fr; gap: 40px; }
}
</style>