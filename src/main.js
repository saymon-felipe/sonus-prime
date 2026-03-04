import { createApp } from 'vue';
import App from './App.vue';
import './index.css';

const app = createApp(App);

app.directive('reveal', {
  mounted(el, binding) {
    const { y = 0, x = 0, duration = 0.8, delay = 0, margin = '-100px' } = binding.value || {};
    
    el.style.opacity = '0';
    el.style.transform = `translate(${x}px, ${y}px)`;
    el.style.transition = `opacity ${duration}s ease-out, transform ${duration}s ease-out`;
    el.style.transitionDelay = `${delay}s`;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        el.style.opacity = '1';
        el.style.transform = 'translate(0, 0)';
        observer.disconnect();
      }
    }, { rootMargin: margin });
    
    observer.observe(el);
  }
});

app.mount('#root');