<template>
  <div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Container",
});
</script>

<style scoped>
div {
  max-width: 1300px;
  padding-left: 32px;
  padding-right: 32px;
  margin-left: auto;
  margin-right: auto;
  height: 100%;
}

@media (max-width: 600px) {
  div {
    padding-left: 24px;
    padding-right: 24px;
  }
}
</style>
