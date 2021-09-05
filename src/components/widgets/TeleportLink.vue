<template>
  <a
    href="#"
    :id="direction !== 'back' ? 'skip-link' : 'back-to-top'"
    @click="handleTeleport"
    :class="direction === 'back' ? 'back' : 'forward'"
  >
    {{ direction === "back" ? "Back to top" : "Skip to main content" }}
  </a>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

const FOCUSABLE_SELECTORS =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export default defineComponent({
  name: "SkipLink",

  setup(prop) {
    const handleTeleport = (evt: Event) => {
      evt.preventDefault();

      // Back to top of the page
      if (prop.direction === "back") {
        const skipToTopLink = document.getElementById("skip-link");
        return skipToTopLink?.focus();
      }

      // Skip to main content
      const main = document.getElementById("main");
      if (!main) return;
      const focusableElementsInMain = [
        ...main.querySelectorAll(FOCUSABLE_SELECTORS),
      ] as HTMLElement[];
      return focusableElementsInMain[0]?.focus();
    };

    return { handleTeleport };
  },

  props: {
    direction: {
      type: String as PropType<"back" | "forward">,
    },
  },
});
</script>

<style scoped>
a {
  position: fixed;
  left: 0;
  z-index: var(--z-skip-link);
}

a.forward {
  top: 0;
  transform: translateY(-100%);
}

a.back {
  bottom: 0;
  transform: translateY(100%);
}

a:focus,
a:active {
  transform: translateY(0);
}
</style>
