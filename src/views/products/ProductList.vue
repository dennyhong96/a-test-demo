<template>
  <Section>
    <Container>
      <ProductsFilterSort />
      <transition-group tag="ul" name="products">
        <ProductCard
          v-for="(product, index) in products"
          :key="product.ItemID"
          :product="product"
          :index="index"
        />
      </transition-group>
    </Container>
  </Section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import useProducts from "@/composables/products/useProducts";
import Container from "@/components/common/Container.vue";
import Section from "@/components/common/Section.vue";
import ProductCard from "@/components/products/ProductCard.vue";
import ProductsFilterSort from "@/components/products/ProductsFilterSort.vue";

export default defineComponent({
  name: "ProductList",

  components: {
    Container,
    Section,
    ProductCard,
    ProductsFilterSort,
  },

  setup() {
    return useProducts();
  },
});
</script>

<style scoped>
ul {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
  gap: 48px;
}

.products {
  will-change: transform;
}

@media (prefers-reduced-motion: no-preference) {
  .products-move {
    transition: transform 1s cubic-bezier(0.33, 1.28, 0.64, 1);
  }
}

@media (prefers-reduced-motion: no-preference) and (max-width: 600px) {
  .products-move {
    transition: transform 0.5s ease-out;
  }
}
</style>
