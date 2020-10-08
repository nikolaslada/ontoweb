import Vue from 'vue';

import {
  UPDATE_CLASS_NODE,
} from './constants';

export default {
  [UPDATE_CLASS_NODE](state, value) {
    Vue.set(state, 'classNode', value);
  },
};
