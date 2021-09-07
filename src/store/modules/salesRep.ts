import { SalesRep } from "@/types/SalesRep";

export interface SalesRepState {
  data: SalesRep | null;
  isLoading: boolean;
  isError: boolean;
}

export const state: () => SalesRepState = () => ({
  data: null,
  isLoading: true,
  isError: false,
});

const getters = {};

const actions = {};

const mutations = {
  salesRepLoaded(state: SalesRepState, { salesRep }: { salesRep: SalesRep }) {
    state.data = salesRep;
    state.isLoading = false;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
