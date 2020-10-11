<template>
  <div class="home">
    <ClassTreeList
      v-if="count"
      :tree="classTree"
    />
    <ClassItem/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ClassTreeList from '../components/classTree/ClassTreeList.vue';
import ClassItem from '../components/class/ClassItem.vue';

import {
  FETCH_CLASS_TREE,
} from '../stores/ClassStore/constants';

export default {
  name: 'Classes',
  components: {
    ClassTreeList,
    ClassItem,
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
