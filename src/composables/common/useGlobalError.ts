import { computed } from "vue";

import useStore from "@/composables/common/useStore";

function useGlobalError() {
  const store = useStore();
  const isGlobalError = computed<boolean>(() => store.getters.isGloabalError());
  return { isGlobalError };
}

export default useGlobalError;
