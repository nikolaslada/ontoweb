<template>
  <div>
    <h2>{{ data.name }}</h2>
    <p v-if="data.created">{{ date(data.created) }}</p>
    <p v-if="data.updated">{{ date(data.updated) }}</p>
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
} from 'vuex';
import moment from 'moment';
import Condition from './Condition.vue';

export default {
  name: 'ClassItem',
  components: {
    Condition,
  },
  methods: {
    date(date) {
      return moment(date).format('YYYY-MM-DD hh:mm:ss');
    },
  },
  computed: {
    ...mapState(
      'ClassStore',
      {
        data: (state) => state.classNode,
      },
    ),
  },
};
</script>
