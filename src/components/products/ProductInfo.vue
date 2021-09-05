<template>
  <div>
    <h1>{{ product.ItemName }}</h1>
    <h4>{{ product.BasePrice }}</h4>
    <p>
      <span>Item ID:</span> {{ product.ItemID }} |
      <span>Product ID:</span>
      {{ product.ProductID }}
    </p>
    <p v-if="product.Description"><span>Description:</span> {{ product.Description }}</p>
    <p><span>Dimensions:</span> {{ product.Dimensions }}</p>
    <p v-if="product.OnHandQuantity">
      <span>Units Available:</span>
      {{ product.OnHandQuantity }}
    </p>
    <p v-else class="out-of-stock">
      This product is currently out of stock, please check again later.
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import { Product } from "@/types/Product";

export default defineComponent({
  name: "ProductInfo",

  props: {
    product: {
      required: true,
      type: Object as PropType<Product>,
    },
  },
});
</script>

<style scoped>
h1,
h4,
p {
  margin-bottom: 8px;
}

h1 {
  font-size: 1.6rem;
  font-weight: var(--font-weight-medium);
}

h4 {
  font-weight: var(--font-weight-medium);
}

p span {
  font-weight: var(--font-weight-medium);
  font-size: 0.9rem;
}

.out-of-stock {
  font-size: 0.8rem;
  font-weight: var(--font-weight-medium);
  color: var(--color-urgent);
}
</style>
