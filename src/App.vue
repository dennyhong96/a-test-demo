<template #default>
  <Header />

  <main>
    <router-view />
  </main>

  <Footer />
  <SalesRepWidget />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Header from "@/components/layouts/Header.vue";
import Footer from "@/components/layouts/Footer.vue";
import SalesRepWidget from "@/components/widgets/SalesRepWidget.vue";
import useStore from "@/composables/useStore";

export default defineComponent({
  name: "App",

  components: {
    Header,
    Footer,
    SalesRepWidget,
  },

  setup() {
    const store = useStore();

    store.dispatch("loadData");

    return {};
  },
});
</script>

<style scoped></style>
