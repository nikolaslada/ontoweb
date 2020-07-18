<template>
  <span>
    <template v-if="node.type === 'set'">
        <template
          v-if="move > 0"
        >
          <span class="construct">(</span>
          <br/>
          <span
            :data-move="move"
          ></span>
        </template>
        <span
          v-for="(set, i) in node.set"
          :key="i"
          class="set"
        >
          <span
            v-if="i > 0"
            :data-move="move"
            class="operator"
          >{{ node.operator }} </span>
          <RecursiveCondition
            :node="set"
            :move="getMove(move)"
          >
          </RecursiveCondition>
          <br/>
        </span>
        <template
          v-if="move > 0"
        >
          <span
            :data-move="move - 1"
            class="construct"
          >)</span>
        </template>
    </template>

    <template v-else-if="node.type === 'class'">
        <template>
          <span class="circle"></span>
          <span class="className">{{ node.name }}</span>
        </template>
    </template>

    <template v-else-if="node.type === 'not'">
        <span class="not"></span>
        <span class="operator">not </span>
        <template v-if="node.set.type === 'class'">
          <span class="construct">(</span>
        </template>
        <RecursiveCondition
          :node="node.set"
          :move="move"
        >
        </RecursiveCondition>
        <template v-if="node.set.type === 'class'">
          <span class="construct">)</span>
        </template>
    </template>

    <template v-else-if="node.type === 'property' && node.set">
      <span class="propertyUse">
        <span class="construct">(</span>
        <span class="propertyName">{{ node.name }} </span>
        <span class="propertyRestriction">{{ node.restriction }} </span>
        <template v-if="node.set.type === 'set'">
          <RecursiveCondition
            :node="node.set"
            :move="move"
          >
          </RecursiveCondition>
        </template>
        <template v-else>
          <RecursiveCondition
            :node="node.set"
            :move="move"
          >
          </RecursiveCondition>
        </template>
        <span class="construct">)</span>
      </span>
    </template>

    <template v-else-if="node.type === 'property' && node.value">
      <span class="construct">(</span>
      <span class="propertyName">{{ node.name }} </span>
      <span class="propertyRestriction">{{ node.restriction }} </span>
      <span class="propertyValue">{{ node.value }}</span>
      <span class="construct">)</span>
    </template>

    <template v-else>
      <span>
        ERROR
        <span>{{ node }}</span>
      </span>
    </template>
  </span>
</template>

<script>
export default {
  name: 'RecursiveCondition',
  props: {
    node: Object,
    move: Number,
  },
  methods: {
    getMove(current) {
      let move;
      if (current < 5) {
        move = current + 1;
      } else {
        move = current;
      }

      return move;
    },
  },
};
</script>
