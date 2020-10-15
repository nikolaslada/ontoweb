<template>
  <div class="container-fluid">
    <div class="row" >
      <div class="col-sm-3">
        <ClassTreeList
          v-if="count"
          :tree="classTree"
        />
      </div>
      <div class="col-sm-9">
        <ClassDetail/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ClassTreeList from '../components/classTree/ClassTreeList.vue';
import ClassDetail from '../components/class/ClassDetail.vue';

import {
  FETCH_CLASS_TREE,
} from '../stores/ClassStore/constants';

export default {
  name: 'Classes',
  components: {
    ClassTreeList,
    ClassDetail,
  },
  mounted() {
    if (this.selected.id) {
      this.fetchClassTree({
        ontologyId: this.selected.id,
      });
    }
  },
  computed: {
    ...mapState('MyOntologyStore', [
      'selected',
    ]),

    ...mapState('ClassStore', [
      'classTree',
      'count',
    ]),

  },
  methods: {
    ...mapActions('ClassStore', {
      fetchClassTree: FETCH_CLASS_TREE,
    }),

  },
};
</script>
