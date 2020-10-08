<template>
  <div>
    <template v-if="true">
      <div class="jumbotron">
        <h4>Condition</h4>
        <div class="container">
          <div class="row">
            <div class="col-sm-6">
              <div
                class="code"
                contenteditable="true"
                @input="onChangeCondition"
              >
                <RecursiveCondition
                  :node="condition"
                  :move="0"
                >
                </RecursiveCondition>
              </div>
            </div>
            <div class="col-sm-6">
              TEST
            </div>
          </div>
        </div>
      </div>
    </template>

    <template v-else>
      <pre>Error in Condition.vue</pre>
    </template>
  </div>
</template>

<script>
import {
  mapMutations,
} from 'vuex';

import {
  UPDATE_CLASS_NODE,
} from '../../stores/ClassStore/constants';

import RecursiveCondition from './RecursiveCondition.vue';
import Parser from '../../model/parser';

export default {
  name: 'Condition',
  props: {
    condition: Object,
    move: Number,
    translatedCondition: String,
  },
  components: {
    RecursiveCondition,
  },
  methods: {
    ...mapMutations(
      'ClassStore',
      {
        updateClassNode: UPDATE_CLASS_NODE,
      },
    ),

    onChangeCondition(event) {
      const conditionObject = this.parser.getConditionObject(event.target.innerText);
      this.updateClassNode(conditionObject);
    },

  },
  computed: {
    getTranslatedCondition() {
      return this.methods.convertToString(this.condition);
    },
  },
  data() {
    return {
      parser: new Parser(),
    };
  },
};
</script>
