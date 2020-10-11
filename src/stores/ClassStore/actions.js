import {
  SET_LOADING,
  FETCH_CLASS_TREE,
  SET_TREE_COUNT,
  SET_TREE,
  GET_CLASS_NODE,
  SET_CLASS_NODE,
} from './constants';

import {
  getClassTree,
  getClassNode,
} from '../../conf/endpoints';

export default {
  async [FETCH_CLASS_TREE](
    { commit },
    {
      ontologyId,
      useLoader = true,
    } = {},
  ) {
    if (useLoader) {
      commit(SET_LOADING, true);
    }

    const { data } = await getClassTree(ontologyId);
    const { count = 0, tree = [] } = data[0];

    commit(SET_TREE_COUNT, count);
    commit(SET_TREE, tree[0] || null);

    if (useLoader) {
      commit(SET_LOADING, false);
    }
  },

  async [GET_CLASS_NODE]({ commit }, id) {
    const { data = {} } = await getClassNode(id);
    commit(SET_CLASS_NODE, data);
  },

};
