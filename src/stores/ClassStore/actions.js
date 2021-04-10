import ClassDetailFactory from '../../model/ClassDetailFactory';

import {
  FETCH_CLASS_DETAIL,
  FETCH_CLASS_TREE,
  SET_CLASS_DETAIL,
  SET_LOADING,
  SET_TREE_COUNT,
  SET_TREE,
  SET_CONDITION_WHISPER_LIST,
  CHECK_CONDITION,
} from './constants';

import {
  getClassTree,
  getClassNode,
  checkCondition,
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

  async [CHECK_CONDITION](
    { commit, state },
    {
      id,
      condition = {},
      useLoader = true,
    } = {},
  ) {
    if (useLoader) {
      commit(SET_LOADING, true);
    }

    const {
      data: [
        { condition: conditionResponse },
        { conditionWhisperList = [] },
      ],
    } = await checkCondition(id, condition);

    const { classDetail } = state;
    classDetail.condition = conditionResponse;

    commit(SET_CLASS_DETAIL, classDetail);
    commit(SET_CONDITION_WHISPER_LIST, ClassDetailFactory.createWhisperList(conditionWhisperList));

    if (useLoader) {
      commit(SET_LOADING, false);
    }
  },

};
