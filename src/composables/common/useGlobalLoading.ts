import { computed } from "vue";

import useStore from "@/composables/common/useStore";

function useGlobalLoading() {
  const store = useStore();
  const isGlobalLoading = computed<boolean>(() => store.getters.isGlobalLoading());
  return { isGlobalLoading };
}

export default useGlobalLoading;
