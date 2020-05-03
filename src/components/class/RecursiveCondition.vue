<template>
  <span>
    <template v-if="node.type === 'set'">
      <span
        v-for="(set, i) in node.set"
        :key="i"
        class="set"
      >
        <span v-if="i > 1"> and</span>
        <RecursiveCondition
          :node="set"
        >
        </RecursiveCondition>
      </span>
    </template>

    <template v-else-if="node.type === 'class'">
        <span>
          <span v-if="node.isNegative">!</span>
          <span class="className">{{ node.name }}</span>
        </span>
    </template>

    <template v-else-if="node.type === 'property' && node.set">
      <span class="propertyUse">
        <span>(</span>
        <span class="propertyName">{{ node.name }}</span>
        <span class="propertyRestriction">{{ node.restriction }}</span>
        <span v-if="node.set.type === 'set'">
          <span></span>
          <RecursiveCondition
            :node="node.set"
          >
          </RecursiveCondition>
          <span></span>
        </span>
        <span>
          <RecursiveCondition
            :node="node.set"
          >
          </RecursiveCondition>
        </span>
        <span>)</span>
      </span>
    </template>

    <template v-else-if="node.type === 'property' && node.value">
      <span>
        <span class="propertyName">{{ node.name }}</span>
        <span class="propertyRestriction">{{ node.restriction }}</span>
        <span class="propertyValue">{{ node.value }}</span>
      </span>
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
  },
};
</script>
