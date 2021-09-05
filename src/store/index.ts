import { createStore, ActionContext, Store, StoreOptions } from "vuex";
import { InjectionKey } from "vue";

import { Company } from "@/types/Company";
import { Product } from "@/types/Product";
import { SalesRep } from "@/types/SalesRep";
import { Cart, CartItem } from "@/types/Cart";
import { REQUEST_URL } from "@/constants";
import { formatCurrency, generateLogoSrc } from "@/utils";

export interface State {
  Products: Product[];
  SalesRep: SalesRep | null;
  Company: Company | null;
  Cart: Cart;
  isLoading: boolean;
}

interface ResponseData extends Company {
  items: Product[];
  SalesRep: SalesRep;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const storeOptions: StoreOptions<State> = {
  state: {
    Products: [],
    Company: null,
    SalesRep: null,
    Cart: {},
    isLoading: true,
  },

  mutations: {
    loadData(state, payload: State): void {
      state.Products = payload.Products;
      state.SalesRep = payload.SalesRep;
      state.Company = payload.Company;
      state.isLoading = false;
    },

    // Cart mutations
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
          : product,
      );
    },

    removeFromCart(state, { productId }) {
      if (!state.Cart[productId]) return;

      const quantity = state.Cart[productId];

      const newCart = { ...state.Cart };
      delete newCart[productId];

      state.Cart = newCart;

      state.Products = state.Products.map((product) =>
        product.ItemID === productId
          ? { ...product, OnHandQuantity: product.OnHandQuantity + quantity }
          : product,
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

    // Cart actions
    addToCart(context: ActionContext<State, State>, { productId, quantity }) {
      const cartItem = context.state.Products.find((product) => product.ItemID === productId);

      if (!cartItem) return;
      if (quantity > cartItem.OnHandQuantity) {
        return alert(
          `Not enough quantity. There are only ${cartItem.OnHandQuantity} ${cartItem.ItemName} left.`,
        );
      }

      context.commit("addToCart", {
        productId,
        quantity,
      });
    },

    removeFromCart(context: ActionContext<State, State>, { productId }) {
      const cartItem = context.state.Products.find((product) => product.ItemID === productId);
      const quantity = context.state.Cart[productId];

      if (!cartItem || !quantity) return;

      const confirmed = confirm(
        `Are you sure your want to remove ${quantity} units of '${cartItem.ItemName}' from cart?`,
      );
      if (!confirmed) return;

      context.commit("removeFromCart", {
        productId,
      });
    },
  },

  getters: {
    // Product getters
    getProductByItemId: (state) => (itemId: string) => {
      const foundProduct = state.Products.find((p) => p.ItemID === itemId);
      if (!foundProduct) return null;
      return {
        ...foundProduct,
        BasePrice: formatCurrency(foundProduct.BasePrice),
        OnHandQuantity: foundProduct.OnHandQuantity <= 0 ? 0 : foundProduct.OnHandQuantity,
      };
    },

    // Cart getters
    listCartItems: (state) => () => {
      return Object.entries(state.Cart)
        .map(([productId, quantity]) => {
          const cartItem = state.Products.find((product) => product.ItemID === productId);
          if (!cartItem) return;
          return {
            ...cartItem,
            cartQuantity: quantity,
            lineTotal: formatCurrency((cartItem?.BasePrice ?? 0) * quantity),
          };
        })
        .filter(Boolean) as CartItem[];
    },

    getCartTotal: (state, getters) => () => {
      const cartItems: CartItem[] = getters.listCartItems();
      const sum = cartItems.reduce((accumulator, currentItem) => {
        return accumulator + (currentItem.BasePrice ?? 0) * currentItem.cartQuantity;
      }, 0);
      return formatCurrency(sum);
    },

    countCartItems: (state, getters) => () => {
      const cartItems: CartItem[] = getters.listCartItems();
      return cartItems.reduce((accumulator, currentCartItem) => {
        return accumulator + currentCartItem.cartQuantity;
      }, 0);
    },
  },
};

export default createStore<State>(storeOptions);
