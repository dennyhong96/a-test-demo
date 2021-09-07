import { computed } from "vue";

import useStore from "@/composables/common/useStore";

function useSalesRep() {
  const store = useStore();
  const salesRep = computed(() => store.state.salesRep.data);
  const isLoading = computed(() => store.state.salesRep.isLoading);
  const isError = computed(() => store.state.salesRep.isError);
  return { salesRep, isLoading, isError };
}

export default useSalesRep;
