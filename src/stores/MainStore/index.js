import getters from './getters';
import mutations from './mutations';

export const initialState = {
  configurationLoading: false,
  configurationLoaded: false,
  user: {},
  permissions: [],
  isAnyRequestLoading: 0,
  languages: [],
};

export default {
  namespaced: true,
  state: { ...initialState },
  getters,
  mutations,
};
