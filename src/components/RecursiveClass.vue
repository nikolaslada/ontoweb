<template>
  <li>
    <span>{{ node.name }}</span>
    <ul v-if="node.children && node.children.length">

      <RecursiveClass
        v-for="child in node.children"
        :node="child"
        :key="child.name"
      >
      </RecursiveClass>
    </ul>
  </li>
</template>

<script>
export default {
  name: 'RecursiveClass',
  props: {
    node: Object,
  },
};
</script>
