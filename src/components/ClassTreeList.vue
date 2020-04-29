<template>
  <div>
    <b>Class Tree List</b>
    <ClassTree
      :tree="classTree"
    >
    </ClassTree>
  </div>
</template>

<script>
import ClassTree from './ClassTree.vue';

export default {
  components: {
    ClassTree,
  },
  data() {
    return {
      classTree: {
        name: 'owl:Thing',
        children: [
          {
            name: 'PrimitiveClass',
            children: [
              {
                name: 'PrimitiveClassA',
                children: [
                  {
                    name: 'PrimitiveClassAX',
                  },
                  {
                    name: 'PrimitiveClassAY',
                  },
                ],
              },
              {
                name: 'PrimitiveClassB',
                children: [
                  {
                    name: 'PrimitiveClassBX',
                  },
                ],
              },
            ],
          },
          {
            name: 'DefinableClass',
            children: [
              {
                name: 'DefinableClassA',
              },
              {
                name: 'DefinableClassB',
              },
              {
                name: 'DefinableClassC',
              },
              {
                name: 'DefinableClassD',
              },
            ],
          },
        ],
      },
    };
  },
};
</script>
