<template>
  <div class="wrapper" role="alert">
    <span
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        /></svg
    ></span>
    <p>
      {{ text }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "Alert",

  props: {
    text: {
      default: "Something went wrong, please try again.",
      type: String as PropType<string>,
    },
  },
});
</script>

<style scoped>
.wrapper {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  top: 32px;
  width: min(400px, calc(100vw - 2 * 32px));
  background: var(--color-urgent);
  z-index: var(--z-alert);
  border-radius: 15px;
  padding: 16px;
  color: var(--color-white);
  display: grid;
  grid-template-columns: 24px 1fr;
  align-items: center;
  gap: 8px;
}

.wrapper span {
  width: 24px;
  height: 24px;
}
</style>
