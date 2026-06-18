<template>
  <section id="contact" class="contact-section">
    <div class="contact-card">
      <h2 class="contact-title" v-reveal.words="{ y: 15, duration: 0.7 }">
        Vamos criar
        <br />
        <span class="text-gradient">algo incrível?</span>
      </h2>

      <!-- Chips de Seleção de Escopo -->
      <div class="scope-selection" v-reveal="{ y: 20, duration: 0.8, delay: 0.25 }">
        <p class="scope-label">Do que o seu projeto precisa?</p>
        <div class="chips-container">
          <button 
            type="button"
            v-for="(chip, index) in chips" 
            :key="index" 
            :class="['chip-btn', { 'active': form.category === chip }]"
            @click="selectChip(chip)"
          >
            {{ chip }}
          </button>
        </div>
      </div>

      <form @submit.prevent="submitForm">
        <div class="form-grid" v-reveal="{ y: 20, duration: 0.8, delay: 0.35 }">
          <div class="form-group">
            <input type="text" id="name" v-model="form.name" class="form-input" placeholder=" " required :disabled="status === 'loading'" />
            <label for="name" class="form-label">Seu Nome</label>
          </div>
          
          <div class="form-group">
            <input type="email" id="email" v-model="form.email" class="form-input" placeholder=" " required :disabled="status === 'loading'" />
            <label for="email" class="form-label">Seu E-mail</label>
          </div>
        </div>

        <div class="form-group" v-reveal="{ y: 20, duration: 0.8, delay: 0.45 }">
          <input type="text" id="project" v-model="form.project" class="form-input" placeholder=" " required :disabled="status === 'loading'" />
          <label for="project" class="form-label">Diga-nos um pouco sobre a sua ideia ou projeto</label>
        </div>
        
        <div class="cta-actions-container" v-reveal="{ y: 20, duration: 0.8, delay: 0.55 }">
          <!-- Botão de Envio Supabase -->
          <button type="submit" class="btn-submit" :disabled="status === 'loading'">
            <span v-if="status === 'idle'">Enviar Mensagem <i class="fa-solid fa-arrow-right"></i></span>
            <span v-else-if="status === 'loading'">Enviando... <i class="fa-solid fa-spinner fa-spin"></i></span>
            <span v-else-if="status === 'success'">Mensagem Enviada! <i class="fa-solid fa-check"></i></span>
            <span v-else-if="status === 'error'">Erro. Tente novamente. <i class="fa-solid fa-triangle-exclamation"></i></span>
          </button>

          <!-- Botão Secundário WhatsApp -->
          <a 
            @click="trackWhatsApp"
            :href="whatsappUrl" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="btn-whatsapp"
          >
            Falar pelo WhatsApp <i class="fa-brands fa-whatsapp"></i>
          </a>
        </div>

        <!-- Privacy disclaimer -->
        <p class="privacy-note">
          <i class="fa-solid fa-shield-halved"></i> Seus dados estão seguros e serão utilizados apenas para nossa comunicação.
        </p>
      </form>
    </div>
  </section>
</template>

<script>
import { supabase } from '../lib/supabase';
import { themeStore } from '../store/theme';

export default {
  name: 'Contact',
  data() {
    return {
      form: {
        name: '',
        email: '',
        category: 'Site Institucional',
        project: ''
      },
      chips: ['Landing Page', 'Site Institucional', 'Sistema / App', 'Consultoria', 'Tráfego Pago'],
      status: 'idle' // 'idle', 'loading', 'success', 'error'
    };
  },
  computed: {
    globalSelectedProject() {
      return themeStore.selectedProject;
    },
    whatsappUrl() {
      const phone = '5543996027177';
      const text = encodeURIComponent(
        `Olá! Me chamo ${this.form.name || 'Visitante'}. Gostaria de falar sobre um projeto de ${this.form.category || 'Desenvolvimento Web'}.` +
        (this.form.project ? ` Detalhes: ${this.form.project}` : '')
      );
      return `https://wa.me/${phone}?text=${text}`;
    }
  },
  watch: {
    globalSelectedProject(newVal) {
      if (newVal) {
        this.selectChipFromService(newVal);
      }
    }
  },
  mounted() {
    if (themeStore.selectedProject) {
      this.selectChipFromService(themeStore.selectedProject);
    }
  },
  methods: {
    selectChip(chip) {
      this.form.category = chip;
    },
    selectChipFromService(serviceTitle) {
      const mapping = {
        "Sites Institucionais": "Site Institucional",
        "Sistemas & Apps": "Sistema / App",
        "Consultoria WEB": "Consultoria",
        "Tráfego & Mídias": "Tráfego Pago"
      };
      const mapped = mapping[serviceTitle];
      if (mapped) {
        this.form.category = mapped;
      }
    },
    trackWhatsApp() {
      console.log('Lead redirecionado para o WhatsApp');
    },
    async submitForm() {
      this.status = 'loading';
      
      const projectPayload = this.form.category 
        ? `[Categoria: ${this.form.category}] ${this.form.project}` 
        : this.form.project;

      const { error } = await supabase
        .from('contacts')
        .insert([
          { 
            name: this.form.name, 
            email: this.form.email, 
            project: projectPayload 
          }
        ]);

      if (error) {
        console.error('Erro ao enviar contato:', error);
        this.status = 'error';
        setTimeout(() => this.status = 'idle', 4000);
      } else {
        this.status = 'success';
        this.form.name = '';
        this.form.email = '';
        this.form.project = '';
        setTimeout(() => this.status = 'idle', 4000);
      }
    }
  }
};
</script>

