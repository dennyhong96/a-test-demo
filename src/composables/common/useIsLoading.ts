import { computed } from "vue";

import useStore from "@/composables/common/useStore";

function useIsLoading() {
  const store = useStore();

  const isLoading = computed(() => store.state.isLoading);

  return { isLoading };
}

export default useIsLoading;
