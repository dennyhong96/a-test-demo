<template>
  <form @submit="handleSubmit">
    <div class="form-row">
      <!-- -1 button -->
      <button
        @click="handleReduceQty"
        type="button"
        :disabled="product.OnHandQuantity <= 0 || num <= 1"
        aria-label="Decrease quantity"
      >
        -
      </button>

      <!-- Number input -->
      <input
        type="number"
        step="1"
        min="1"
        :max="product.OnHandQuantity"
        v-model="num"
        :disabled="product.OnHandQuantity <= 0"
      />

      <!-- +1 button -->
      <button
        @click="handleIncreaseQty"
        type="button"
        :disabled="product.OnHandQuantity <= 0 || num >= product.OnHandQuantity"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>

    <!-- Add to cart button -->
    <button
      class="add-to-cart"
      :disabled="
        product.OnHandQuantity <= 0 || num < 1 || num > product.OnHandQuantity
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
import { computed, defineComponent, PropType, ref } from "vue";

import { Product } from "@/types/Product";
import useStore from "@/composables/useStore";
import { pluralize } from "@/utils";

const NOTIFICATION_TIMEOUT = 3000;

export default defineComponent({
  name: "ProductForm",

  props: {
    product: Object as PropType<Product>,
  },

  setup(props) {
    const store = useStore();

    const currentProduct = computed(() => props.product);

    const num = ref(1);

    const numAddedToCart = ref(0);

    const handleReduceQty = () => {
      if (num.value === 1) return;
      num.value--;
    };

    const handleIncreaseQty = () => {
      if (num.value === currentProduct.value?.OnHandQuantity) return;
      num.value++;
    };

    let timeout: number;

    const handleSubmit = (evt: Event) => {
      evt.preventDefault();

      if (!currentProduct.value) return;
      if (num.value < 1) return;
      if (num.value > currentProduct.value?.OnHandQuantity) return;

      if (timeout) clearTimeout(timeout);

      store.dispatch("addToCart", {
        productId: currentProduct.value?.ItemID,
        quantity: num.value,
      });

      numAddedToCart.value = num.value;
      timeout = setTimeout(() => {
        numAddedToCart.value = 0;
      }, NOTIFICATION_TIMEOUT);

      num.value = 1;
    };

    return {
      num,
      numAddedToCart,

      handleReduceQty,
      handleIncreaseQty,
      handleSubmit,
    };
  },

  computed: {
    addedToCartNotification() {
      return `${this.numAddedToCart} ${pluralize(
        "unit",
        this.numAddedToCart
      )} added to your cart.`;
    },
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

.added-to-cart.fade-enter-active {
  opacity: 0;
}

.added-to-cart.fade-enter-to {
  opacity: 1;
}

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
    transition: 0.4s;
  }

  .added-to-cart.fade-leave-active {
    transition: 0.5s;
  }
}
</style>
