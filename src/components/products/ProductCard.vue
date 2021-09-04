<template>
  <li>
    <router-link
      :to="{ name: 'ProductDetails', params: { itemId: product.ItemID } }"
    >
      <Image :src="product.PhotoName" :alt="product.ItemID" />
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

  transition: 0.5s ease-out;
  will-change: transform;
  border-radius: 15px;
  -webkit-box-shadow: 0px 0px 15px 3px rgba(0, 0, 0, 0.075);
  box-shadow: 0px 0px 15px 3px rgba(0, 0, 0, 0.075);
}

a:hover {
  transition: 0.2s ease-in;
  transform: scale(1.0175);
  border-radius: 15px;
  -webkit-box-shadow: 0px 0px 20px 6px rgba(0, 0, 0, 0.05);
  box-shadow: 0px 0px 20px 6px rgba(0, 0, 0, 0.05);
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
