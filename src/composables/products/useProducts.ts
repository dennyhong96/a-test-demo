import { computed } from "vue";

import useStore from "@/composables/common/useStore";
import useSort from "@/composables/products/useSortProduct";
import { formatCurrency } from "@/utils";

function useProducts() {
  const store = useStore();
  const { sortBy } = useSort();

  const products = computed(() =>
    [...store.state.Products]
      .sort((a, b) => {
        switch (sortBy.value) {
          case "PRICE_LOW": {
            return a.BasePrice - b.BasePrice;
          }
          case "PRICE_HIGH": {
            return b.BasePrice - a.BasePrice;
          }
          default: {
            return a.ItemName > b.ItemName ? 1 : -1;
          }
        }
      })
      .map((product) => ({
        ...product,
        BasePrice: formatCurrency(product.BasePrice),
      })),
  );

  return { products };
}

export default useProducts;
