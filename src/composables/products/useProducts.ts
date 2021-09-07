import { computed } from "vue";

import useStore from "@/composables/common/useStore";
import useSortProduct from "@/composables/products/useSortProduct";
import useFilterProduct from "@/composables/products/useFilterProduct";
import { formatCurrency, fuzzySearch } from "@/utils";

function useProducts() {
  const store = useStore();
  const { sortBy } = useSortProduct();
  const { filter } = useFilterProduct();

  const isLoading = computed(() => store.state.products.isLoading);
  const isError = computed(() => store.state.products.isError);
  const products = computed(() => {
    let filteredProducts = [...store.state.products.data.productsList];

    // Fuzzy search
    if (filter.value !== "") {
      filteredProducts = fuzzySearch({
        list: filteredProducts,
        searchTerm: filter.value,
        searhKeys: ["ItemName", "Description"],
      });
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

  return { products, isLoading, isError };
}

export default useProducts;
