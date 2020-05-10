<template>
    <div>
        <template v-if="true">
          <div class="jumbotron">
            <p class="code">
              <RecursiveCondition
                :node="condition"
                :move="0"
              >
              </RecursiveCondition>
            </p>
          </div>
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
    move: Number,
  },
  components: {
    RecursiveCondition,
  },
};
</script>
