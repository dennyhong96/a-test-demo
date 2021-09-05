import { computed } from "vue";

import useStore from "@/composables/common/useStore";
import { Product } from "@/types/Product";

function useProduct(productId: string) {
  const store = useStore();

  const product = computed<Product>(() => {
    return store.getters.getProductByItemId(productId);
  });

  return { product };
}

export default useProduct;
