import moment from 'moment';
import {
  DATETIME_PATTERN,
} from '../../conf/constants';

export function initialState() {
  return {
    classDetail: {
      name: 'owl:Thing',
      createdAt: moment('2020-01-13 12:00:00').format(DATETIME_PATTERN),
      updatedAt: null,
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
                        type: 'not',
                        set: {
                          type: 'class',
                          name: 'ModifierClassDA',
                        },
                      },
                    },
                    {
                      type: 'property',
                      name: 'hasValueF',
                      restriction: 'some',
                      set: {
                        type: 'not',
                        set: {
                          type: 'set',
                          operator: 'or',
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
    classTree: {
    },
    count: null,
    selectedClassId: null,
    whisperList: [
      {
        id: 1,
        title: 'hasValueXYZ',
        class: 'success',
        type: 'Property',
      },
      {
        id: 2,
        title: 'some',
        class: 'danger',
        type: 'Restriction',
      },
      {
        id: 3,
        title: 'ModifierClassXYZ',
        class: 'warning',
        type: 'Class',
      },
      {
        id: 2,
        title: 'or',
        class: 'info',
        type: 'Operator',
      },
    ],
  };
}

export { initialState as default };
