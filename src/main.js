import { createApp } from 'vue';
import App from './App.vue';
import './index.css';

const app = createApp(App);

app.directive('reveal', {
  mounted(el, binding) {
    const { y = 30, x = 0, duration = 0.8, delay = 0, margin = '-50px', stagger = 0.04 } = binding.value || {};
    
    if (binding.modifiers.words) {
      // Word-by-word animation
      let wordIndex = 0;
      
      const splitText = (node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          const text = node.textContent;
          if (!text.trim()) return;
          
          // Split by spaces but preserve them in results
          const parts = text.split(/(\s+)/);
          const fragment = document.createDocumentFragment();
          
          parts.forEach(part => {
            if (part.trim() === '') {
              fragment.appendChild(document.createTextNode(part));
            } else {
              const span = document.createElement('span');
              span.textContent = part;
              span.className = 'reveal-word';
              span.style.display = 'inline-block';
              span.style.opacity = '0';
              span.style.transform = `translate(${x}px, ${y}px)`;
              span.style.transition = `opacity ${duration}s cubic-bezier(0.25, 1, 0.5, 1), transform ${duration}s cubic-bezier(0.25, 1, 0.5, 1)`;
              span.style.transitionDelay = `${delay + wordIndex * stagger}s`;
              fragment.appendChild(span);
              wordIndex++;
            }
          });
          
          node.parentNode.replaceChild(fragment, node);
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          if (node.classList.contains('reveal-word')) return;
          const children = Array.from(node.childNodes);
          children.forEach(child => splitText(child));
        }
      };
      
      splitText(el);
      
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          el.querySelectorAll('.reveal-word').forEach(word => {
            word.style.opacity = '1';
            word.style.transform = 'translate(0, 0)';
          });
          observer.disconnect();
        }
      }, { rootMargin: margin });
      
      observer.observe(el);
    } else {
      // Standard element animation
      el.style.opacity = '0';
      el.style.transform = `translate(${x}px, ${y}px)`;
      el.style.transition = `opacity ${duration}s cubic-bezier(0.25, 1, 0.5, 1), transform ${duration}s cubic-bezier(0.25, 1, 0.5, 1)`;
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
  }
});

app.mount('#root');