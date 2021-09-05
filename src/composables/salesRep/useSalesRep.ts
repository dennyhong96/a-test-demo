import { computed } from "vue";

import useStore from "@/composables/common/useStore";

function useSalesRep() {
  const store = useStore();
  const salesRef = computed(() => store.state.SalesRep);
  return salesRef;
}

export default useSalesRep;
