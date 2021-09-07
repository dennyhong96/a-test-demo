import { Company } from "@/types/Company";

export interface CompanyState {
  data: Company | null;
  isLoading: boolean;
  isError: boolean;
}

export const state: () => CompanyState = () => ({
  data: null,
  isLoading: true,
  isError: false,
});

const getters = {};

const actions = {};

const mutations = {
  companyLoaded(state: CompanyState, { company }: { company: Company }) {
    state.data = company;
    state.isLoading = false;
  },

  requestError(state: CompanyState) {
    state.isError = true;
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
