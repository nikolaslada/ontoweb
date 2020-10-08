<template>
  <div class="home">
    <ClassTreeList/>
    <ClassItem/>
  </div>
</template>

<script>
import ClassTreeList from '../components/classTree/ClassTreeList.vue';
import ClassItem from '../components/class/ClassItem.vue';

export default {
  name: 'Classes',
  components: {
    ClassTreeList,
    ClassItem,
  },
};
</script>
