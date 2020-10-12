<template>
  <div>
    <h2>{{ data.name }}</h2>
    <p>{{ data.createdAt }}</p>
    <p v-if="data.updatedAt">{{ data.updatedAt }}</p>
    <div
      v-if="data.translationList && data.translationList.length"
    >
      <h3>Translations</h3>
      <div
        v-for="translation in data.translationList"
        :key="translation.name"
      >
        <h4>
          <span>{{ translation.iso }}</span>
          {{ translation.name }}
        </h4>
        <p v-if="translation.description">{{ translation.description }}</p>
      </div>
    </div>
    <div
      v-if="data.externalLink && data.externalLink.url"
    >
      <a
        v-if="data.externalLink.title"
        :href="data.externalLink.url"
      >
        {{ data.externalLink.title }}
      </a>
      <a
        v-else
        :href="data.externalLink.url"
      >
        {{ data.externalLink.url }}
      </a>
    </div>
    <Condition
      :condition="data.condition"
    >
    </Condition>
  </div>
</template>

<script>
import {
  mapState,
  mapActions,
} from 'vuex';

import Condition from './Condition.vue';

import {
  FETCH_CLASS_DETAIL,
} from '../../stores/ClassStore/constants';

export default {
  name: 'ClassItem',
  components: {
    Condition,
  },
  computed: {
    ...mapState(
      'ClassStore',
      {
        data: (state) => state.classDetail,
        selected: (state) => state.selectedClassId,
      },
    ),

  },
  watch: {
    selected(id) {
      if (id) {
        this.fetchClassDetail({ id });
      }
    },

  },
  methods: {
    ...mapActions(
      'ClassStore',
      {
        fetchClassDetail: FETCH_CLASS_DETAIL,
      },
    ),

  },
};
</script>
