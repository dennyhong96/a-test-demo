import { createStore, Store, StoreOptions, createLogger, ActionContext } from "vuex";
import { InjectionKey } from "vue";

import { Company } from "@/types/Company";
import { Product } from "@/types/Product";
import { SalesRep } from "@/types/SalesRep";

import products, { ProductsState } from "@/store/modules/products";
import cart, { CartState } from "@/store/modules/cart";
import company, { CompanyState } from "@/store/modules/company";
import salesRep, { SalesRepState } from "@/store/modules/salesRep";
import { generateLogoSrc } from "@/utils";
import { REQUEST_URL } from "@/constants";

export interface State {
  products: ProductsState;
  cart: CartState;
  company: CompanyState;
  salesRep: SalesRepState;
}

interface ResponseData extends Company {
  items: Product[];
  SalesRep: SalesRep;
}

const isDevMode = process.env.NODE_ENV === "development";

export const key: InjectionKey<Store<State>> = Symbol();

export const storeOptions: StoreOptions<State> = {
  modules: {
    products,
    cart,
    company,
    salesRep,
  },

  actions: {
    // NOTE: In a more real world setting, I would use this action to kick off multiple network request actions
    // in sub-modules to get their own data from differnt API endpoints, instead of having just one request for all data
    async loadData(context: ActionContext<State, State>) {
      try {
        const res = await fetch(REQUEST_URL);
        if (!res.ok) throw new Error("Request failed.");

        const data: ResponseData = await res.json();

        context.commit("products/productsLoaded", {
          products: data.items,
        });

        context.commit("company/companyLoaded", {
          company: {
            CompanyName: data.CompanyName,
            ManufacturerID: data.ManufacturerID,
            Message: data.Message,
            logoSrc: generateLogoSrc(data.ManufacturerID),
          },
        });

        context.commit("salesRep/salesRepLoaded", {
          salesRep: data.SalesRep,
        });
      } catch (error) {
        // NOTE: In a more real world setting, each network request action in sub-module would commit their own error
        context.commit("products/requestError");
        context.commit("company/requestError");
        context.commit("salesRep/requestError");
      }
    },
  },

  getters: {
    isGlobalLoading: (state: State) => () => {
      return state.company.isLoading || state.products.isLoading || state.salesRep.isLoading;
    },

    isGloabalError: (state: State) => () => {
      return state.company.isError || state.products.isError || state.salesRep.isError;
    },
  },

  strict: isDevMode,
  plugins: isDevMode ? [createLogger()] : [],
};

export default createStore<State>(storeOptions);
