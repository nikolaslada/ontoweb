<template>
  <div
    v-if="this.whisperList.length"
    class="list-group text-left"
  >
    <a
      v-for="(v, k) in this.whisperList"
      :key="k"
      :class="`list-group-item-${v.class}`"
      @click.prevent="whisper(v.type, v.id)"
      href
      class="list-group-item list-group-item-action"
    >
      {{ v.title }}
      <span
        :class="`badge-${v.class}`"
        class="badge badge-pill"
      >
        {{ v.type }}
      </span>
    </a>
  </div>
</template>

<script>
export default {
  name: 'Whisperer',
  props: {
    uid: {
      type: String,
      required: true,
    },
    whisperList: {
      type: Array,
      required: true,
    },
  },
  methods: {
    whisper(type, id) {
      if (!type || !id) {
        throw Error('id or type must not be empty!');
      }

      this.$emit(
        `whisper-${this.uid}`,
        {
          type,
          id,
        },
      );
    },
  },
};
</script>
