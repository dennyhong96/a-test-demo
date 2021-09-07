import { computed } from "vue";

import useStore from "@/composables/common/useStore";
import { ProductSortBy } from "@/types/Product";

function useSortProducts() {
  const store = useStore();
  const sortBy = computed(() => store.state.products.data.sort);

  const handleSort = (newSortBy: ProductSortBy) => {
    store.dispatch("products/sortProducts", { sortBy: newSortBy });
  };

  return { sortBy, handleSort };
}

export default useSortProducts;
