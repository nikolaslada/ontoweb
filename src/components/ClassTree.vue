<template>
  <div>
    <ul>
      <RecursiveClass
        :node="tree"
      >
      </RecursiveClass>
    </ul>
  </div>
</template>

<script>
import RecursiveClass from './RecursiveClass.vue';

export default {
  name: 'tree',
  props: {
    tree: Object,
  },
  components: {
    RecursiveClass,
  },
};
</script>
