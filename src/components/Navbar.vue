<template>
  <nav class="navbar">
    <a href="#" class="nav-logo-link">
        <img src="/logo.svg" alt="Sonus Prime Logo" class="nav-logo-img" :class="{ isDark: themeStore.theme === 'dark' }" />
    </a>
    <div class="nav-links">
      <a href="#about" class="nav-link">Sobre</a>
      <a href="#services" class="nav-link">Serviços</a>
      <a href="#portfolio" class="nav-link">Projetos</a>
      <a href="#contact" class="nav-link">Contato</a>
    </div>
    <button @click="themeStore.toggleTheme" class="theme-toggle" aria-label="Toggle theme">
      <i v-if="themeStore.theme === 'dark'" class="fa-solid fa-sun"></i>
      <i v-else class="fa-solid fa-moon"></i>
    </button>
  </nav>
</template>

<script>
import { themeStore } from '../store/theme';

export default {
  name: 'Navbar',
  data() {
    return {
      themeStore
    };
  }
};
</script>
<style scoped>
.nav-logo-link {
  display: flex;
  align-items: center;
  height: 100%;
}

.nav-logo-img {
  /* Define uma altura fixa para caber na navbar */
  height: 32px; 
  width: auto;
  display: block;
  transition: filter 0.3s ease;
  filter: invert(0) brightness(0.2);
}

.isDark {
    filter: invert(0) brightness(2);
}
</style>