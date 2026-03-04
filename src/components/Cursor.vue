<template>
  <div
    v-if="isPointerFine"
    :class="['custom-cursor', { hovering: isHovering }]"
    :style="{ left: position.x + 'px', top: position.y + 'px' }"
  ></div>
</template>

<script>
export default {
  name: 'Cursor',
  data() {
    return {
      position: { x: 0, y: 0 },
      isHovering: false,
      isPointerFine: false
    };
  },
  mounted() {
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches) {
      this.isPointerFine = true;
      window.addEventListener('mousemove', this.updatePosition);
      window.addEventListener('mouseover', this.handleMouseOver);
    }
  },
  beforeUnmount() {
    if (this.isPointerFine) {
      window.removeEventListener('mousemove', this.updatePosition);
      window.removeEventListener('mouseover', this.handleMouseOver);
    }
  },
  methods: {
    updatePosition(e) {
      this.position.x = e.clientX;
      this.position.y = e.clientY;
    },
    handleMouseOver(e) {
      const target = e.target;
      const tags = ['a', 'button', 'input', 'textarea'];
      
      if (
        tags.includes(target.tagName.toLowerCase()) ||
        target.closest('a') ||
        target.closest('button')
      ) {
        this.isHovering = true;
      } else {
        this.isHovering = false;
      }
    }
  }
};
</script>