<template>
  <form v-if="product" @submit="handleSubmit">
    <div class="form-row">
      <!-- -1 button -->
      <button
        @click="handleReduceQty"
        type="button"
        :disabled="product.OnHandQuantity <= 0 || addToCartQuantity <= 1"
        aria-label="Decrease quantity"
      >
        -
      </button>

      <!-- Number input -->
      <input
        type="number"
        step="1"
        min="1"
        v-model="addToCartQuantity"
        :max="product.OnHandQuantity"
        :disabled="product.OnHandQuantity <= 0"
        data-testId="product-form-quantity-input"
      />

      <!-- +1 button -->
      <button
        @click="handleIncreaseQty"
        type="button"
        :disabled="product.OnHandQuantity <= 0 || addToCartQuantity >= product.OnHandQuantity"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>

    <!-- Add to cart button -->
    <button
      class="add-to-cart"
      :disabled="
        product.OnHandQuantity <= 0 ||
          addToCartQuantity < 1 ||
          addToCartQuantity > product.OnHandQuantity
      "
      type="submit"
    >
      Add to cart
    </button>

    <!-- Notification -->
    <transition name="fade">
      <p v-if="numAddedToCart" class="added-to-cart">
        {{ addedToCartNotification }}
      </p>
    </transition>
  </form>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import { Product } from "@/types/Product";
import useAddToCart from "@/composables/cart/useAddToCart";

export default defineComponent({
  name: "ProductForm",

  props: {
    product: Object as PropType<Product>,
  },

  setup(props) {
    return useAddToCart(props.product);
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

.form-row button {
  display: block;
  background: var(--color-gray-100);
}

.form-row button:hover,
.form-row button:focus,
.form-row button:active {
  background: var(--color-gray-300);
}

.form-row button:disabled:hover,
.form-row button:disabled:focus,
.form-row button:disabled:active {
  background: var(--color-gray-100);
}

.form-row button:first-of-type {
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}

.form-row button:last-of-type {
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}

.form-row input {
  border: 1px solid var(--color-gray-700);
}

.form-row input::-webkit-outer-spin-button,
.form-row input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.add-to-cart {
  border-radius: 5px;
  background: var(--color-gray-900);
  color: var(--color-white);
  padding: 8px 16px;
  text-transform: uppercase;
  font-weight: var(--font-weight-bold);
}

.add-to-cart:disabled:hover,
.add-to-cart:disabled:focus,
.add-to-cart:disabled:active {
  -webkit-box-shadow: initial;
  box-shadow: initial;
}

.added-to-cart {
  margin-top: 8px;
  font-size: 0.8rem;
  font-weight: var(--font-weight-medium);
  color: var(--color-success);
}

.added-to-cart.fade-enter-from,
.added-to-cart.fade-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: no-preference) {
  .form-row button {
    transition: var(--transition-standard);
    will-change: transform;
  }

  .add-to-cart {
    transition: var(--transition-standard);
    will-change: transform;
  }

  .add-to-cart:hover,
  .add-to-cart:focus,
  .add-to-cart:active {
    -webkit-box-shadow: var(--shadow-button);
    box-shadow: var(--shadow-button);
  }

  .added-to-cart.fade-enter-active {
    transition: 0.3s ease-out;
  }

  .added-to-cart.fade-leave-active {
    transition: 0.4s ease-in;
  }
}
</style>
