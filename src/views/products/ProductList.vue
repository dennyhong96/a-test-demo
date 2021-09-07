<template>
  <Section>
    <Container>
      <div class="header">
        <ProductsFilterSort />
      </div>
      <ComponentLoading appear :isLoading="isLoading">
        <div>
          <transition name="results" mode="out-in">
            <div v-if="products.length">
              <transition-group tag="ul" name="product" class="products">
                <ProductCard
                  v-for="(product, index) in products"
                  :key="product.ItemID"
                  :product="product"
                  :index="index"
                />
              </transition-group>
            </div>
            <p v-else class="empty-results">
              No matching products, please search for something else.
            </p>
          </transition>
        </div>
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
    return useProducts();
  },
});
</script>

<style scoped>
.header {
  margin-top: -2rem;
  margin-bottom: 3rem;
}

.products {
  --gap: 48px;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: var(--gap);
  will-change: transform;
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

.empty-results {
  color: var(--color-urgent);
  font-weight: var(--font-weight-medium);
  font-size: 0.9rem;
  text-align: center;
  will-change: transform;
}

.results-enter-from,
.results-leave-to {
  transform: translateY(25px) scale(0.975);
  opacity: 0;
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
  .header {
    margin-top: initial;
  }

  .products > li {
    flex: 0 0 100%;
    width: 100%;
  }
}

@media (prefers-reduced-motion: no-preference) {
  .product-enter-active,
  .product-leave-active {
    transition: 1s cubic-bezier(0.3, 1.25, 0.6, 1);
  }

  .product-move {
    transition: transform 1s cubic-bezier(0.3, 1.25, 0.6, 1);
  }

  .results-enter-active,
  .results-leave-active {
    transition: var(--transition-standard);
  }
}

@media (prefers-reduced-motion: no-preference) and (max-width: 600px) {
  .product-enter-active,
  .product-leave-active {
    transition: 0.5s ease-out;
  }

  .product-move {
    transition: transform 0.5s ease-out;
  }
}
</style>
