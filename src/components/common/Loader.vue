<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Loader",
});
</script>

<style scoped>
@keyframes load {
  0% {
    z-index: 2;
    transform: scale(0);
  }

  50% {
    z-index: 1;
    transform: scale(1);
  }

  100% {
    z-index: 0;
  }
}

div {
  position: absolute;
  left: 50%;
  top: 50%;
  margin: -20px 0 0 -20px;
  width: 38px;
  height: 38px;
  background-color: var(--color-white);
  border-radius: 50%;
  box-shadow: 0 0 0 7px var(--color-gray-900);
}

div::before,
div::after {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  display: block;
  margin: -20px 0 0 -20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transform: translate3d(0, 0, 0);
}

div::before {
  background-color: var(--color-gray-900);
  animation: load 1.6s ease-out infinite both;
}

div::after {
  background-color: var(--color-white);
  animation: load 1.6s ease-out 0.8s infinite both;
}
</style>
