import Vue from 'vue';

import {
  REQUEST_START,
  REQUEST_END,
} from './constants';

export default {
  [REQUEST_START](state) {
    Vue.set(state, 'isAnyRequestLoading', state.isAnyRequestLoading + 1);
  },
  [REQUEST_END](state) {
    const counter = state.isAnyRequestLoading - 1;
    Vue.set(state, 'isAnyRequestLoading', (counter < 0) ? 0 : counter);
  },

};
