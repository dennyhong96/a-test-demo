import { computed } from "vue";
import Fuse from "fuse.js";

import useStore from "@/composables/common/useStore";
import useSortProduct from "@/composables/products/useSortProduct";
import useFilterProduct from "@/composables/products/useFilterProduct";
import { formatCurrency } from "@/utils";

function useProducts() {
  const store = useStore();
  const { sortBy } = useSortProduct();
  const { filter } = useFilterProduct();

  const products = computed(() => {
    const list = [...store.state.Products];
    let results = list;

    if (filter.value !== "") {
      const options = {
        includeScore: true,
        keys: ["ItemName", "Description"],
      };
      const fuse = new Fuse(list, options);
      results = fuse.search(filter.value).map((res) => res.item);
    }

    return results
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
