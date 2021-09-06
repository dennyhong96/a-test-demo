<template>
  <transition name="component-fade" mode="out-in" :appear="appear">
    <Loader v-if="isLoading" />
    <slot v-else></slot>
  </transition>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import Loader from "@/components/common/Loader.vue";

export default defineComponent({
  name: "ComponentLoading",

  components: {
    Loader,
  },

  props: {
    isLoading: {
      type: Boolean as PropType<boolean>,
    },
    appear: {
      type: Boolean as PropType<boolean>,
    },
  },
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
