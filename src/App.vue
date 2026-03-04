<template>
  <OverlayScrollbarsComponent :options="osOptions" defer element="body">
    <div class="scroll-progress-container">
      <div class="scroll-progress-bar" :style="{ width: scrollPercent + '%' }"></div>
    </div>

    <Cursor />
    <Navbar />
    
    <main>
      <HeroLogo />
      <Intro />
      <Services />
      <Portfolio />
      <Contact />
    </main>

    <Footer />

    <button 
      class="back-to-top" 
      :class="{ visible: showBackToTop }" 
      @click="scrollToTop"
      aria-label="Voltar ao topo"
    >
      <i class="fa-solid fa-arrow-up"></i>
    </button>
  </OverlayScrollbarsComponent>
</template>

<script>
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue';
import 'overlayscrollbars/overlayscrollbars.css';
import { themeStore } from './store/theme';
import Navbar from './components/Navbar.vue';
import HeroLogo from './components/HeroLogo.vue';
import Intro from './components/Intro.vue';
import Services from './components/Services.vue';
import Portfolio from './components/Portfolio.vue';
import Contact from './components/Contact.vue';
import Footer from './components/Footer.vue';
import Cursor from './components/Cursor.vue';

export default {
  components: { OverlayScrollbarsComponent, Navbar, HeroLogo, Intro, Services, Portfolio, Contact, Footer, Cursor },
  data() {
    return {
      themeStore,
      scrollPercent: 0,
      showBackToTop: false
    };
  },
  computed: {
    osOptions() {
      return {
        overflow: { x: 'hidden' },
        scrollbars: {
          theme: this.themeStore.theme === 'dark' ? "os-theme-light" : "os-theme-dark",
          autoHide: "scroll",
        },
      };
    }
  },
  mounted() {
    this.themeStore.init();
    window.addEventListener('scroll', this.handleScroll);
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      this.scrollPercent = (winScroll / height) * 100;
      this.showBackToTop = winScroll > 400;
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
};
</script>

<style>
/* Barra de Progresso */
.scroll-progress-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  z-index: 2000;
  background: transparent;
}
.scroll-progress-bar {
  height: 100%;
  background: var(--text-primary);
  transition: width 0.1s ease-out;
}

/* Botão Voltar ao Topo */
.back-to-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--text-primary);
  color: var(--bg-primary);
  border: none;
  cursor: pointer;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.back-to-top.visible {
  opacity: 1;
  transform: translateY(0);
}
.back-to-top:hover {
  transform: scale(1.1) translateY(-5px);
}
</style>