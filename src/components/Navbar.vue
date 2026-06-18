<template>
  <nav class="navbar">
    <a href="#" class="nav-logo-link" @click="scrollToTop($event)">
        <img src="/logo.svg" alt="Sonus Prime Logo" class="nav-logo-img" :class="{ isDark: themeStore.theme === 'dark' }" />
    </a>
    
    <!-- Desktop links -->
    <div class="nav-links">
      <a href="#about" class="nav-link" @click="scrollTo($event, '#about')">Sobre</a>
      <a href="#services" class="nav-link" @click="scrollTo($event, '#services')">Serviços</a>
      <a href="#portfolio" class="nav-link" @click="scrollTo($event, '#portfolio')">Projetos</a>
      <a href="#contact" class="nav-link" @click="scrollTo($event, '#contact')">Contato</a>
    </div>

    <div class="nav-actions">
      <!-- Desktop Theme Toggle -->
      <button @click="themeStore.toggleTheme" class="theme-toggle" aria-label="Toggle theme">
        <i v-if="themeStore.theme === 'dark'" class="fa-solid fa-sun"></i>
        <i v-else class="fa-solid fa-moon"></i>
      </button>

      <!-- Hamburger Button (Mobile) -->
      <button @click="toggleMenu" class="hamburger-btn" :class="{ 'open': menuOpen }" aria-label="Menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <!-- Mobile Fullscreen Menu Overlay -->
    <transition name="fade">
      <div v-if="menuOpen" class="mobile-menu-overlay" @click.self="closeMenu">
        <div class="mobile-menu-content">
          <div class="mobile-menu-links">
            <a href="#about" class="mobile-nav-link" @click="scrollTo($event, '#about')">Sobre</a>
            <a href="#services" class="mobile-nav-link" @click="scrollTo($event, '#services')">Serviços</a>
            <a href="#portfolio" class="mobile-nav-link" @click="scrollTo($event, '#portfolio')">Projetos</a>
            <a href="#contact" class="mobile-nav-link" @click="scrollTo($event, '#contact')">Contato</a>
          </div>
          <div class="mobile-menu-footer">
            <button @click="toggleThemeAndClose" class="theme-toggle-mobile">
              <span v-if="themeStore.theme === 'dark'"><i class="fa-solid fa-sun"></i> Modo Claro</span>
              <span v-else><i class="fa-solid fa-moon"></i> Modo Escuro</span>
            </button>
          </div>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script>
import { themeStore } from '../store/theme';

export default {
  name: 'Navbar',
  data() {
    return {
      themeStore,
      menuOpen: false
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
      if (this.menuOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    },
    closeMenu() {
      this.menuOpen = false;
      document.body.style.overflow = '';
    },
    toggleThemeAndClose() {
      this.themeStore.toggleTheme();
    },
    scrollTo(e, selector) {
      e.preventDefault();
      const el = document.querySelector(selector);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
      this.closeMenu();
    },
    scrollToTop(e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.closeMenu();
    }
  },
  beforeUnmount() {
    document.body.style.overflow = '';
  }
};
</script>

<style scoped>
.nav-logo-link {
  display: flex;
  align-items: center;
  height: 100%;
  z-index: 1002;
}

.nav-logo-img {
  height: 32px; 
  width: auto;
  display: block;
  transition: filter 0.3s ease;
  filter: invert(1);
}

.isDark {
    filter: none;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  z-index: 1002;
}

/* Hamburger button */
.hamburger-btn {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  width: 30px;
  height: 20px;
  position: relative;
  flex-direction: column;
  justify-content: space-between;
  padding: 0;
}

.hamburger-btn span {
  display: block;
  width: 100%;
  height: 2px;
  background: var(--text-primary);
  border-radius: 2px;
  transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
}

.hamburger-btn.open span:nth-child(1) {
  transform: translateY(9px) rotate(45deg);
}

.hamburger-btn.open span:nth-child(2) {
  opacity: 0;
}

.hamburger-btn.open span:nth-child(3) {
  transform: translateY(-9px) rotate(-45deg);
}

/* Mobile Menu Overlay */
.mobile-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(3, 3, 3, 0.8);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: center;
}

[data-theme="light"] .mobile-menu-overlay {
  background: rgba(245, 245, 247, 0.8);
}

.mobile-menu-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  width: 100%;
  padding: 2rem;
}

.mobile-menu-links {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.mobile-nav-link {
  font-family: var(--font-display);
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--text-primary);
  text-decoration: none;
  letter-spacing: -0.02em;
  opacity: 0.8;
  transition: all 0.3s ease;
}

.mobile-nav-link:hover {
  opacity: 1;
  color: var(--accent-red-1);
  transform: scale(1.05);
}

.mobile-menu-footer {
  margin-top: 2rem;
}

.theme-toggle-mobile {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-color);
  padding: 12px 24px;
  border-radius: 100px;
  color: var(--text-primary);
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
}

[data-theme="light"] .theme-toggle-mobile {
  background: rgba(0, 0, 0, 0.03);
}

/* Transition classes */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .hamburger-btn {
    display: flex;
  }
  
  .theme-toggle {
    display: none; /* Hide desktop theme toggle, use mobile inside drawer */
  }
}
</style>