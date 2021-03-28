<template>
  <span>
    <template v-if="node.type === 'set'">
        <template
          v-if="move > 0"
        >
          <span class="construct">(</span>
          <template
            v-if="node.list.length > 1"
          >
            <br/>
            <span
              :data-move="move"
            ></span>
          </template>
        </template>
        <span
          v-for="(l, i) in node.list"
          :key="i"
          class="set"
        >
          <span
            v-if="i > 0"
            :data-move="move"
            class="operator"
          >{{ node.op }} </span>
          <RecursiveCondition
            :node="l"
            :move="getMove(move)"
          >
          </RecursiveCondition>
          <br
            v-if="node.list.length > 1"
          />
        </span>
        <span
          v-if="node.list.length < 2"
          class="construct"
        >)</span>
        <span
          v-if="node.list.length > 1 && move > 0"
          :data-move="move - 1"
          class="construct"
        >)</span>
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
        <template v-if="isSetOrNot(node.set.type)">
          <RecursiveCondition
            :node="node.set"
            :move="move"
          >
          </RecursiveCondition>
        </template>
        <template v-else>
          <span>
            ERROR
            <span>{{ node }}</span>
          </span>
        </template>
        <span class="construct">)</span>
      </span>
    </template>

    <template v-else-if="node.type === 'property' && node.value">
      <span class="construct">(</span>
      <span class="propertyName">{{ node.name }} </span>
      <span class="propertyRestriction">{{ node.restriction }} </span>
      <span class="propertyValue">{{ node.value }}</span>
      <span class="construct d">)</span>
    </template>

    <template v-else-if="node.type === 'placeholder'">
      <span class="placeholderValue">{{ node.value }}</span>
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
    isSetOrNot(type) {
      return [
        'set',
        'not',
      ].includes(type);
    },
  },
};
</script>
