<template>
  <li>
    <router-link
      :to="{ name: 'ProductDetails', params: { itemId: product.ItemID } }"
      :data-testId="`product-card-${product.ItemID}`"
    >
      <Image :src="product.PhotoName" :alt="product.ItemName" :aspectRatio="1 / 1" />
      <div>
        <h3>{{ product.ItemName }}</h3>
        <h4>{{ product.BasePrice }}</h4>
        <p v-if="product.Description">{{ product.Description }}</p>
      </div>
    </router-link>
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import Image from "@/components/common/Image.vue";
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
  padding: 16px;
  height: 100%;
  border-radius: 15px;
  -webkit-box-shadow: var(--shadow-standard);
  box-shadow: var(--shadow-standard);
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

@media (prefers-reduced-motion: no-preference) {
  a {
    transition: 0.5s ease-out;
    will-change: transform;
  }

  a:hover,
  a:focus,
  a:active {
    transform: scale(1.0175);
    transition: 0.2s ease-in;
    -webkit-box-shadow: var(--shadow-raised);
    box-shadow: var(--shadow-raised);
  }
}
</style>
