<template>
  <div>
    <table class="table table-sm table-striped table-responsive">
      <thead class="thead-dark">
        <tr>
          <th rowspan="2" scope="col">Ontology name</th>
          <th colspan="3" scope="col">Stats</th>
          <th rowspan="2" scope="col">Actions</th>
        </tr>
        <tr>
          <th scope="col" class="text-center">Classes</th>
          <th scope="col" class="text-center">Properties</th>
          <th scope="col" class="text-center">Individuals</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="v in list"
          :key="v.id"
        >
          <td v-if="v.name.length < MAX_GRID_VALUE_LENGTH + 1" class="text-left">
            {{ v.name }}
          </td>
          <td v-else :title="v.name" class="text-left">
            {{ `${v.name.substring(0, MAX_GRID_VALUE_LENGTH)}...` }}
          </td>

          <td v-if="Number.isInteger(v.classCount)" class="text-right">
            {{ numberFormat.format(v.classCount) }}
          </td>
          <td v-else class="text-right">
            {{ NO_NUMBER_REPLACEMENT }}
          </td>

          <td v-if="Number.isInteger(v.propertyCount)" class="text-right">
            {{ numberFormat.format(v.propertyCount) }}
          </td>
          <td v-else class="text-right">
            {{ NO_NUMBER_REPLACEMENT }}
          </td>

          <td v-if="Number.isInteger(v.individualCount)" class="text-right">
            {{ numberFormat.format(v.individualCount) }}
          </td>
          <td v-else class="text-right">
            {{ NO_NUMBER_REPLACEMENT }}
          </td>

          <td>
            <button
              v-if="isOntologyActive(v.id)"
              class="btn btn-sm disabled"
            >
              Active
              <b-icon-toggle2-on>
              </b-icon-toggle2-on>
            </button>

            <button
              v-else
              @click="activateOntologyById(v.id)"
              class="btn btn-sm btn-primary"
            >
              Activate
              <b-icon-toggle2-off>
              </b-icon-toggle2-off>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <Pager
      :uid="'my-ontologies'"
      :pageList="getPageList"
      :currentPage="getCurrentPage"
      :lastPage="getLastPage"
      @change-my-ontologies-page="changeMyOntologiesPage"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Pager from '../Pager.vue';
import PageListFactory from '../../model/PageListFactory';

import {
  DEFAULT_PAGE_SIZE,
  MAX_GRID_VALUE_LENGTH,
  MAX_PAGER_SIZE,
  NO_NUMBER_REPLACEMENT,
} from '../../conf/constants';

import {
  FETCH_MY_ONTOLOGY_LIST,
  UPDATE_ACTIVE,
} from '../../stores/MyOntologyStore/constants';

export default {
  name: 'MyOntologyList',
  components: {
    Pager,
  },
  data() {
    return {
      MAX_GRID_VALUE_LENGTH,
      NO_NUMBER_REPLACEMENT,
    };
  },
  created() {
    this.fetchMyOntologyList({
      offset: 0,
      limit: DEFAULT_PAGE_SIZE,
    });
  },
  computed: {
    ...mapState('MainStore', [
      'localeIso',
    ]),

    ...mapState('MyOntologyStore', [
      'list',
      'pagination',
      'active',
    ]),

    numberFormat() {
      return new Intl.NumberFormat(this.localeIso);
    },

    getPageList() {
      let pageList;

      if (!this.pagination.current || !this.pagination.count) {
        pageList = [];
      } else {
        pageList = PageListFactory.createPageList(
          this.pagination.current,
          this.pagination.count,
          MAX_PAGER_SIZE,
        );
      }

      return pageList;
    },

    getCurrentPage() {
      return this.pagination.current;
    },

    getLastPage() {
      return this.pagination.count;
    },
  },
  methods: {
    ...mapActions('MyOntologyStore', {
      fetchMyOntologyList: FETCH_MY_ONTOLOGY_LIST,
      updateActive: UPDATE_ACTIVE,
    }),

    isOntologyActive(id) {
      return this.active.id === id;
    },

    activateOntologyById(id) {
      this.updateActive({ id });
    },

    changeMyOntologiesPage(pageNumber) {
      if (!Number.isInteger(pageNumber)) {
        throw Error(`change-my-ontologies-page event is expecting integer pageNumber: ${pageNumber}.`);
      }

      this.fetchMyOntologyList({
        offset: DEFAULT_PAGE_SIZE * (pageNumber - 1),
        limit: DEFAULT_PAGE_SIZE,
      });
      return pageNumber;
    },
  },
};
</script>
