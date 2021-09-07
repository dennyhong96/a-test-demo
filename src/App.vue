<template #default>
  <TeleportLink direction="forward" />
  <Header />

  <main id="main" v-if="!isGlobalError">
    <router-view />
  </main>

  <Footer />
  <SalesRepPopup />
  <TeleportLink direction="back" />

  <Alert v-if="isGlobalError" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import useStore from "@/composables/common/useStore";
import Header from "@/components/layouts/Header.vue";
import Footer from "@/components/layouts/Footer.vue";
import Alert from "@/components/common/Alert.vue";
import TeleportLink from "@/components/widgets/TeleportLink.vue";
import SalesRepPopup from "@/components/widgets/SalesRepPopup.vue";
import useGlobalError from "./composables/common/useGlobalError";

export default defineComponent({
  name: "App",

  components: {
    Header,
    Footer,
    Alert,
    TeleportLink,
    SalesRepPopup,
  },

  setup() {
    const store = useStore();
    store.dispatch("loadData");
    return useGlobalError();
  },
});
</script>

<style scoped>
main {
  min-height: calc(100vh - var(--height-header));
}
</style>
