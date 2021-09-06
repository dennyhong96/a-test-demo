import { computed } from "vue";

import useStore from "@/composables/common/useStore";
import { ProductSortBy } from "@/types/Product";

function useSortProducts() {
  const store = useStore();
  const sortBy = computed(() => store.state.sort);

  const handleSort = (newSortBy: ProductSortBy) => {
    store.dispatch("sortProducts", { sortBy: newSortBy });
  };

  return { sortBy, handleSort };
}

export default useSortProducts;
