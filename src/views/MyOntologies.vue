<template>
  <div class="container">
    <MyOntologyList/>
  </div>
</template>

<script>
import MyOntologyList from '../components/ontologies/MyOntologyList.vue';

export default {
  name: 'MyOntologies',
  components: {
    MyOntologyList,
  },
};
</script>
