<template>
  <section id="portfolio" class="portfolio-container" ref="targetRef">
    <div class="portfolio-sticky">
      <div class="portfolio-track" :style="{ transform: `translateX(${xTransform})` }">
        <div v-for="(project, index) in projects" :key="index" class="portfolio-item">
          <div class="portfolio-item-content">
            <div class="portfolio-item-num">{{ project.num }}</div>
            <h3 class="portfolio-item-title">{{ project.title }}</h3>
            <p class="portfolio-item-desc">{{ project.desc }}</p>
          </div>
          <div class="portfolio-item-img-wrapper">
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
      projects: [
        {
          num: "01",
          title: "BCD Aliança",
          desc: "Plataforma institucional focada em clareza e presença digital. Layout responsivo estruturado para reforçar a credibilidade da marca e facilitar o contato direto do usuário.",
          img: "/bcd-alianca.png",
        },
        {
          num: "02",
          title: "Advocacia Geunon",
          desc: "Site para escritório especializado em Direito Previdenciário. Estrutura otimizada para captação de clientes, destacando serviços como aposentadorias e benefícios de forma acessível.",
          img: "/advocacia-geunon.png",
        },
        {
          num: "03",
          title: "Mania Mania",
          desc: "Catálogo virtual para o Grupo Manu Mania, focado em produtos artesanais como biscoitos e suspiros. Interface amigável que agiliza solicitações de orçamentos e pedidos em atacado.",
          img: "/mania-mania.png",
        },
        {
          num: "04",
          title: "Lótus Music",
          desc: "Página de apresentação para a escola de música. O layout destaca a metodologia de ensino, os cursos disponíveis e facilita a matrícula de alunos interessados em canto e instrumentos.",
          img: "/lotus-music.png",
        }
      ]
    };
  },
  computed: {
    xTransform() {
      return `-${this.scrollProgress * 300}vw`;
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    this.handleScroll();
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      if (!this.$refs.targetRef) return;
      const rect = this.$refs.targetRef.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const totalScroll = rect.height - windowHeight;
      let progress = -rect.top / totalScroll;
      
      this.scrollProgress = Math.max(0, Math.min(1, progress));
    }
  }
};
</script>