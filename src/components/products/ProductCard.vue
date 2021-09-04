<template>
  <li>
    <router-link
      :to="{ name: 'ProductDetails', params: { itemId: product.ItemID } }"
    >
      <Image :src="product.PhotoName" :alt="product.ItemID" />
      <div>
        <h3>{{ product.ItemName }}</h3>
        <h4>{{ product.BasePrice }}</h4>
        <p>{{ product.Description }}</p>
      </div>
    </router-link>
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import Image from "@/components/Image.vue";
import { Product } from "@/types/Product";

export default defineComponent({
  name: "ProductCard",

  components: {
    Image,
  },

  props: {
    product: {
      required: true,
      type: Object as PropType<Product>,
    },
  },
});
</script>

<style scoped>
a {
  display: block;
  border: 1px solid var(--color-gray-700);
  padding: 16px;
  height: 100%;
}

div {
  margin-top: 16px;
}

h3 {
  font-size: 1.2rem;
}

h4 {
  font-weight: var(--font-weight-medium);
}

p {
  margin-top: 16px;
  font-size: 0.9rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
