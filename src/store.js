import Vue from 'vue';
import Vuex from 'vuex';

import MainStore from './stores/MainStore';
import ClassStore from './stores/ClassStore';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    MainStore,
    ClassStore,
  },
});
