<template>
  <section id="services" class="services-container">
    <div class="services-left">
      <div>
        <h2 class="services-title-main" v-reveal.words="{ y: 15, duration: 0.7 }">
          Nossos
          <br />
          Serviços
        </h2>
        <p class="services-subtitle" v-reveal="{ y: 20, duration: 0.8, delay: 0.25 }">
          Soluções completas, integradas e de alta performance para impulsionar o seu negócio no ambiente digital.
        </p>
      </div>
    </div>
    <div class="services-right">
      <div 
        v-for="(service, index) in services" 
        :key="index" 
        class="service-item"
        v-reveal="{ x: 50, duration: 0.6, delay: index * 0.1 }"
      >
        <h3 class="service-title">{{ service.title }}</h3>
        <p class="service-desc">{{ service.desc }}</p>
        
        <!-- Tech Badges -->
        <div class="tech-badge-container">
          <span 
            v-for="(tech, tIndex) in service.techs" 
            :key="tIndex" 
            class="tech-badge"
          >
            {{ tech }}
          </span>
        </div>

        <!-- Action Button -->
        <button 
          @click="selectService(service.title)" 
          class="btn-service-cta"
        >
          Solicitar orçamento <i class="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { themeStore } from '../store/theme';

export default {
  name: 'Services',
  data() {
    return {
      services: [
        {
          title: "Sites Institucionais",
          desc: "Presença digital premium que reflete a essência da sua marca e converte visitantes em clientes fiéis.",
          techs: ["Vue 3", "Tailwind CSS", "Vite", "SEO Otimizado"]
        },
        {
          title: "Sistemas & Apps",
          desc: "Soluções complexas sob medida. De plataformas SaaS a aplicativos móveis robustos e escaláveis.",
          techs: ["Vue 3", "Node.js", "Supabase", "REST API"]
        },
        {
          title: "Consultoria WEB",
          desc: "Estratégia digital, auditoria de performance e arquitetura de software para escalar o seu negócio.",
          techs: ["Performance", "Arquitetura", "CI/CD", "Auditoria"]
        },
        {
          title: "Tráfego & Mídias",
          desc: "Gestão inteligente de tráfego pago e redes sociais para maximizar o seu ROI e alcance online.",
          techs: ["Google Ads", "Meta Ads", "Analytics", "Funis de Vendas"]
        }
      ]
    };
  },
  methods: {
    selectService(title) {
      themeStore.selectedProject = title;
      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  }
};
</script>

<style scoped>
.services-container {
  display: flex;
  position: relative;
  padding: 0 clamp(1.5rem, 5vw, 4rem);
  max-width: 1600px;
  margin: 0 auto;
  border-top: 1px solid var(--border-color);
}

.services-left {
  flex: 1;
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.services-title-main {
  font-size: clamp(3rem, 5vw, 5rem);
  margin-bottom: 1rem;
  font-family: var(--font-display);
  line-height: 1.1;
}

.services-subtitle {
  font-size: 1.2rem;
  color: var(--text-secondary);
  max-width: 350px;
  line-height: 1.6;
}

.services-right {
  flex: 1;
  padding: 20vh 0;
}

.service-item {
  padding: clamp(3rem, 6vw, 5rem) 0;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), border-bottom-color 0.4s;
}

.service-item:hover {
  transform: translateX(15px);
  border-bottom-color: var(--text-primary);
}

.service-title {
  font-size: clamp(2rem, 4vw, 3.2rem);
  margin-bottom: clamp(1rem, 2vw, 1.2rem);
  transition: color 0.3s;
}

.service-item:hover .service-title {
  color: var(--accent-red-1);
}

.service-desc {
  font-size: clamp(1rem, 2vw, 1.15rem);
  color: var(--text-secondary);
  max-width: 500px;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.tech-badge-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 25px;
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
  transition: all 0.3s ease;
}

[data-theme="light"] .tech-badge {
  background: rgba(0, 0, 0, 0.02);
}

.service-item:hover .tech-badge {
  border-color: var(--border-glow);
  color: var(--text-primary);
  background: rgba(255, 51, 51, 0.02);
}

.btn-service-cta {
  background: none;
  border: none;
  padding: 0;
  font-family: var(--font-display);
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-primary);
  text-transform: uppercase;
  letter-spacing: 0.15em;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  width: fit-content;
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  pointer-events: none;
}

.service-item:hover .btn-service-cta {
  opacity: 0.8;
  transform: translateX(0);
  pointer-events: auto;
}

.btn-service-cta:hover {
  opacity: 1;
  color: var(--accent-red-1);
}

.btn-service-cta i {
  transition: transform 0.3s;
}

.btn-service-cta:hover i {
  transform: translateX(4px);
}

@media (max-width: 768px) {
  .services-container {
    flex-direction: column;
    padding: 0 1.5rem;
  }

  .services-left {
    height: auto;
    position: relative;
    padding: 60px 0 20px 0;
  }

  .services-title-main {
    font-size: 3rem;
  }

  .services-right {
    padding: 0 0 60px 0;
  }

  .btn-service-cta {
    opacity: 0.8;
    transform: translateX(0);
    pointer-events: auto;
    margin-top: 10px;
  }
}
</style>