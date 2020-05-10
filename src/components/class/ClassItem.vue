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
  data() {
    return {
      data: {
        name: 'owl:Thing',
        created: '2020-01-13 12:00:00',
        updated: null,
        translationList: [
          {
            iso: 'en',
            name: 'owl:Thing',
            description: '',
          },
        ],
        externalLink: {
          url: 'http://linuxclan.org',
          title: '',
        },
        definitionList: [
          {},
        ],
        condition: {
          type: 'set',
          operator: 'and',
          set: [
            {
              type: 'class',
              name: 'PrimitiveClassA',
            },
            {
              type: 'property',
              name: 'hasValueA',
              restriction: 'some',
              set: {
                type: 'class',
                name: 'ModifierClassAA',
              },
            },
            {
              type: 'property',
              name: 'hasValueB',
              restriction: 'some',
              set: {
                type: 'class',
                name: 'ModifierClassBA',
              },
            },
            {
              type: 'property',
              name: 'hasValueC',
              restriction: 'some',
              set: {
                type: 'set',
                operator: 'and',
                set: [
                  {
                    type: 'class',
                    name: 'PrimitiveClassB',
                  },
                  {
                    type: 'set',
                    operator: 'or',
                    set: [
                      {
                        type: 'property',
                        name: 'hasValueD',
                        restriction: 'some',
                        set: {
                          type: 'class',
                          name: 'ModifierClassCA',
                        },
                      },
                      {
                        type: 'property',
                        name: 'hasValueE',
                        restriction: 'some',
                        set: {
                          type: 'class',
                          name: 'ModifierClassDA',
                          not: true,
                        },
                      },
                      {
                        type: 'property',
                        name: 'hasValueF',
                        restriction: 'some',
                        set: {
                          type: 'set',
                          operator: 'or',
                          not: true,
                          set: [
                            {
                              type: 'class',
                              name: 'ModifierClassEA',
                            },
                            {
                              type: 'class',
                              name: 'ModifierClassEB',
                            },
                          ],
                        },
                      },
                      {
                        type: 'property',
                        name: 'hasValueG',
                        restriction: 'min',
                        value: 2,
                      },
                    ],
                  },
                ],
              },
            },
          ],
        },
      },
    };
  },
};
</script>
