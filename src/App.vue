<template #default>
  <Header />

  <main>
    <router-view />
  </main>

  <Footer />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Header from "@/components/layouts/Header.vue";
import Footer from "@/components/layouts/Footer.vue";
import useStore from "@/composables/useStore";

export default defineComponent({
  name: "App",

  components: {
    Header,
    Footer,
  },

  setup() {
    const store = useStore();

    store.dispatch("loadData");

    return {};
  },
});
</script>

<style scoped></style>
