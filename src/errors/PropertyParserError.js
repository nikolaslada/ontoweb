import ParserError from '@/errors/ParserError';

export default class PropertyParserError extends ParserError {
  constructor(message, data) {
    super(message);
    this.data = data;
  }
}
