import { createStore, ActionContext, Store } from "vuex";
import { InjectionKey } from "vue";

import { Company } from "@/types/Company";
import { Product } from "@/types/Product";
import { SalesRep } from "@/types/SalesRep";
import { Cart } from "@/types/Cart";
import { REQUEST_URL } from "@/constants";
import { generateLogoSrc } from "@/utils";

export interface State {
  Products: Product[];
  SalesRep: SalesRep | null;
  Company: Company | null;
  Cart: Cart;
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
    Cart: {},
  },

  mutations: {
    loadData(state, payload: State): void {
      state.Products = payload.Products;
      state.SalesRep = payload.SalesRep;
      state.Company = payload.Company;
    },

    addToCart(state, { productId, quantity }) {
      if (state.Cart[productId]) {
        state.Cart = {
          ...state.Cart,
          [productId]: state.Cart[productId] + quantity,
        };
      } else {
        state.Cart = {
          ...state.Cart,
          [productId]: quantity,
        };
      }

      state.Products = state.Products.map((product) =>
        product.ItemID === productId
          ? { ...product, OnHandQuantity: product.OnHandQuantity - quantity }
          : product
      );
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
          logoSrc: generateLogoSrc(data.ManufacturerID),
        },
      });
    },

    addToCart(context: ActionContext<State, State>, { productId, quantity }) {
      const cartItem = context.state.Products.find(
        (product) => product.ItemID === productId
      );

      if (!cartItem) return;

      if (quantity > cartItem.OnHandQuantity) {
        return alert(
          `Not enough quantity. There are only ${cartItem.OnHandQuantity} ${cartItem.ItemName} left.`
        );
      }

      context.commit("addToCart", {
        productId,
        quantity,
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
