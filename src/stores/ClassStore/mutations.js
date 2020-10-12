import Vue from 'vue';
import ClassDetailFactory from '../../model/ClassDetailFactory';

import {
  SET_LOADING,
  SET_TREE,
  SET_TREE_COUNT,
  SET_CLASS_DETAIL,
  SET_SELECTED_CLASS_ID,
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
  [SET_CLASS_DETAIL](state, value) {
    const classDetail = ClassDetailFactory.createClassDetail(value);
    Vue.set(state, 'classDetail', classDetail);
  },
  [SET_SELECTED_CLASS_ID](state, values) {
    Vue.set(state, 'selectedClassId', values);
  },
};
