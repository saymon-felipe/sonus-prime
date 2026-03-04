<template>
  <section id="contact" class="contact-section">
    <div class="contact-card" v-reveal="{ y: 50, duration: 0.8 }">
      <h2 class="contact-title">
        Vamos criar
        <br />
        algo incrível?
      </h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <input type="text" id="name" v-model="form.name" class="form-input" placeholder=" " required :disabled="status === 'loading'" />
          <label for="name" class="form-label">Seu Nome</label>
        </div>
        <div class="form-group">
          <input type="email" id="email" v-model="form.email" class="form-input" placeholder=" " required :disabled="status === 'loading'" />
          <label for="email" class="form-label">Seu E-mail</label>
        </div>
        <div class="form-group">
          <input type="text" id="project" v-model="form.project" class="form-input" placeholder=" " required :disabled="status === 'loading'" />
          <label for="project" class="form-label">Sobre o Projeto</label>
        </div>
        
        <button type="submit" class="btn-submit" :disabled="status === 'loading'">
          <span v-if="status === 'idle'">Enviar Mensagem <i class="fa-solid fa-arrow-right"></i></span>
          <span v-else-if="status === 'loading'">Enviando... <i class="fa-solid fa-spinner fa-spin"></i></span>
          <span v-else-if="status === 'success'">Enviado com sucesso! <i class="fa-solid fa-check"></i></span>
          <span v-else-if="status === 'error'">Erro ao enviar. Tente novamente.</span>
        </button>
      </form>
    </div>
  </section>
</template>

<script>
import { supabase } from '../lib/supabase';

export default {
  name: 'Contact',
  data() {
    return {
      form: {
        name: '',
        email: '',
        project: ''
      },
      status: 'idle' // 'idle', 'loading', 'success', 'error'
    };
  },
  methods: {
    async submitForm() {
      this.status = 'loading';
      
      const { error } = await supabase
        .from('contacts')
        .insert([
          { 
            name: this.form.name, 
            email: this.form.email, 
            project: this.form.project 
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
/* Adicione no Contact.vue */
.form-input {
  transition: border-color 0.3s ease, padding-left 0.3s ease;
}

.form-input:focus {
  padding-left: 10px;
  border-bottom-width: 2px;
}

.btn-submit {
  transition: all 0.3s ease;
  overflow: hidden;
}

.btn-submit i {
  transition: transform 0.3s ease;
}

.btn-submit:hover i {
  transform: translateX(5px);
}

.btn-submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
.fa-spin {
  animation: fa-spin 2s infinite linear;
}
@keyframes fa-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>