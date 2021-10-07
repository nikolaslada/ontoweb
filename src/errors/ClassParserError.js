import ParserError from '@/errors/ParserError';

export default class ClassParserError extends ParserError {
  constructor(message, data) {
    super(message);
    this.data = data;
  }
}
