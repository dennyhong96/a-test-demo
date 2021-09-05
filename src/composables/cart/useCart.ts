import { computed, ref } from "vue";

import useStore from "@/composables/common/useStore";
import { CartItem } from "@/types/Cart";

function useCart() {
  const store = useStore();
  const cartItems = computed<CartItem[]>(() => store.getters.listCartItems);
  const total = computed<string>(() => store.getters.getCartTotal);
  const cartItemsCount = computed<number>(() => store.getters.countCartItems);

  const isCartOpen = ref(false);

  const handleToggleCart = () => {
    isCartOpen.value = !isCartOpen.value;
  };

  const handleClickOutside = () => {
    isCartOpen.value = false;
  };

  const handleRemoveCartItem = (productId: string | undefined) => {
    if (!productId) return;
    store.dispatch("removeFromCart", { productId });
  };

  return {
    cartItems,
    total,
    cartItemsCount,
    isCartOpen,

    handleToggleCart,
    handleClickOutside,
    handleRemoveCartItem,
  };
}

export default useCart;
