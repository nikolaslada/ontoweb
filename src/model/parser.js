import {
  DATA_STRUCTURE,
  PARSE_TEXT,
} from '../conf/constants';

export default class Parser {
  constructor() {
    this.text = '';
  }

  getPositionListInText(search) {
    const searchLength = search.length;
    const positionList = [];
    let startIndex = 0;
    let position;

    while (true) {
      position = this.text.indexOf(search, startIndex);

      if (position > -1) {
        positionList.push(position);
        startIndex = position + searchLength;
      } else {
        break;
      }
    }

    return positionList;
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

  getDataTree() {
    if (this.leftBracketList.length !== this.rightBracketList.length) {
      throw Error('There must be same count of left brackets and right brackets.');
    } else {
      this.i = 0;
      this.leftIndex = 0;
      this.rightIndex = 0;
      return this.getDataTreeRecursive();
    }
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

  // eslint-disable-next-line class-methods-use-this
  isOdd(number) {
    return (number % 2) === 1;
  }

  // eslint-disable-next-line class-methods-use-this
  isJoinOperator(parsedText) {
    return (
      parsedText === PARSE_TEXT.AND_OPERATOR
      || parsedText === PARSE_TEXT.OR_OPERATOR
    );
  }

  // eslint-disable-next-line class-methods-use-this
  isRestrictionType(parsedText) {
    return (
      this.isRestrictionClassType(parsedText)
      || this.isRestrictionNumberType(parsedText)
    );
  }

  // eslint-disable-next-line class-methods-use-this
  isRestrictionClassType(parsedText) {
    return (
      parsedText === PARSE_TEXT.SOME_MODIFIER
      || parsedText === PARSE_TEXT.ONLY_MODIFIER
    );
  }

  // eslint-disable-next-line class-methods-use-this
  isRestrictionNumberType(parsedText) {
    return (
      parsedText === PARSE_TEXT.MIN_MODIFIER
      || parsedText === PARSE_TEXT.MAX_MODIFIER
      || parsedText === PARSE_TEXT.EXACTLY_MODIFIER
    );
  }

  // eslint-disable-next-line class-methods-use-this
  isNot(parsedText) {
    return parsedText === PARSE_TEXT.NOT_OPERATOR;
  }

  getClassObject(value) {
    if (
      this.isJoinOperator(value)
      || this.isRestrictionType(value)
      || this.isNot(value)
      || Number.isNaN(value)
    ) {
      throw Error(`It must be a class if it is before or after the operator or if it is the only word in parentheses! Value ${value}`);
    } else {
      return {
        type: DATA_STRUCTURE.CLASS,
        name: value,
      };
    }
  }

  checkPropertyError(property) {
    if (
      this.isJoinOperator(property)
      || this.isRestrictionType(property)
      || this.isNot(property)
      || Number.isNaN(property)
    ) {
      throw Error('First word in parentheses must be a property!');
    }
  }

  // eslint-disable-next-line class-methods-use-this
  checkOperator(operator, item) {
    if (
      !(
        operator === undefined
        || operator === item
      )
    ) {
      throw Error('There must be only one type of operator in parentheses!');
    } else {
      return item;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  pushIntoData(data, text) {
    if (!Array.isArray(data)) {
      throw Error('Variable data must be an array!');
    }

    if (typeof text !== 'string') {
      throw Error('Variable text must be a string!');
    }

    if (text !== '') {
      Array.prototype.push.apply(
        data,
        text.split(PARSE_TEXT.SPACE),
      );
    }
  }

  getNotObject(data) {
    return {
      type: DATA_STRUCTURE.NOT,
      set: this.getObjectRecursive(data),
    };
  }

  getPropertyObject(data) {
    const { length } = data;
    let property;
    let restriction;
    let value;
    let not;
    let object;

    switch (length) {
      case 3:
        [property, restriction, value] = data;
        this.checkPropertyError(property);

        if (this.isRestrictionClassType(restriction)) {
          if (typeof value === 'string') {
            value = [value];
          }

          object = {
            type: DATA_STRUCTURE.PROPERTY,
            name: property,
            restriction,
            set: this.getObjectRecursive(value),
          };
        } else if (this.isRestrictionNumberType(restriction)) {
          if (Number.isNaN(value)) {
            throw Error(`Number type restriction must be followed by number! Current value is: ${value}.`);
          } else {
            value = parseInt(value, 10);
            object = {
              type: DATA_STRUCTURE.PROPERTY,
              name: property,
              restriction,
              value,
            };
          }
        } else {
          throw Error(`No valid restriction type ${restriction}!`);
        }

        break;
      case 4:
        [property, restriction, not, value] = data;
        this.isNot(not);
        object = {
          type: DATA_STRUCTURE.PROPERTY,
          name: property,
          restriction,
          set: this.getNotObject(value),
        };
        break;
      default:
        throw Error(`There must not be less than 3 or more than 4 items in property restriction! Current number of items is ${length}.`);
    }

    return object;
  }

  /**
   * @returns {}
   */
  getObjectRecursive(data) {
    const { length } = data;
    const list = [];
    let item;
    let operator;
    let object;
    let i = 0;

    if (length === 1) {
      object = this.getClassObject(data[0]);
    } else if (length >= 3 && length <= 4 && this.isRestrictionType(data[1])) {
      object = this.getPropertyObject(data);
    } else if (length > 1) {
      while (i < length) {
        item = data[i];

        if (typeof item === 'string') {
          if (this.isOdd(i)) {
            if (this.isJoinOperator(item)) {
              operator = this.checkOperator(operator, item);
            } else {
              throw Error(`There must be an operator on an even position! Position ${i}, current value ${item}`);
            }
          } else {
            list.push(this.getClassObject(item));
          }
        } else if (this.isOdd(i)) {
          throw Error('There must not be brackets on an even position!');
        } else {
          data.join('=');
          list.push(this.getObjectRecursive(item));
        }

        i += 1;
      }

      object = {
        type: DATA_STRUCTURE.SET,
        op: operator,
        set: list,
      };
    }

    return object;
  }

  /**
   * @returns {}
   */
  getObjectFromBracketPair(data) {
    const { length } = data;
    let not;
    let subrange;
    let object;

    switch (length) {
      case 1:
        [subrange] = data;

        if (Array.isArray(subrange)) {
          object = this.getConditionObjectRecursive(subrange);
        } else {
          throw Error(`There must be only parenthesis! Current value ${subrange}`);
        }

        break;
      case 2:
        [not, subrange] = data;

        if (not !== PARSE_TEXT.NOT_OPERATOR || typeof subrange === 'string') {
          throw Error(`After ${PARSE_TEXT.NOT_OPERATOR} must be only parenthesis!`);
        } else {
          object = {
            type: DATA_STRUCTURE.NOT,
            set: this.getConditionObjectRecurfsive(subrange),
          };
        }

        break;
      case 3:
        object = this.getPropertyObject(data);
        break;
      default:
        object = this.getObjectRecursive(data);
    }

    return object;
  }

  /**
   * @returns {}
   */
  getConditionObjectRecursive(list) {
    let listCount = 0;
    let object;

    list.forEach(
      (item) => {
        listCount += (Array.isArray(item) ? 1 : 0);
      },
    );

    if (listCount === 0) {
      throw Error('There must not be empty list as item!');
    } else if (listCount === 1) {
      object = this.getObjectFromBracketPair(list);
    } else {
      object = this.getObjectRecursive(list);
    }

    return object;
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
    return this.getConditionObjectRecursive(data);
  }
}
