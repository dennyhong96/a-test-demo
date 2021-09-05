<template>
  <Section>
    <Container>
      <ComponentFade>
        <ul v-if="!isLoading">
          <ProductCard v-for="product in products" :key="product.ItemID" :product="product" />
        </ul>
        <Loader v-else />
      </ComponentFade>
    </Container>
  </Section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import useProducts from "@/composables/products/useProducts";
import useIsLoading from "@/composables/common/useIsLoading";
import Container from "@/components/common/Container.vue";
import Loader from "@/components/common/Loader.vue";
import Section from "@/components/common/Section.vue";
import ComponentFade from "@/components/common/ComponentFade.vue";
import ProductCard from "@/components/products/ProductCard.vue";

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
    return {
      ...useProducts(),
      ...useIsLoading(),
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
