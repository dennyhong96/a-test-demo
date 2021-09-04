<template>
  <footer>
    <container>
      <p>
        {{ year }} {{ company?.CompanyName }} | All rights reserved
      </p></container
    >
  </footer>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

import Container from "@/components/common/Container.vue";
import useStore from "@/composables/useStore";

export default defineComponent({
  name: "Footer",

  components: {
    Container,
  },

  setup() {
    const store = useStore();

    const company = computed(() => store.state.Company);

    const year = computed(() => new Date().getFullYear());

    return { company, year };
  },
});
</script>

<style scoped>
footer {
  background: var(--color-gray-900);
  color: var(--color-white);
  text-transform: uppercase;
  padding-top: 5rem;
  padding-bottom: 5rem;
}

footer p {
  text-align: center;
}
</style>
