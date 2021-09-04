<template>
  <ul>
    <li v-for="product in products" :key="product.ItemID">
      <router-link
        :to="{ name: 'ProductDetails', params: { itemId: product.ItemID } }"
      >
        <p>{{ product.ItemID }}</p>
      </router-link>
    </li>
  </ul>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

import useStore from "@/composables/useStore";

export default defineComponent({
  setup() {
    const store = useStore();

    const products = computed(() => store.state.Products);

    return {
      products,
    };
  },
});
</script>

<style scoped></style>
