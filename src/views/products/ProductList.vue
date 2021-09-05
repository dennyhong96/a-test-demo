<template>
  <Section>
    <Container>
      <ComponentFade>
        <ul v-if="!isLoading">
          <ProductCard
            v-for="product in products"
            :key="product.ItemID"
            :product="product"
          />
        </ul>
        <Loader v-else />
      </ComponentFade>
    </Container>
  </Section>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

import Container from "@/components/common/Container.vue";
import Loader from "@/components/common/Loader.vue";
import Section from "@/components/common/Section.vue";
import ComponentFade from "@/components/common/ComponentFade.vue";
import useStore from "@/composables/useStore";
import ProductCard from "@/components/products/ProductCard.vue";
import { formatCurrency } from "@/utils";

export default defineComponent({
  name: "ProductList",

  components: {
    Container,
    Loader,
    Section,
    ProductCard,
    ComponentFade,
  },

  setup() {
    const store = useStore();

    const isLoading = computed(() => store.state.isLoading);
    const products = computed(() =>
      store.state.Products.map((product) => ({
        ...product,
        BasePrice: formatCurrency(product.BasePrice),
      }))
    );

    return {
      isLoading,
      products,
    };
  },
});
</script>

<style scoped>
ul {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
  gap: 48px;
}
</style>
