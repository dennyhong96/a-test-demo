<template>
  <div class="wrapper" v-click-outside="onClickOutsite">
    <button
      @click="toggleCart"
      :aria-label="isCartOpen ? 'Close cart' : 'Open cart'"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
      </svg>

      <span>
        {{ totalItems }}
      </span>
    </button>

    <div v-if="isCartOpen" class="cart">
      <ul>
        <li v-for="cartItem in cartItems" :key="cartItem.ItemID">
          <span>{{ cartItem.ItemName }}</span> x {{ cartItem.cartQuantity }} -
          {{ cartItem.itemTotal }}
        </li>
      </ul>

      <div class="total"><span>Total:</span> {{ total }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import useStore from "@/composables/useStore";
import { formatCurrency } from "@/utils";
import { computed, defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const store = useStore();
    const isCartOpen = ref(false);

    const toggleCart = () => {
      isCartOpen.value = !isCartOpen.value;
    };

    const onClickOutsite = () => {
      isCartOpen.value = false;
    };

    const cartItems = computed(() => {
      return Object.entries(store.state.Cart).map(([productId, quantity]) => {
        const cartItem = store.state.Products.find(
          (product) => product.ItemID === productId
        );

        return {
          ...cartItem,
          cartQuantity: quantity,
          itemTotal: formatCurrency(cartItem?.BasePrice ?? 0 * quantity),
        };
      });
    });

    const total = computed(() => {
      const total = cartItems.value.reduce((total, currentItem) => {
        return total + (currentItem.BasePrice ?? 0) * currentItem.cartQuantity;
      }, 0);
      return formatCurrency(total);
    });

    const totalItems = computed(() => {
      return cartItems.value.reduce((totalItems, currentCartItem) => {
        return totalItems + currentCartItem.cartQuantity;
      }, 0);
    });

    return {
      isCartOpen,
      cartItems,
      total,
      totalItems,

      toggleCart,
      onClickOutsite,
    };
  },
});
</script>

<style scoped>
.wrapper {
  position: relative;
  height: max-content;
}

button {
  display: block;
  width: 36px;
  height: 36px;
  position: relative;
}

button span {
  height: 20px;
  width: 20px;
  position: absolute;
  bottom: 0;
  right: 0;
  transform: translate(10%, 25%);
  background: var(--color-white);
  border-radius: 99999px;
  display: block;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-weight: var(--font-weight-bold);
  border: 2px solid var(--color-gray-900);
  padding-bottom: 1px;
}

.cart {
  min-width: 200px;
  position: absolute;
  right: 0;
  top: 100%;
  background: var(--color-white);
  border: 1px solid var(--color-gray-700);
  padding: 16px;
  font-size: 0.9rem;
  white-space: nowrap;
}

.cart li {
  display: flex;
  align-items: baseline;
}

.cart li:not(:last-of-type) {
  margin-bottom: 4px;
}

.cart li span {
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 150px;
  margin-right: 4px;
}

.cart .total {
  border-top: 1px solid var(--color-gray-300);
}

.cart .total {
  margin-top: 16px;
  padding-top: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cart .total span {
  font-weight: var(--font-weight-medium);
}
</style>
