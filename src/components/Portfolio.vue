<template>
  <section id="portfolio" class="portfolio-container" ref="targetRef">
    <div class="portfolio-sticky">
      <!-- Title on top of the portfolio (only visible on desktop, or styled cleanly) -->
      <div class="portfolio-header">
        <h2 class="portfolio-title-main" v-reveal.words="{ y: 15, duration: 0.7 }">Projetos <span class="text-gradient">Destaque</span></h2>
      </div>

      <div class="portfolio-track" :style="trackStyle" ref="trackRef">
        <div v-for="(project, index) in projects" :key="index" class="portfolio-item">
          
          <div class="portfolio-item-content" v-reveal="{ y: 30, duration: 0.7 }">
            <span class="portfolio-item-num">{{ project.num }}</span>
            <span class="portfolio-item-category">{{ project.category }}</span>
            <h3 class="portfolio-item-title">{{ project.title }}</h3>
            <p class="portfolio-item-desc">{{ project.desc }}</p>
            
            <!-- Techs used -->
            <div class="portfolio-techs">
              <span v-for="(tech, tIndex) in project.techs" :key="tIndex" class="tech-badge">
                {{ tech }}
              </span>
            </div>

            <!-- View Project Button -->
            <a :href="project.link" target="_blank" rel="noopener noreferrer" class="btn-portfolio-view">
              Visitar Projeto <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
          </div>

          <div class="portfolio-item-img-wrapper" v-reveal="{ y: 30, duration: 0.8, delay: 0.15 }">
            <img :src="project.img" :alt="project.title" class="portfolio-item-img" />
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Portfolio',
  data() {
    return {
      scrollProgress: 0,
      translateX: 0,
      isMobile: false,
      projects: [
        {
          num: "01",
          title: "BCD Aliança",
          category: "Website Corporativo",
          desc: "Plataforma institucional focada em clareza e presença digital. Layout responsivo estruturado para reforçar a credibilidade da marca e facilitar o contato direto do usuário.",
          img: "/bcd-alianca.png",
          techs: ["Vue 3", "Tailwind CSS", "Vite"],
          link: "#"
        },
        {
          num: "02",
          title: "Advocacia Geunon",
          category: "Landing Page de Conversão",
          desc: "Site para escritório especializado em Direito Previdenciário. Estrutura otimizada para captação de clientes, destacando serviços como aposentadorias de forma acessível.",
          img: "/advocacia-geunon.png",
          techs: ["Vue 3", "CSS Grid", "Supabase"],
          link: "#"
        },
        {
          num: "03",
          title: "Mania Mania",
          category: "Catálogo Online / E-commerce",
          desc: "Catálogo virtual para o Grupo Manu Mania, focado em produtos artesanais. Interface amigável que agiliza solicitações de orçamentos e pedidos em atacado.",
          img: "/mania-mania.png",
          techs: ["Vue 3", "Vite", "JSON API"],
          link: "#"
        },
        {
          num: "04",
          title: "Lótus Music",
          category: "Apresentação & Matrícula",
          desc: "Página de apresentação para a escola de música. O layout destaca a metodologia de ensino, os cursos disponíveis e facilita a matrícula de alunos interessados.",
          img: "/lotus-music.png",
          techs: ["Vue 3", "CSS Variables", "SEO"],
          link: "#"
        }
      ]
    };
  },
  computed: {
    trackStyle() {
      if (this.isMobile) {
        return {};
      }
      return {
        transform: `translateX(-${this.translateX}px)`
      };
    }
  },
  mounted() {
    this.checkMobile();
    window.addEventListener('resize', this.checkMobile);
    window.addEventListener('scroll', this.handleScroll);
    this.handleScroll();
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkMobile);
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    checkMobile() {
      this.isMobile = window.innerWidth <= 768;
      if (this.isMobile) {
        this.translateX = 0;
      } else {
        this.$nextTick(() => {
          this.handleScroll();
        });
      }
    },
    handleScroll() {
      if (this.isMobile || !this.$refs.targetRef) return;
      const rect = this.$refs.targetRef.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const totalScroll = rect.height - windowHeight;
      let progress = -rect.top / totalScroll;
      progress = Math.max(0, Math.min(1, progress));
      this.scrollProgress = progress;
      
      if (this.$refs.trackRef) {
        const trackWidth = this.$refs.trackRef.scrollWidth;
        const viewportWidth = this.$refs.targetRef.clientWidth;
        const maxTranslation = Math.max(0, trackWidth - viewportWidth);
        this.translateX = progress * maxTranslation;
      }
    }
  }
};
</script>

