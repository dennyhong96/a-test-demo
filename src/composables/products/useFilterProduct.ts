import { computed } from "vue";

import useStore from "@/composables/common/useStore";
import { debounce } from "@/utils";

function useFilterProducts() {
  const store = useStore();
  const filter = computed(() => store.state.filter);

  const handleFilterChange = debounce((newFilter: string) => {
    store.dispatch("filterProducts", { filter: newFilter });
  }, 500);

  const handleClearFilter = () => {
    store.dispatch("filterProducts", { filter: "" });
  };

  return { filter, handleFilterChange, handleClearFilter };
}

export default useFilterProducts;
