import { computed } from "vue";

import useStore from "@/composables/common/useStore";

function useCompany() {
  const store = useStore();
  const company = computed(() => store.state.company.data);
  const isLoading = computed(() => store.state.company.isLoading);
  const isError = computed(() => store.state.company.isError);
  return { company, isLoading, isError };
}

export default useCompany;
