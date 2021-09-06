import { computed } from "vue";
import Fuse from "fuse.js";

import useStore from "@/composables/common/useStore";
import useSortProduct from "@/composables/products/useSortProduct";
import useFilterProduct from "@/composables/products/useFilterProduct";
import { formatCurrency } from "@/utils";
import { Product } from "@/types/Product";

function useProducts() {
  const store = useStore();
  const { sortBy } = useSortProduct();
  const { filter } = useFilterProduct();

  type SearchKey = keyof Product;

  const products = computed(() => {
    let filteredProducts = [...store.state.Products];

    // Fuzzy search
    if (filter.value !== "") {
      const fuse = new Fuse(filteredProducts, {
        keys: ["ItemName", "Description"] as SearchKey[],
        threshold: 0.5,
      });
      filteredProducts = fuse.search(filter.value).map((result) => result.item);
    }

    return filteredProducts
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
      }));
  });

  return { products };
}

export default useProducts;
