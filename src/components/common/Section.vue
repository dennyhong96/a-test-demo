<template>
  <section>
    <slot></slot>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Section",
});
</script>

<style scoped>
section {
  padding-top: 5rem;
  padding-bottom: 5rem;
  height: 100%;
}

@media (max-width: 600px) {
  section {
    padding-top: 3rem;
    padding-bottom: 3rem;
  }
}
</style>
