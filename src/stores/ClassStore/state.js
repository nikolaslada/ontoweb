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
        op: 'and',
        list: [
          {
            type: 'class',
            name: 'PrimitiveClassA',
          },
          {
            type: 'prop',
            name: 'hasValueA',
            restriction: 'some',
            set: {
              type: 'set',
              op: 'and',
              list: [
                {
                  type: 'class',
                  name: 'ModifierClassAA',
                },
              ],
            },
          },
          {
            type: 'prop',
            name: 'hasValueB',
            restriction: 'some',
            set: {
              type: 'set',
              op: 'and',
              list: [
                {
                  type: 'class',
                  name: 'ModifierClassBA',
                },
              ],
            },
          },
          {
            type: 'prop',
            name: 'hasValueC',
            restriction: 'some',
            set: {
              type: 'set',
              op: 'and',
              list: [
                {
                  type: 'class',
                  name: 'PrimitiveClassB',
                },
                {
                  type: 'set',
                  op: 'or',
                  list: [
                    {
                      type: 'prop',
                      name: 'hasValueD',
                      restriction: 'some',
                      set: {
                        type: 'set',
                        op: 'and',
                        list: [
                          {
                            type: 'class',
                            name: 'ModifierClassCA',
                          },
                        ],
                      },
                    },
                    {
                      type: 'prop',
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
                      type: 'prop',
                      name: 'hasValueF',
                      restriction: 'some',
                      set: {
                        type: 'not',
                        set: {
                          type: 'set',
                          op: 'or',
                          list: [
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
                      type: 'prop',
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
        value: 'hasValueXYZ',
        class: 'success',
        type: 'Property',
      },
      {
        id: 2,
        value: 'some',
        class: 'danger',
        type: 'Restriction',
      },
      {
        id: 3,
        value: 'ModifierClassXYZ',
        class: 'warning',
        type: 'Class',
      },
      {
        id: 2,
        value: 'or',
        class: 'info',
        type: 'Op',
      },
    ],
  };
}

export { initialState as default };
