<template>
  <transition name="component-fade" mode="out-in" appear>
    <slot></slot>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ComponentFade",
});
</script>

<style scoped>
.component-fade-enter-from,
.component-fade-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: no-preference) {
  .component-fade-enter-active {
    transition: opacity 0.25s ease-out;
  }

  .component-fade-leave-active {
    transition: opacity 0.3s ease-in;
  }
}
</style>
