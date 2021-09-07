import { Cart, CartItem } from "@/types/Cart";
import { formatCurrency } from "@/utils";
import { ActionContext } from "vuex";
import { State } from "..";

export interface CartState {
  data: Cart;
}

export const state: () => CartState = () => ({
  data: {},
});

// getters
const getters = {
  listCartItems: (state: CartState, _: any, rootState: State) => () => {
    return Object.entries(state.data)
      .map(([productId, quantity]) => {
        const cartItem = rootState.products.data.productsList.find(
          (product) => product.ItemID === productId,
        );
        if (!cartItem) return;
        return {
          ...cartItem,
          cartQuantity: quantity,
          lineTotal: formatCurrency((cartItem?.BasePrice ?? 0) * quantity),
        };
      })
      .filter(Boolean) as CartItem[];
  },

  getCartTotal: (state: CartState, getters: any) => () => {
    const cartItems: CartItem[] = getters.listCartItems();
    const sum = cartItems.reduce((accumulator, currentItem) => {
      return accumulator + (currentItem.BasePrice ?? 0) * currentItem.cartQuantity;
    }, 0);
    return formatCurrency(sum);
  },

  countCartItems: (state: CartState, getters: any) => () => {
    const cartItems: CartItem[] = getters.listCartItems();
    return cartItems.reduce((accumulator, currentCartItem) => {
      return accumulator + currentCartItem.cartQuantity;
    }, 0);
  },
};

// actions
const actions = {
  addToCart(
    context: ActionContext<CartState, State>,
    { productId, quantity }: { productId: string; quantity: number },
  ) {
    const cartItem = context.rootState.products.data.productsList.find(
      (product) => product.ItemID === productId,
    );

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

    context.commit("products/addToCart", { productId, quantity }, { root: true });
  },

  removeFromCart(context: ActionContext<CartState, State>, { productId }: { productId: string }) {
    const cartItem = context.rootState.products.data.productsList.find(
      (product) => product.ItemID === productId,
    );
    const quantity = context.state.data[productId];

    if (!cartItem || !quantity) return;

    const confirmed = window.confirm(
      `Are you sure your want to remove ${quantity} units of '${cartItem.ItemName}' from cart?`,
    );
    if (!confirmed) return;

    context.commit("removeFromCart", {
      productId,
    });

    context.commit("products/removeFromCart", { productId, quantity }, { root: true });
  },
};

// mutations
const mutations = {
  addToCart(state: CartState, { productId, quantity }: { productId: string; quantity: number }) {
    if (state.data[productId]) {
      state.data = {
        ...state.data,
        [productId]: state.data[productId] + quantity,
      };
    } else {
      state.data = {
        ...state.data,
        [productId]: quantity,
      };
    }
  },

  removeFromCart(state: CartState, { productId }: { productId: string }) {
    if (!state.data[productId]) return;

    const newCart = { ...state.data };
    delete newCart[productId];

    state.data = newCart;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
