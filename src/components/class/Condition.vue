<template>
  <div>
    <template v-if="true">
      <h4>Condition</h4>
      <div class="jumbotron">
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-8">
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
            <div class="col-sm-4">
              <Whisperer
                :uid="'class-condition'"
                :whisper-list="whisperList"
              />
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
  mapState,
  mapMutations,
} from 'vuex';

import {
  UPDATE_CLASS_NODE,
} from '../../stores/ClassStore/constants';

import RecursiveCondition from './RecursiveCondition.vue';
import Whisperer from './Whisperer.vue';
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
    Whisperer,
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
    ...mapState(
      'ClassStore',
      {
        whisperList: (state) => state.whisperList,
      },
    ),

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
