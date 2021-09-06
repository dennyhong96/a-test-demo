<template #default>
  <TeleportLink direction="forward" />
  <Header />

  <main id="main">
    <router-view />
  </main>

  <Footer />
  <SalesRepPopup />
  <TeleportLink direction="back" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import useStore from "@/composables/common/useStore";
import Header from "@/components/layouts/Header.vue";
import Footer from "@/components/layouts/Footer.vue";
import TeleportLink from "@/components/widgets/TeleportLink.vue";
import SalesRepPopup from "@/components/widgets/SalesRepPopup.vue";
import useIsLoading from "@/composables/common/useIsLoading";

export default defineComponent({
  name: "App",

  components: {
    Header,
    Footer,
    TeleportLink,
    SalesRepPopup,
  },

  setup() {
    const store = useStore();
    store.dispatch("loadData");
    const { isLoading } = useIsLoading();
    return { isLoading };
  },
});
</script>

<style scoped>
main {
  min-height: calc(100vh - var(--height-header));
}
</style>
