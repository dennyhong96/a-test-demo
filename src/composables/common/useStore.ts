import { Store, useStore as _useStore } from "vuex";

import { key, State } from "@/store";

function useStore(): Store<State> {
  return _useStore(key);
}

export default useStore;
