import Vue from 'vue';

import {
  SET_LOADING,
  SET_LIST,
  SET_PAGINATION,
  SET_ACTIVE,
} from './constants';

export default {
  [SET_LOADING](state, value) {
    const counter = state.loaderCount + (value ? 1 : -1);

    if (counter < 0) {
      console.warn('Wrong count of SET_LOADING mutations');
    }

    Vue.set(state, 'loaderCount', counter);
  },
  [SET_LIST](state, values) {
    Vue.set(state, 'list', values);
  },
  [SET_PAGINATION](state, values) {
    Vue.set(state, 'pagination', values);
  },
  [SET_ACTIVE](state, values) {
    Vue.set(state, 'active', values);
  },
};
