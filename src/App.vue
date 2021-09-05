<template #default>
  <TeleportLink direction="forward" />

  <Header />
  <main id="main">
    <router-view />
  </main>
  <Footer />

  <SalesRepWidget />
  <TeleportLink direction="back" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Header from "@/components/layouts/Header.vue";
import Footer from "@/components/layouts/Footer.vue";
import TeleportLink from "@/components/widgets/TeleportLink.vue";
import SalesRepWidget from "@/components/widgets/SalesRepWidget.vue";
import useStore from "@/composables/useStore";

export default defineComponent({
  name: "App",

  components: {
    Header,
    Footer,
    TeleportLink,
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
