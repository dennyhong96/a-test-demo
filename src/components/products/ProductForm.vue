<template>
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
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from "vue";

import { Product } from "@/types/Product";
import useStore from "@/composables/useStore";

export default defineComponent({
  name: "ProductForm",

  props: {
    product: Object as PropType<Product>,
  },

  setup(props) {
    const store = useStore();

    const currentProduct = computed(() => props.product);

    const num = ref<number>(1);

    const handleReduceQty = () => {
      if (num.value === 1) return;
      num.value--;
    };

    const handleIncreaseQty = () => {
      if (num.value === currentProduct.value?.OnHandQuantity) return;
      num.value++;
    };

    const handleSubmit = (evt: Event) => {
      evt.preventDefault();
      if (!currentProduct.value) return;
      if (num.value < 1) return;
      if (num.value > currentProduct.value?.OnHandQuantity) return;

      store.dispatch("addToCart", {
        productId: currentProduct.value?.ItemID,
        quantity: num.value,
      });

      num.value = 1;
    };

    return {
      num,

      handleReduceQty,
      handleIncreaseQty,
      handleSubmit,
    };
  },
});
</script>

<style scoped>
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
