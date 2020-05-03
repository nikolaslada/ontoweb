<template>
    <div>
        <template v-if="true">
          <pre>
              <RecursiveCondition
                :node="condition"
              >
              </RecursiveCondition>
          </pre>
        </template>

        <template v-else>
            <pre>Error in Condition.vue</pre>
        </template>
    </div>
</template>

<script>
import RecursiveCondition from './RecursiveCondition.vue';

export default {
  name: 'Condition',
  props: {
    condition: Object,
  },
  components: {
    RecursiveCondition,
  },
};
</script>
