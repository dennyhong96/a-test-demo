<template>
  <pre>{{ JSON.stringify(product, null, 4) }}</pre>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

import useStore from "@/composables/useStore";
import { useRoute } from "vue-router";

export default defineComponent({
  setup() {
    const store = useStore();
    const route = useRoute();

    const product = computed(() =>
      store.state.Products.find((p) => p.ItemID === route.params.itemId)
    );

    return {
      product,
    };
  },
});
</script>

<style scoped></style>
