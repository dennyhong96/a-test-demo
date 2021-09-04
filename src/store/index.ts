import { createStore, ActionContext, Store } from "vuex";
import { InjectionKey } from "vue";

import { Company } from "@/types/Company";
import { Product } from "@/types/Product";
import { SalesRep } from "@/types/SalesRep";
import { REQUEST_URL } from "@/constants";

export interface State {
  Products: Product[];
  SalesRep: SalesRep | null;
  Company: Company | null;
}

interface ResponseData extends Company {
  items: Product[];
  SalesRep: SalesRep;
}

export const key: InjectionKey<Store<State>> = Symbol();

export default createStore<State>({
  state: {
    Products: [],
    Company: null,
    SalesRep: null,
  },

  mutations: {
    loadData(state, payload: State): void {
      state.Products = payload.Products;
      state.SalesRep = payload.SalesRep;
      state.Company = payload.Company;
    },
  },

  actions: {
    async loadData(context: ActionContext<State, State>) {
      const res = await fetch(REQUEST_URL);
      const data: ResponseData = await res.json();

      context.commit("loadData", {
        Products: data.items,
        SalesRep: data.SalesRep,
        Company: {
          CompanyName: data.CompanyName,
          ManufacturerID: data.ManufacturerID,
          Message: data.Message,
        },
      });
    },
  },

  getters: {
    listProducts(state) {
      return state.Products;
    },

    getProductByItemId: (state) => (itemId: string) => {
      return state.Products.find((product) => product.ItemID === itemId);
    },

    getSalesRep(state) {
      return state.SalesRep;
    },

    getCompany(state) {
      return state.Company;
    },
  },
});
