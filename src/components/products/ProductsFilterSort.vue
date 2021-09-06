<template>
  <input type="text" :value="filter" @input="handleInput" />
  <button @click="handleClearFilter">x</button>

  <button @click="handleSort('DEFAULT')">Default</button>
  <button @click="handleSort('PRICE_LOW')">Price Low</button>
  <button @click="handleSort('PRICE_HIGH')">Price High</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import useSortProduct from "@/composables/products/useSortProduct";
import useFilterProduct from "@/composables/products/useFilterProduct";

export default defineComponent({
  name: "ProductsFilterSort",

  setup() {
    const { filter, handleFilterChange, handleClearFilter } = useFilterProduct();

    const handleInput = (evt: InputEvent) => {
      const newFilter = (evt.target as HTMLInputElement).value;
      handleFilterChange(newFilter);
    };

    return {
      filter,
      handleInput,
      handleClearFilter,
      ...useSortProduct(),
    };
  },
});
</script>