<style scoped>
.portfolio-container {
  position: relative;
  height: 400vh;
  background: var(--bg-primary);
}

.portfolio-sticky {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
}

.portfolio-header {
  position: absolute;
  top: 10vh;
  left: clamp(1.5rem, 5vw, 4rem);
  z-index: 10;
}

.portfolio-title-main {
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-family: var(--font-display);
}

.text-gradient {
  background: linear-gradient(90deg, var(--accent-red-1) 0%, var(--accent-red-2) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.portfolio-track {
  display: flex;
  height: 100vh;
  width: 400vw;
  transition: transform 0.1s ease-out;
}

.portfolio-item {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 clamp(1.5rem, 8vw, 8vw);
  gap: clamp(2rem, 5vw, 6vw);
  flex-shrink: 0;
  position: relative;
}

.portfolio-item-content {
  flex: 1;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 2;
  margin-top: 5vh;
}

.portfolio-item-num {
  font-family: var(--font-display);
  font-size: 1rem;
  color: var(--accent-red-1);
  font-weight: 500;
  letter-spacing: 0.25em;
  margin-bottom: 8px;
}

.portfolio-item-category {
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--text-secondary);
  margin-bottom: 12px;
}

.portfolio-item-title {
  font-size: clamp(2.2rem, 4.5vw, 4.5rem);
  line-height: 1.1;
  margin-bottom: clamp(1rem, 2vw, 1.5rem);
  letter-spacing: -0.03em;
}

.portfolio-item-desc {
  font-size: clamp(0.95rem, 1.8vw, 1.1rem);
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 24px;
}

.portfolio-techs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 30px;
}

.tech-badge {
  font-size: 0.75rem;
  font-family: var(--font-display);
  padding: 4px 12px;
  border-radius: 100px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

[data-theme="light"] .tech-badge {
  background: rgba(0, 0, 0, 0.02);
}

.btn-portfolio-view {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 24px;
  background: var(--text-primary);
  color: var(--bg-primary);
  border-radius: 100px;
  font-family: var(--font-display);
  font-size: 0.85rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-decoration: none;
  width: fit-content;
  transition: transform 0.3s, background 0.3s;
}

.btn-portfolio-view:hover {
  transform: scale(1.05);
}

.btn-portfolio-view i {
  transition: transform 0.3s;
}

.btn-portfolio-view:hover i {
  transform: translate(2px, -2px);
}

.portfolio-item-img-wrapper {
  flex: 1.2;
  aspect-ratio: 16 / 10;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid var(--border-color);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
  background: var(--bg-secondary);
}

.portfolio-item-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.8s cubic-bezier(0.25, 1, 0.5, 1);
}

.portfolio-item:hover .portfolio-item-img {
  transform: scale(1.06);
}

@media (max-width: 768px) {
  .portfolio-container {
    height: auto;
    background: var(--bg-primary);
  }

  .portfolio-sticky {
    position: relative;
    top: auto;
    height: auto;
    overflow: visible;
    padding: 60px 0;
  }

  .portfolio-header {
    position: relative;
    top: auto;
    left: auto;
    padding: 0 1.5rem;
    margin-bottom: 30px;
  }

  .portfolio-track {
    width: 100%;
    height: auto;
    flex-direction: column;
    gap: 40px;
    padding: 0 1.5rem;
  }

  .portfolio-item {
    width: 100%;
    height: auto;
    flex-direction: column;
    padding: 0;
    gap: 20px;
  }

  .portfolio-item-content {
    flex: none;
    max-width: 100%;
    margin-top: 0;
  }

  .portfolio-item-img-wrapper {
    width: 100%;
    height: auto;
    aspect-ratio: 16 / 10;
    flex: none;
  }
}
</style>