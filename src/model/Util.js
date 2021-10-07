import { PARSE_TEXT } from '@/conf/constants';

export default class Util {
  static getObjectFromData(objectOrList) {
    let data;

    if (Array.isArray(objectOrList)) {
      [data = {}] = objectOrList;
    } else {
      data = objectOrList;
    }

    return data;
  }

  static isOdd = (number) => (number % 2) === 1;

  static isNot = (parsedText) => parsedText === PARSE_TEXT.NOT_OPERATOR;

  static isJoinOperator = (parsedText) => (
    parsedText === PARSE_TEXT.AND_OPERATOR
    || parsedText === PARSE_TEXT.OR_OPERATOR
  );

  static isRestrictionType(parsedText) {
    return (
      this.isRestrictionClassType(parsedText)
      || this.isRestrictionNumberType(parsedText)
    );
  }

  static isRestrictionClassType = (parsedText) => (
    parsedText === PARSE_TEXT.SOME_MODIFIER
    || parsedText === PARSE_TEXT.ONLY_MODIFIER
  );

  static isRestrictionNumberType = (parsedText) => (
    parsedText === PARSE_TEXT.MIN_MODIFIER
    || parsedText === PARSE_TEXT.MAX_MODIFIER
    || parsedText === PARSE_TEXT.EXACTLY_MODIFIER
  );
}