<style scoped>
.contact-section {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 120px clamp(1.5rem, 5vw, 4rem);
  background: var(--bg-primary);
  border-top: 1px solid var(--border-color);
}

.contact-card {
  width: 100%;
  max-width: 1000px;
}

.contact-title {
  font-size: clamp(3rem, 6vw, 6rem);
  line-height: 1.1;
  margin-bottom: 50px;
  letter-spacing: -0.03em;
}

.text-gradient {
  background: linear-gradient(90deg, var(--accent-red-1) 0%, var(--accent-red-2) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.scope-selection {
  margin-bottom: 40px;
}

.scope-label {
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin-bottom: 16px;
  font-family: var(--font-display);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.chips-container {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.chip-btn {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--border-color);
  padding: 10px 24px;
  border-radius: 100px;
  color: var(--text-secondary);
  font-family: var(--font-display);
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
}

[data-theme="light"] .chip-btn {
  background: rgba(0, 0, 0, 0.02);
}

.chip-btn:hover {
  border-color: var(--text-primary);
  color: var(--text-primary);
}

.chip-btn.active {
  background: var(--text-primary);
  color: var(--bg-primary);
  border-color: var(--text-primary);
  box-shadow: 0 4px 15px rgba(255, 255, 255, 0.05);
}

[data-theme="light"] .chip-btn.active {
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}

.form-group {
  position: relative;
  margin-bottom: 40px;
}

.form-input {
  width: 100%;
  padding: 15px 0;
  font-size: clamp(1.1rem, 2vw, 1.35rem);
  font-family: var(--font-body);
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--border-color);
  color: var(--text-primary);
  outline: none;
  transition: border-color 0.3s ease, padding-left 0.3s ease;
}

.form-input:focus {
  border-color: var(--accent-red-1);
  padding-left: 8px;
}

.form-label {
  position: absolute;
  left: 0;
  top: 15px;
  color: var(--text-secondary);
  font-size: clamp(1.1rem, 2vw, 1.35rem);
  pointer-events: none;
  transition: 0.3s cubic-bezier(0.25, 1, 0.5, 1) all;
}

.form-input:focus ~ .form-label,
.form-input:not(:placeholder-shown) ~ .form-label {
  top: -1.2rem;
  font-size: 0.8rem;
  color: var(--text-primary);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.cta-actions-container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
}

.btn-submit {
  padding: 16px 36px;
  background: var(--text-primary);
  color: var(--bg-primary);
  border: 1px solid transparent;
  border-radius: 100px;
  font-size: 1.05rem;
  font-family: var(--font-display);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 500;
  cursor: pointer;
  margin: 0;
  transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
  display: inline-flex;
  align-items: center;
  gap: 12px;
}

.btn-submit:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 255, 255, 0.05);
}

[data-theme="light"] .btn-submit:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
}

.btn-submit i {
  transition: transform 0.3s;
}

.btn-submit:hover i {
  transform: translateX(4px);
}

.btn-whatsapp {
  padding: 16px 36px;
  background: rgba(16, 185, 129, 0.1);
  color: var(--accent-emerald);
  border: 1px solid rgba(16, 185, 129, 0.25);
  border-radius: 100px;
  font-size: 1.05rem;
  font-family: var(--font-display);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  margin: 0;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
}

.btn-whatsapp:hover {
  background: var(--accent-emerald);
  color: #ffffff;
  border-color: var(--accent-emerald);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(16, 185, 129, 0.2);
}

.privacy-note {
  margin-top: 30px;
  font-size: 0.85rem;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  gap: 8px;
}

.privacy-note i {
  color: var(--accent-emerald);
}

.fa-spin {
  animation: fa-spin 2s infinite linear;
}

@keyframes fa-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .cta-actions-container {
    flex-direction: column;
    align-items: stretch;
  }

  .btn-submit, .btn-whatsapp {
    justify-content: center;
    width: 100%;
  }
}
</style>