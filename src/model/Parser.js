import ParserError from '@/errors/ParserError';
import ConditionFactory from '@/factories/ConditionFactory';
import Util from '@/model/Util';

import {
  DATA_STRUCTURE,
  PARSE_TEXT,
} from '../conf/constants';

export default class Parser {
  constructor() {
    this.text = '';
  }

  getConditionObject(humanReadable) {
    const text = humanReadable
      .trim()
      .replace(/[\r\n]+/gm, PARSE_TEXT.SPACE)
      .replace(/\s\s+/g, PARSE_TEXT.SPACE);
    this.text = `(${text})`;
    this.leftBracketList = this.getPositionListInText(PARSE_TEXT.LEFT_BRACKET, this.text);
    this.rightBracketList = this.getPositionListInText(PARSE_TEXT.RIGHT_BRACKET, this.text);
    const data = this.getDataTree();
    const object = this.getConditionObjectRecursive(data);
    return object;
  }

  getPositionListInText(search) {
    const searchLength = search.length;
    const positionList = [];
    let startIndex = 0;
    let position = this.text.indexOf(search, startIndex);

    while (position > -1) {
      positionList.push(position);
      startIndex = position + searchLength;
      position = this.text.indexOf(search, startIndex);
    }

    return positionList;
  }

  getDataTree() {
    if (this.leftBracketList.length !== this.rightBracketList.length) {
      throw ParserError('There must be same count of left brackets and right brackets.');
    } else {
      this.i = 0;
      this.leftIndex = 0;
      this.rightIndex = 0;
      return this.getDataTreeRecursive();
    }
  }

  getDataTreeRecursive() {
    const data = [];
    let left;
    let right;
    let substring;

    while (this.i <= this.text.length) {
      left = this.leftBracketList[this.leftIndex];
      right = this.rightBracketList[this.rightIndex];

      if (left === undefined && right === undefined) {
        substring = this.getSubstring(this.i, this.text.length);
        this.pushIntoData(data, substring);
        break;
      } else if (right === undefined || left < right) {
        substring = this.getSubstring(this.i, left);
        this.pushIntoData(data, substring);
        this.i = left + 1;
        this.leftIndex += 1;
        data.push(
          this.getDataTreeRecursive(),
        );
      } else {
        substring = this.getSubstring(this.i, right);
        this.pushIntoData(data, substring);
        this.i = right + 1;
        this.rightIndex += 1;
        break;
      }
    }

    return data;
  }

  getSubstring(start, end) {
    let result;

    if (start < end) {
      result = this.text.substring(start, end).trim();
    } else {
      result = '';
    }

    return result;
  }

  pushIntoData = (data, text) => {
    if (!Array.isArray(data)) {
      throw ParserError('Variable data must be an array!');
    }

    if (typeof text !== 'string') {
      throw ParserError('Variable text must be a string!');
    }

    if (text !== '') {
      Array.prototype.push.apply(
        data,
        text.split(PARSE_TEXT.SPACE),
      );
    }
  };

  getConditionObjectRecursive(list) {
    let listCount = 0;
    let object;

    list.forEach(
      (item) => {
        listCount += (Array.isArray(item) ? 1 : 0);
      },
    );

    if (listCount === 0) {
      throw ParserError('There must not be empty list as item!');
    } else if (listCount === 1) {
      object = this.getObjectFromBracketPair(list);
    } else {
      object = this.getObjectRecursive(list);
    }

    return object;
  }

  getObjectFromBracketPair(data) {
    const { length } = data;
    let not;
    let subRange;
    let object;

    switch (length) {
      case 1:
        [subRange] = data;

        if (Array.isArray(subRange)) {
          object = this.getConditionObjectRecursive(subRange);
        } else {
          throw ParserError(`There must be only parenthesis! Current value ${subRange}`);
        }

        break;
      case 2:
        [not, subRange] = data;

        if (not !== PARSE_TEXT.NOT_OPERATOR || typeof subRange === 'string') {
          throw ParserError(`After ${PARSE_TEXT.NOT_OPERATOR} must be only parenthesis!`);
        } else {
          object = ConditionFactory.createNotObject(
            subRange,
            (deepData) => this.getConditionObjectRecursive(deepData),
          );
        }

        break;
      case 3:
        object = ConditionFactory.createPropertyObject(
          data,
          (deepData) => this.getObjectRecursive(deepData),
          (notData) => this.getNotObject(notData),
        );
        break;
      default:
        object = this.getObjectRecursive(data);
    }

    return object;
  }

  getObjectRecursive(data) {
    const { length } = data;
    const list = [];
    let item;
    let operator;
    let object;
    let i = 0;

    if (length === 1) {
      object = ConditionFactory.createSetObject(
        [
          ConditionFactory.createClassObject(data[0]),
        ],
        DATA_STRUCTURE.AND,
      );
    } else if (length >= 3 && length <= 4 && Util.isRestrictionType(data[1])) {
      object = ConditionFactory.createPropertyObject(
        data,
        (deepData) => this.getObjectRecursive(deepData),
        (notData) => this.getNotObject(notData),
      );
    } else if (length > 1) {
      while (i < length) {
        item = data[i];

        if (typeof item === 'string') {
          if (Util.isOdd(i)) {
            if (Util.isJoinOperator(item)) {
              operator = this.checkOperator(operator, item);
            } else {
              throw ParserError(`There must be an operator on an even position! Position ${i}, current value ${item}`);
            }
          } else {
            list.push(ConditionFactory.createClassObject(item));
          }
        } else if (Util.isOdd(i)) {
          throw ParserError('There must not be brackets on an even position!');
        } else {
          list.push(this.getObjectRecursive(item));
        }

        i += 1;
      }

      object = ConditionFactory.createSetObject(list, operator);
    }

    return object;
  }

  getNotObject(data) {
    return ConditionFactory.createNotObject(
      data,
      (deepData) => this.getObjectRecursive(deepData),
    );
  }

  checkOperator = (operator, item) => {
    if (
      !(
        operator === undefined
        || operator === item
      )
    ) {
      throw ParserError('There must be only one type of operator in parentheses!');
    } else {
      return item;
    }
  };
}
