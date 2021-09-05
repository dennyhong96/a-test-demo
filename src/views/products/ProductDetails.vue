<template>
  <Section>
    <Container>
      <ComponentFade>
        <div v-if="!isLoading && product" class="wrapper">
          <div class="left">
            <Image :src="product.PhotoName" :alt="product.ItemName" :aspectRatio="1 / 1" />
          </div>

          <div class="right">
            <div class="right-inner">
              <ProductInfo :product="product" />
              <ProductForm :product="product" />
            </div>
          </div>
        </div>
        <Loader v-else />
      </ComponentFade>
    </Container>
  </Section>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from "vue";

import useProductByRoute from "@/composables/products/useProductByRoute";
import useCompany from "@/composables/company/useCompany";
import useIsLoading from "@/composables/common/useIsLoading";
import Container from "@/components/common/Container.vue";
import ComponentFade from "@/components/common/ComponentFade.vue";
import Loader from "@/components/common/Loader.vue";
import Section from "@/components/common/Section.vue";
import Image from "@/components/common/Image.vue";
import ProductForm from "@/components/products/ProductForm.vue";
import ProductInfo from "@/components/products/ProductInfo.vue";

export default defineComponent({
  name: "ProductDetails",

  components: {
    ProductInfo,
    ProductForm,
    Container,
    Section,
    Loader,
    ComponentFade,
    Image,
  },

  setup() {
    const { isLoading } = useIsLoading();
    const { product } = useProductByRoute();
    const company = useCompany();

    // Setup document title and meta description
    const metaDescription = document.querySelector('meta[name="description"]') as HTMLMetaElement;

    const oldTitle = document.title;
    const oldMetaDescription = metaDescription.content;

    document.title = isLoading.value
      ? oldTitle
      : `${product.value?.ItemName} | ${company.value?.CompanyName}`;
    metaDescription.content = isLoading.value
      ? oldMetaDescription
      : `${product.value?.Description ?? oldMetaDescription}`;

    onUnmounted(() => {
      document.title = oldTitle;
      metaDescription.content = oldMetaDescription;
    });

    return { product, isLoading };
  },
});
</script>

<style scoped>
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

  .right .right-inner {
    padding: 24px;
  }
}
</style>
