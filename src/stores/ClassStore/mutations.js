import Vue from 'vue';

import {
  SET_LOADING,
  SET_TREE,
  SET_TREE_COUNT,
  UPDATE_CLASS_NODE,
} from './constants';

export default {
  [SET_LOADING](state, value) {
    const counter = state.loaderCount + (value ? 1 : -1);

    if (counter < 0) {
      console.warn('Wrong count of SET_LOADING mutations');
    }

    Vue.set(state, 'loaderCount', counter);
  },
  [SET_TREE](state, values) {
    Vue.set(state, 'classTree', values);
  },
  [SET_TREE_COUNT](state, values) {
    Vue.set(state, 'count', values);
  },
  [UPDATE_CLASS_NODE](state, value) {
    Vue.set(state, 'classNode', value);
  },
};
