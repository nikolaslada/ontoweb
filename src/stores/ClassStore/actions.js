import {
  FETCH_CLASS_DETAIL,
  FETCH_CLASS_TREE,
  SET_CLASS_DETAIL,
  SET_LOADING,
  SET_TREE_COUNT,
  SET_TREE,
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

  async [FETCH_CLASS_DETAIL](
    { commit },
    {
      id,
      useLoader = true,
    } = {},
  ) {
    if (useLoader) {
      commit(SET_LOADING, true);
    }

    const { data } = await getClassNode(id);
    const classNode = data[0];

    commit(SET_CLASS_DETAIL, classNode);

    if (useLoader) {
      commit(SET_LOADING, false);
    }
  },

};
