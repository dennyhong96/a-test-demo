<template>
  <section>
    <container>
      <div v-if="product" class="wrapper">
        <div class="left">
          <div>
            <Image :src="product.PhotoName" :alt="product.ItemName" />
          </div>
        </div>

        <div class="right">
          <h1>{{ product.ItemName }}</h1>
          <h4>{{ product.BasePrice }}</h4>
          <p>
            <span>Item ID:</span> {{ product.ItemID }} |
            <span>Product ID:</span>
            {{ product.ProductID }}
          </p>
          <p v-if="product.Description">
            <span>Description:</span> {{ product.Description }}
          </p>
          <p><span>Dimensions:</span> {{ product.Dimensions }}</p>
          <p>
            <span>Units Available:</span>
            {{ product.OnHandQuantity }}
          </p>

          <ProductForm :product="product" />
        </div>
      </div>
    </container>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";

import useStore from "@/composables/useStore";
import Container from "@/components/common/Container.vue";
import Image from "@/components/common/Image.vue";
import ProductForm from "@/components/products/ProductForm.vue";
import { formatCurrency } from "@/utils";

export default defineComponent({
  name: "ProductDetails",

  components: {
    ProductForm,
    Container,
    Image,
  },

  setup() {
    const store = useStore();
    const route = useRoute();

    const product = computed(() => {
      const foundProduct = store.state.Products.find(
        (p) => p.ItemID === route.params.itemId
      );

      if (!foundProduct) return null;

      return {
        ...foundProduct,
        BasePrice: formatCurrency(foundProduct.BasePrice),
        OnHandQuantity:
          foundProduct.OnHandQuantity <= 0 ? 0 : foundProduct.OnHandQuantity,
      };
    });

    return {
      product,
    };
  },
});
</script>

<style scoped>
section {
  padding-top: 5rem;
  padding-bottom: 5rem;
}

.wrapper {
  width: 100%;
  display: grid;
  grid-template-columns: 1.25fr 1fr;
  gap: 48px;
}

.left > div {
  border: 1px solid var(--color-gray-700);
  padding: 16px;
}

h1 {
  font-size: 1.6rem;
  font-weight: var(--font-weight-medium);
}

h4 {
  font-weight: var(--font-weight-medium);
}

h1,
h4,
p {
  margin-bottom: 8px;
}

p span {
  font-weight: var(--font-weight-medium);
  font-size: 0.9rem;
}

@media (max-width: 950px) {
  .wrapper {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .wrapper {
    grid-template-columns: 1fr;
  }
}
</style>
