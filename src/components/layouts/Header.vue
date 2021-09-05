<template>
  <header>
    <Container>
      <div class="inner">
        <router-link :to="{ name: 'Home' }">
          <img v-if="company" :src="company?.logoSrc" alt="Back to home page" />
          <h4>{{ company?.CompanyName }}</h4>
        </router-link>
        <CartDropdown />
      </div>
    </Container>
  </header>
  <div></div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

import useStore from "@/composables/useStore";
import CartDropdown from "@/components/cart/CartDropdown.vue";
import Container from "@/components/common/Container.vue";

export default defineComponent({
  name: "Header",

  components: {
    CartDropdown,
    Container,
  },

  setup() {
    const store = useStore();

    const company = computed(() => store.state.Company);

    return {
      company,
    };
  },
});
</script>

<style scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--height-header);
  background: var(--color-white);
  z-index: var(--z-header);

  -webkit-box-shadow: var(--shadow-standard);
  box-shadow: var(--shadow-standard);
}

.inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

header a {
  display: flex;
  align-items: center;
}

header a img {
  width: 100px;
  height: auto;
}

header h4 {
  font-size: 1.5rem;
  font-weight: var(--font-weight-bold);
  margin-bottom: -20px;
  margin-left: 16px;
}

div {
  height: var(--height-header);
}

@media (max-width: 600px) {
  header a img {
    width: 75px;
  }

  header a h4 {
    display: none;
  }
}
</style>
