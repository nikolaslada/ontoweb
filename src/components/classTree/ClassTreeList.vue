<template>
  <div class="text-left">
    <h2>Class Tree List</h2>
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
