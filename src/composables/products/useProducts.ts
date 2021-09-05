import { computed } from "vue";

import useStore from "@/composables/common/useStore";
import { formatCurrency } from "@/utils";

function useProducts() {
  const store = useStore();

  const products = computed(() =>
    store.state.Products.map((product) => ({
      ...product,
      BasePrice: formatCurrency(product.BasePrice),
    })),
  );

  return { products };
}

export default useProducts;
