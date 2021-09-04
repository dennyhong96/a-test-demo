<template>
  <section class="wrapper">
    <Container>
      <ul v-if="products.length">
        <ProductCard
          v-for="product in products"
          :key="product.ItemID"
          :product="product"
        />
      </ul>
    </Container>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

import Container from "@/components/Container.vue";
import useStore from "@/composables/useStore";
import ProductCard from "@/components/products/ProductCard.vue";
import { formatCurrency } from "@/utils";

export default defineComponent({
  name: "ProductList",

  components: {
    Container,
    ProductCard,
  },

  setup() {
    const store = useStore();

    const products = computed(() =>
      store.state.Products.map((product) => ({
        ...product,
        BasePrice: formatCurrency(product.BasePrice),
      }))
    );

    return {
      products,
    };
  },
});
</script>

<style scoped>
section {
  padding-top: 5rem;
}

ul {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
  gap: 48px;
}
</style>
