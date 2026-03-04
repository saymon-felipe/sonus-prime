<template>
  <section id="services" class="services-container">
    <div class="services-left">
      <div v-reveal="{ y: 50, duration: 0.8 }">
        <h2 style="font-size: clamp(3rem, 5vw, 5rem); margin-bottom: 1rem; font-family: var(--font-display);">
          Nossos
          <br />
          Serviços
        </h2>
        <p style="font-size: 1.2rem; color: var(--text-secondary); max-width: 300px;">
          Soluções completas e integradas para pequenas e médias empresas.
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
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Services',
  data() {
    return {
      services: [
        {
          title: "Sites Institucionais",
          desc: "Presença digital premium que reflete a essência da sua marca e converte visitantes em clientes fiéis.",
        },
        {
          title: "Sistemas & Apps",
          desc: "Soluções complexas sob medida. De plataformas SaaS a aplicativos móveis robustos e escaláveis.",
        },
        {
          title: "Consultoria WEB",
          desc: "Estratégia digital, auditoria de performance e arquitetura de software para escalar o seu negócio.",
        },
        {
          title: "Tráfego & Mídias",
          desc: "Gestão inteligente de tráfego pago e redes sociais para maximizar o seu ROI e alcance online.",
        }
      ]
    };
  }
};
</script>