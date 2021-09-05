import { computed, ref } from "vue";

import useStore from "@/composables/common/useStore";
import { Product } from "@/types/Product";
import { pluralize } from "@/utils";
import { NOTIFICATION_DURATION } from "@/constants";

function useAddToCart(product: Product | undefined) {
  const store = useStore();

  const currentProduct = computed(() => product);

  const addToCartQuantity = ref(1);

  const numAddedToCart = ref(0);

  const handleReduceQty = () => {
    if (addToCartQuantity.value === 1) return;
    addToCartQuantity.value--;
  };

  const handleIncreaseQty = () => {
    if (addToCartQuantity.value === currentProduct.value?.OnHandQuantity) return;
    addToCartQuantity.value++;
  };

  let timeout: number;
  const handleSubmit = (evt: Event) => {
    evt.preventDefault();

    if (!currentProduct.value) return;
    if (addToCartQuantity.value < 1) return;
    if (addToCartQuantity.value > currentProduct.value?.OnHandQuantity) return;

    if (timeout) clearTimeout(timeout);

    store.dispatch("addToCart", {
      productId: currentProduct.value?.ItemID,
      quantity: addToCartQuantity.value,
    });

    numAddedToCart.value = addToCartQuantity.value;
    timeout = setTimeout(() => {
      numAddedToCart.value = 0;
    }, NOTIFICATION_DURATION);

    addToCartQuantity.value = 1;
  };

  const addedToCartNotification = computed(
    () => `${numAddedToCart.value} ${pluralize("unit", numAddedToCart.value)} added to your cart.`,
  );

  return {
    addToCartQuantity,
    numAddedToCart,
    addedToCartNotification,

    handleReduceQty,
    handleIncreaseQty,
    handleSubmit,
  };
}

export default useAddToCart;
