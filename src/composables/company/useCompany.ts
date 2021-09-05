import { computed } from "vue";

import useStore from "@/composables/common/useStore";

function useCompany() {
  const store = useStore();
  const company = computed(() => store.state.Company);
  return company;
}

export default useCompany;
