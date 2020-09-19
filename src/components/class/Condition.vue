<template>
    <div>
        <template v-if="true">
          <div class="jumbotron">
            <h4 class="display-4">Condition</h4>
            <div>
              <b-button v-b-modal.my-modal>
                Edit
                <b-icon-pencil></b-icon-pencil>
              </b-button>
              <b-button v-b-modal="'my-modal'">
                Edit
                <b-icon-pencil></b-icon-pencil>
              </b-button>

              <b-modal id="my-modal">
                <h4>Edit {{1}} condition</h4>
                <p>Tady bude komponenta.</p>
                <div class="form-group">
                  <textarea
                    v-model="translatedCondition"
                    class="form-control"
                    cols="30"
                    rows="10"
                  >
                  </textarea>
                </div>
              </b-modal>
            </div>
            <div
              class="code"
              contenteditable="true"
              @input="onInput"
            >
              <RecursiveCondition
                :node="condition"
                :move="0"
              >
              </RecursiveCondition>
            </div>
          </div>
        </template>

        <template v-else>
            <pre>Error in Condition.vue</pre>
        </template>
    </div>
</template>

<script>
import RecursiveCondition from './RecursiveCondition.vue';
import Parser from '../../model/parser';

export default {
  name: 'Condition',
  props: {
    condition: Object,
    move: Number,
  },
  components: {
    RecursiveCondition,
  },
  methods: {
    onInput(event) {
      const conditionObject = this.parser.getConditionObject(event.target.innerText);
      console.log(conditionObject);
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
