<template>
  <section>
    <container>
      <div v-if="product" class="wrapper">
        <div class="left">
          <Image
            :src="product.PhotoName"
            :alt="product.ItemName"
            :aspectRatio="1 / 1"
          />
        </div>

        <div class="right">
          <div class="right-inner">
            <ProductInfo :product="product" />
            <ProductForm :product="product" />
          </div>
        </div>
      </div>
    </container>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, onUnmounted } from "vue";
import { useRoute } from "vue-router";

import useStore from "@/composables/useStore";
import Container from "@/components/common/Container.vue";
import Image from "@/components/common/Image.vue";
import ProductForm from "@/components/products/ProductForm.vue";
import ProductInfo from "@/components/products/ProductInfo.vue";
import { Product } from "@/types/Product";

export default defineComponent({
  name: "ProductDetails",

  components: {
    ProductInfo,
    ProductForm,
    Container,
    Image,
  },

  setup() {
    const store = useStore();
    const route = useRoute();

    const isLoading = computed(() => store.state.isLoading);
    const product = computed<Product>(() => {
      return store.getters.getProductByItemId(route.params.itemId);
    });
    const companyName = computed(() => store.state.Company?.CompanyName);

    // Setup document title and meta description
    const metaDescription = document.querySelector(
      'meta[name="description"]'
    ) as HTMLMetaElement;

    const oldTitle = document.title;
    const oldMetaDescription = metaDescription.content;

    document.title = isLoading.value
      ? oldTitle
      : `${product.value?.ItemName} | ${companyName.value}`;
    metaDescription.content = isLoading.value
      ? oldMetaDescription
      : `${product.value?.Description ?? oldMetaDescription}`;

    onUnmounted(() => {
      document.title = oldTitle;
      metaDescription.content = oldMetaDescription;
    });

    return { product };
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

.right .right-inner {
  padding: 32px;
  border-radius: 15px;
  -webkit-box-shadow: var(--shadow-standard);
  box-shadow: var(--shadow-standard);
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

  .right {
    grid-row: 1 / 2;
  }

  .left {
    grid-row: 2 / 3;
  }
}
</style>
