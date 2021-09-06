<template>
  <Section>
    <Container>
      <ProductsFilterSort />
      <ComponentLoading appear :isLoading="isLoading">
        <transition-group tag="ul" name="product" class="products">
          <ProductCard
            v-for="(product, index) in products"
            :key="product.ItemID"
            :product="product"
            :index="index"
          />
        </transition-group>
      </ComponentLoading>
    </Container>
  </Section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import useProducts from "@/composables/products/useProducts";
import Container from "@/components/common/Container.vue";
import Section from "@/components/common/Section.vue";
import ComponentLoading from "@/components/common/ComponentLoading.vue";
import ProductCard from "@/components/products/ProductCard.vue";
import ProductsFilterSort from "@/components/products/ProductsFilterSort.vue";
import useIsLoading from "@/composables/common/useIsLoading";

export default defineComponent({
  name: "ProductList",

  components: {
    Container,
    Section,
    ProductCard,
    ProductsFilterSort,
    ComponentLoading,
  },

  setup() {
    return {
      ...useProducts(),
      ...useIsLoading(),
    };
  },
});
</script>

<style scoped>
.products {
  --gap: 48px;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: var(--gap);
}

.products > li {
  flex: 0 0 calc((100% - (var(--gap) * 2)) / 3);
  width: calc((100% - (var(--gap) * 2)) / 3);
  will-change: transform;
}

.product-enter-from,
.product-leave-to {
  transform: translateY(25px) scale(0.9);
  opacity: 0;
}

.product-leave-active {
  position: absolute;
}

@media (max-width: 950px) {
  .products {
    --gap: 36px;
  }

  .products > li {
    flex: 0 0 calc((100% - var(--gap)) / 2);
    width: calc((100% - var(--gap)) / 2);
  }
}

@media (max-width: 600px) {
  .products > li {
    flex: 0 0 100%;
    width: 100%;
  }
}

@media (prefers-reduced-motion: no-preference) {
  .product-enter-active,
  .product-leave-active {
    transition: 1s cubic-bezier(0.33, 1.28, 0.64, 1);
  }

  .product-move {
    transition: transform 1s cubic-bezier(0.33, 1.28, 0.64, 1);
  }
}

@media (prefers-reduced-motion: no-preference) and (max-width: 600px) {
  .product-enter-active,
  .product-leave-active {
    transition: transform 0.5s ease-out;
  }

  .product-move {
    transition: transform 0.5s ease-out;
  }
}
</style>
