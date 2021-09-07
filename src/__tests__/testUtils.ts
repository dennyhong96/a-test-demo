import "isomorphic-fetch";
import "@testing-library/jest-dom";
import { render, RenderOptions } from "@testing-library/vue";
import { createStore, StoreOptions } from "vuex";
import { createRouter, createWebHistory } from "vue-router";
import merge from "lodash.merge";

import { storeOptions, key, State } from "@/store";
import { routes } from "@/router";
import clickOutside from "@/lib/clickOutside";

const customRender = (
  ui: any,
  {
    storeOptionsOverrite,
    renderOptions,
  }: {
    storeOptionsOverrite?: StoreOptions<Partial<State>>;
    renderOptions?: Partial<RenderOptions>;
  } = {},
) => {
  const store = createStore(merge(storeOptions, storeOptionsOverrite) as StoreOptions<State>);
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
    ...renderOptions,
  });
};

export * from "@testing-library/vue";

export { customRender as render };
