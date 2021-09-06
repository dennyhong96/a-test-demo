<template>
  <button @click="handleSort('DEFAULT')">Default</button>
  <button @click="handleSort('PRICE_LOW')">Price Low</button>
  <button @click="handleSort('PRICE_HIGH')">Price High</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import useSortProduct from "@/composables/products/useSortProduct";

export default defineComponent({
  name: "ProductsFilterSort",

  setup() {
    return useSortProduct();
  },
});
</script>
