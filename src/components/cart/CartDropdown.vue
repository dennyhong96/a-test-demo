<template>
  <div class="wrapper" v-click-outside="handleClickOutside">
    <!-- Cart Toggle Button -->
    <button
      class="cart-toggler"
      @click="handleToggleCart"
      :aria-label="isCartOpen ? 'Close shopping cart' : 'Open shopping cart'"
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
        {{ cartItemsCount }}
      </span>
    </button>

    <!-- Cart Dropdown -->
    <transition name="drop">
      <div v-if="isCartOpen" class="cart">
        <ul v-if="cartItemsCount">
          <li
            v-for="cartItem in cartItems"
            :key="cartItem.ItemID"
            :data-testId="`cart-line-item-${cartItem.ItemID}`"
          >
            <div>
              {{ cartItem.cartQuantity }} x <span>{{ cartItem.ItemName }}</span>
            </div>
            <div>
              - {{ cartItem.lineTotal }}
              <button
                :aria-label="`Remove cart item - ${cartItem.ItemName}`"
                @click="handleRemoveCartItem(cartItem.ItemID)"
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
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </li>
        </ul>
        <div v-else>Happy shopping! <span aria-label="Shopping cart icon">🛒</span></div>
        <div class="total" data-testid="cart-total"><span>Total:</span> {{ total }}</div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import useCart from "@/composables/cart/useCart";

export default defineComponent({
  name: "CartDropdown",

  setup() {
    return useCart();
  },
});
</script>

<style scoped>
.wrapper {
  position: relative;
  height: max-content;
}

.cart-toggler {
  display: block;
  width: 36px;
  height: 36px;
  position: relative;
}

.cart-toggler svg {
  width: 100%;
  height: 100%;
}

.cart-toggler span {
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
  padding-bottom: 2px;
}

.cart {
  min-width: min(calc(100vh - 64px), 200px);
  position: absolute;
  right: 0;
  top: calc(100% + 16px);
  background: var(--color-white);
  transform-origin: right top;
  will-change: transform;

  padding: 16px;
  font-size: 0.9rem;
  white-space: nowrap;

  border-radius: 10px;
  -webkit-box-shadow: var(--shadow-standard);
  box-shadow: var(--shadow-standard);
}

.cart.drop-enter-from,
.cart.drop-leave-to {
  transform: scale(0.9) translateY(-25px);
  opacity: 0;
}

.cart li {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.cart li div {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.cart li:not(:last-of-type) {
  margin-bottom: 8px;
}

.cart li span {
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 150px;
  margin-left: 4px;
}

.cart li button {
  width: 28px;
  height: 28px;
  display: block;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-gray-100);
  margin-left: 4px;
  padding: 4px;
  border-radius: 4px;
}

.cart li button svg {
  width: 24px;
  height: 24px;
}

.cart li button:hover,
.cart li button:focus,
.cart li button:active {
  background: var(--color-gray-300);
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

@media (max-width: 600px) {
  .cart li span {
    max-width: 75px;
  }
}

@media (prefers-reduced-motion: no-preference) {
  .cart-toggler {
    transition: var(--transition-standard);
    will-change: transform;
  }

  .cart-toggler:hover,
  .cart-toggler:focus,
  .cart-toggler:active {
    transform: scale(1.1);
  }

  .cart.drop-enter-active {
    transition: 0.2s ease-out;
  }

  .cart.drop-leave-active {
    transition: 0.3s ease-in;
  }

  .cart li button {
    transition: var(--transition-standard);
    will-change: transform;
  }
}
</style>
