<template>
  <section class="metrics-section">
    <div class="metrics-container">
      <h2 class="metrics-title" v-reveal.words="{ y: 15, duration: 0.7 }">
        Engenharia Digital
        <br />
        <span class="text-gradient">De Alta Performance</span>
      </h2>
      <p class="metrics-subtitle" v-reveal="{ y: 20, duration: 0.8, delay: 0.25 }">
        Projetamos e codificamos interfaces ultrarrápidas, projetadas para reter a atenção do usuário e impulsionar vendas.
      </p>

      <div class="metrics-grid">
        <div 
          v-for="(metric, index) in metrics" 
          :key="index" 
          class="metric-card"
          v-reveal="{ y: 30, duration: 0.6, delay: index * 0.1 }"
        >
          <div class="metric-glow" :style="{ background: metric.color }"></div>
          <div class="metric-num-wrapper">
            <span class="metric-num" :style="{ color: metric.color }">{{ metric.value }}</span>
          </div>
          <h3 class="metric-label">{{ metric.label }}</h3>
          <p class="metric-desc">{{ metric.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Metrics',
  data() {
    return {
      metrics: [
        {
          value: "<1.2s",
          label: "Carregamento Instantâneo",
          desc: "Tempo de carregamento (LCP) otimizado de fábrica. Sites rápidos reduzem a rejeição em até 50%.",
          color: "var(--accent-red-1)"
        },
        {
          value: "+300%",
          label: "Taxa de Conversão",
          desc: "Design focado na jornada do usuário, leads qualificados e caminhos de conversão estrategicamente desenhados.",
          color: "var(--accent-red-2)"
        },
        {
          value: "100%",
          label: "Código Exclusivo",
          desc: "Sem templates prontos ou construtores pesados. Código limpo escrito sob medida para a sua necessidade.",
          color: "var(--accent-red-1)"
        },
        {
          value: "100/100",
          label: "Pontuação SEO",
          desc: "Indexação impecável nos motores de busca do Google para que sua marca seja encontrada organicamente.",
          color: "var(--accent-emerald)"
        }
      ]
    };
  }
};
</script>

<style scoped>
.metrics-section {
  padding: 120px 0;
  border-top: 1px solid var(--border-color);
  background: var(--bg-secondary);
  position: relative;
  overflow: hidden;
}

.metrics-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 clamp(1.5rem, 5vw, 4rem);
}

.metrics-title {
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  line-height: 1.1;
  margin-bottom: 1.5rem;
}

.text-gradient {
  background: linear-gradient(90deg, var(--accent-red-1) 0%, var(--accent-red-2) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.metrics-subtitle {
  font-size: clamp(1.1rem, 2vw, 1.4rem);
  color: var(--text-secondary);
  max-width: 600px;
  margin-bottom: 60px;
  line-height: 1.6;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.metric-card {
  position: relative;
  background: rgba(255, 255, 255, 0.01);
  border: 1px solid var(--border-color);
  padding: 40px 30px;
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.4s, box-shadow 0.4s;
  backdrop-filter: blur(10px);
}

.metric-card:hover {
  transform: translateY(-8px);
  border-color: var(--accent-red-1);
  box-shadow: 0 10px 30px var(--border-glow);
}

.metric-glow {
  position: absolute;
  top: -50px;
  right: -50px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  filter: blur(40px);
  opacity: 0.15;
  pointer-events: none;
  transition: opacity 0.4s;
}

.metric-card:hover .metric-glow {
  opacity: 0.3;
}

.metric-num-wrapper {
  margin-bottom: 20px;
}

.metric-num {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 4vw, 3.5rem);
  font-weight: 700;
  letter-spacing: -0.05em;
  transition: text-shadow 0.4s;
}

.metric-card:hover .metric-num {
  text-shadow: 0 0 15px currentColor;
}

.metric-label {
  font-size: 1.25rem;
  margin-bottom: 12px;
  font-weight: 500;
  letter-spacing: -0.02em;
}

.metric-desc {
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

[data-theme="light"] .metric-card {
  background: rgba(0, 0, 0, 0.01);
}
</style>
