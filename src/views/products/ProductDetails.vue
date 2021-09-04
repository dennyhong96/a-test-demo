<template>
  <section>
    <container>
      <div v-if="product" class="wrapper">
        <div class="left">
          <Image :src="product.PhotoName" :alt="product.ItemName" />
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

          <form @submit="handleSubmit">
            <div class="form-row">
              <button
                @click="handleReduceQty"
                type="button"
                :disabled="product.OnHandQuantity <= 0"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <input
                type="number"
                step="1"
                min="1"
                :max="product.OnHandQuantity"
                v-model="num"
                :disabled="product.OnHandQuantity <= 0"
              />
              <button
                @click="handleIncreaseQty"
                type="button"
                :disabled="product.OnHandQuantity <= 0"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <button
              class="add-to-cart"
              :disabled="product.OnHandQuantity <= 0 || num < 1"
              type="submit"
            >
              Add to cart
            </button>
          </form>
        </div>
      </div>
    </container>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";

import { useRoute } from "vue-router";
import useStore from "@/composables/useStore";
import Container from "@/components/Container.vue";
import Image from "@/components/Image.vue";
import { formatCurrency } from "@/utils";

export default defineComponent({
  name: "ProductDetails",

  components: {
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

    const num = ref(1);

    const handleReduceQty = () => {
      if (num.value === 1) return;
      num.value--;
    };

    const handleIncreaseQty = () => {
      if (num.value === product.value?.OnHandQuantity) return;
      num.value++;
    };

    const handleSubmit = (evt: Event) => {
      evt.preventDefault();
      if (!product.value) return;
      if (num.value < 1) return;
      if (num.value > product.value.OnHandQuantity) return;
      //
    };

    return {
      product,
      num,

      handleReduceQty,
      handleIncreaseQty,
      handleSubmit,
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
  grid-template-columns: 55% 45%;
  gap: 48px;
}

@media (max-width: 950px) {
  .wrapper {
    grid-template-columns: 50% 50%;
  }
}

@media (max-width: 600px) {
  .wrapper {
    grid-template-columns: 1fr;
  }
}

.left {
  padding: 16px;
  border: 1px solid var(--color-gray-700);
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

form button:disabled,
form input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.form-row {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.form-row button,
.form-row input {
  width: 36px;
  height: 36px;
  font: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 36px;
  text-align: center;
  -moz-appearance: textfield;
}

.form-row input {
  border: 1px solid var(--color-gray-700);
}

.form-row button {
  background: var(--color-gray-100);
}

.form-row input::-webkit-outer-spin-button,
.form-row input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.add-to-cart {
  background: var(--color-gray-900);
  color: var(--color-white);
  padding: 8px 16px;
  text-transform: uppercase;
  font-weight: var(--font-weight-bold);
}
</style>
