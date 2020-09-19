import {
  GET_CLASS_NODE,
  SET_CLASS_NODE,
} from './constants';

import {
  getClassNode,
} from '../../conf/endpoints';

export default {
  async [GET_CLASS_NODE]({ commit }, id) {
    const { data = {} } = await getClassNode(id);
    commit(SET_CLASS_NODE, data);
  },

};
