import { useRoute } from "vue-router";

import useProduct from "@/composables/products/useProduct";

function useProductByRoute() {
  const route = useRoute();
  return useProduct(route.params.itemId as string);
}

export default useProductByRoute;
