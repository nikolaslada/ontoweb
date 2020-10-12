<template>
  <li>
    <a
      href
      @click.prevent="selectClass(node.id)"
    >
      <span>{{ node.name }}</span>
    </a>
    <ul v-if="node.nodes && node.nodes.length">

      <RecursiveClass
        v-for="child in node.nodes"
        :node="child"
        :key="child.id"
      >
      </RecursiveClass>
    </ul>
  </li>
</template>

<script>
import { mapMutations } from 'vuex';

import {
  SET_SELECTED_CLASS_ID,
} from '../stores/ClassStore/constants';

export default {
  name: 'RecursiveClass',
  props: {
    node: Object,
  },
  methods: {
    ...mapMutations('ClassStore', {
      setSelectedClassId: SET_SELECTED_CLASS_ID,
    }),

    selectClass(id) {
      if (id && Number.isInteger(id)) {
        this.setSelectedClassId(id);
      }
    },
  },
};
</script>
