import { Product, ProductSortBy } from "@/types/Product";
import { formatCurrency } from "@/utils";
import { ActionContext } from "vuex";
import { State } from "..";

export interface ProductsState {
  data: {
    productsList: Product[];
    filter: string;
    sort: ProductSortBy;
  };
  isLoading: boolean;
  isError: boolean;
}

export const state: () => ProductsState = () => ({
  data: {
    productsList: [],
    filter: "",
    sort: "DEFAULT",
  },
  isLoading: true,
  isError: false,
});

const getters = {
  getProductByItemId: (state: ProductsState) => (itemId: string) => {
    const foundProduct = state.data.productsList.find((p) => p.ItemID === itemId);
    if (!foundProduct) return null;
    return {
      ...foundProduct,
      BasePrice: formatCurrency(foundProduct.BasePrice),
      OnHandQuantity: foundProduct.OnHandQuantity <= 0 ? 0 : foundProduct.OnHandQuantity,
    };
  },
};

const actions = {
  sortProducts(
    context: ActionContext<ProductsState, State>,
    { sortBy }: { sortBy: ProductSortBy },
  ) {
    if (sortBy === context.state.data.sort) return;
    context.commit("sortProducts", { sortBy });
  },

  filterProducts(context: ActionContext<ProductsState, State>, { filter }: { filter: string }) {
    if (filter === context.state.data.filter) return;

    context.commit("filterProducts", { filter });
  },
};

const mutations = {
  productsLoaded(state: ProductsState, { products }: { products: Product[] }) {
    state.data.productsList = products;
    state.isLoading = false;
  },

  requestError(state: ProductsState) {
    state.isError = true;
    state.isLoading = false;
  },

  sortProducts(state: ProductsState, { sortBy }: { sortBy: ProductSortBy }) {
    state.data.sort = sortBy;
  },

  filterProducts(state: ProductsState, { filter }: { filter: string }) {
    state.data.filter = filter;
  },

  addToCart(
    state: ProductsState,
    { productId, quantity }: { productId: string; quantity: number },
  ) {
    state.data.productsList = state.data.productsList.map((product) =>
      product.ItemID === productId
        ? { ...product, OnHandQuantity: product.OnHandQuantity - quantity }
        : product,
    );
  },

  removeFromCart(
    state: ProductsState,
    { productId, quantity }: { productId: string; quantity: number },
  ) {
    state.data.productsList = state.data.productsList.map((product) =>
      product.ItemID === productId
        ? { ...product, OnHandQuantity: product.OnHandQuantity + quantity }
        : product,
    );
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
