import {
  DEFAULT_PAGE_SIZE,
} from '../../conf/constants';

import {
  SET_LOADING,
  FETCH_MY_ONTOLOGY_LIST,
  SET_PAGINATION,
  SET_LIST,
} from './constants';

import {
  getMyOntologyList,
} from '../../conf/endpoints';

export default {
  async [FETCH_MY_ONTOLOGY_LIST](
    { commit },
    {
      offset = null,
      limit = null,
      useLoader = true,
      pageSize = DEFAULT_PAGE_SIZE,
    } = {},
  ) {
    if (useLoader) {
      commit(SET_LOADING, true);
    }

    const pagination = {};
    const { data } = await getMyOntologyList(offset, limit);
    const { ontologyList = [], responseOffset = 0, totalCount = 0 } = data[0];

    if (totalCount && pageSize) {
      const modulo = totalCount % pageSize;
      if (modulo) {
        pagination.count = (totalCount + pageSize - modulo) / pageSize;
      } else {
        pagination.count = totalCount / pageSize;
      }

      const currentPages = responseOffset + pageSize;
      if (!(currentPages % pageSize)) {
        pagination.current = currentPages / pageSize;
      }
    }

    commit(SET_PAGINATION, pagination);
    commit(SET_LIST, ontologyList);

    if (useLoader) {
      commit(SET_LOADING, false);
    }
  },

};
