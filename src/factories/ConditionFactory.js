import ClassParserError from '@/errors/ClassParserError';
import PropertyParserError from '@/errors/PropertyParserError';
import Util from '@/model/Util';

import { DATA_STRUCTURE } from '@/conf/constants';

export default class ConditionFactory {
  static createSetObject = (list, operator) => ({
    type: DATA_STRUCTURE.SET,
    op: operator || DATA_STRUCTURE.AND,
    list,
  });

  static createNotObject = (data, goDeepCallback) => ({
    type: DATA_STRUCTURE.NOT,
    set: goDeepCallback(data),
  });

  static createClassObject(data) {
    if (
      Util.isJoinOperator(data)
      || Util.isRestrictionType(data)
      || Util.isNot(data)
      || Number.isNaN(data)
    ) {
      throw new ClassParserError(
        `It must be a class if it is before or after the operator or if it is the only word in parentheses! Value ${data}`,
        data,
      );
    } else {
      return {
        type: DATA_STRUCTURE.CLASS,
        name: data,
      };
    }
  }

  static createPropertyObject(data, goDeepCallback, goNotCallback) {
    const { length } = data;
    let property;
    let restriction;
    let value;
    let not;
    let object;

    switch (length) {
      case 3:
        [property, restriction, value] = data;

        if (
          Util.isJoinOperator(property)
          || Util.isRestrictionType(property)
          || Util.isNot(property)
          || Number.isNaN(property)
        ) {
          throw PropertyParserError(
            'First word in parentheses must be a property!',
            data,
          );
        }

        if (Util.isRestrictionClassType(restriction)) {
          if (typeof value === 'string') {
            value = [value];
          }

          object = {
            type: DATA_STRUCTURE.PROPERTY,
            name: property,
            set: goDeepCallback(value),
            restriction,
          };
        } else if (Util.isRestrictionNumberType(restriction)) {
          if (Number.isNaN(value)) {
            throw PropertyParserError(
              `Number type restriction must be followed by number! Current value is: ${value}.`,
              data,
            );
          } else {
            const number = Number(value);
            object = {
              type: DATA_STRUCTURE.PROPERTY,
              name: property,
              restriction,
              value: number,
            };
          }
        } else {
          throw PropertyParserError(
            `No valid restriction type ${restriction}!`,
            data,
          );
        }

        break;
      case 4:
        [property, restriction, not, value] = data;
        if (!Util.isNot(not)) {
          throw PropertyParserError(
            `Restriction must be followed by NOT operator when there are 4 items in property restriction! Current value is: ${not}.`,
            data,
          );
        } else {
          object = {
            type: DATA_STRUCTURE.PROPERTY,
            name: property,
            set: goNotCallback(value),
            restriction,
          };
        }
        break;
      default:
        throw PropertyParserError(
          `There must not be less than 3 or more than 4 items in property restriction! Current number of items is ${length}.`,
          data,
        );
    }

    return object;
  }
}
