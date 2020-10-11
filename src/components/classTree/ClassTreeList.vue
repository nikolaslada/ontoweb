<template>
  <div>
    <b>Class Tree List</b>
    <ClassTree
      :tree="tree"
    >
    </ClassTree>
  </div>
</template>

<script>
import ClassTree from './ClassTree.vue';

export default {
  name: 'ClassTreeList',
  props: {
    tree: {
      type: Object,
      required: true,
    },
  },
  components: {
    ClassTree,
  },
};
</script>
