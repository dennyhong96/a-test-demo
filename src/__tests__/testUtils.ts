import "isomorphic-fetch";
import "@testing-library/jest-dom";
import { render } from "@testing-library/vue";
import { createStore } from "vuex";
import { createRouter, createWebHistory } from "vue-router";

import { storeOptions, key } from "@/store";
import { routes } from "@/router";
import clickOutside from "@/lib/clickOutside";

const customRender = (ui: any) => {
  const store = createStore(storeOptions);
  const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
  });

  return render(ui, {
    global: {
      provide: {
        [key as symbol]: store,
      },
      plugins: [router],
      directives: {
        "click-outside": clickOutside,
      },
    },
  });
};

export * from "@testing-library/vue";

export { customRender as render };
