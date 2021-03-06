import moment from 'moment';
import Util from './Util';

import {
  DATETIME_PATTERN,
} from '../conf/constants';

export default class ClassDetailFactory {
  static createClassDetail(objectOrList) {
    const data = Util.getObjectFromData(objectOrList);

    if (
      !data.name
      || !data.createdAt
      || !('updatedAt' in data)
      || !data.condition
    ) {
      throw Error('name, createdAt, updatedAt or condition attribute is not contained in data.');
    }

    const classDetail = {
      name: data.name,
      createdAt: moment(data.createdAt).format(DATETIME_PATTERN),
      updatedAt: (data.updatedAt) ? moment(data.updatedAt).format(DATETIME_PATTERN) : null,
    };

    if ('translationList' in data) {
      classDetail.translationList = data.translationList;
    }

    if ('externalLink' in data) {
      let externalLink;

      if (Array.isArray(data.externalLink)) {
        [externalLink = {}] = data.externalLink;
      } else {
        externalLink = data.externalLink;
      }

      classDetail.externalLink = externalLink;
    }

    let condition;
    if (Array.isArray(data.condition)) {
      [condition = {}] = data.condition;
    } else {
      condition = data.condition;
    }

    classDetail.condition = this.getRecursiveCondition(condition);
    return classDetail;
  }

  static getRecursiveCondition(data) {
    const object = {
      ...data,
    };

    if ('set' in data) {
      const { set = [] } = data;
      if (!Array.isArray(set)) {
        object.set = this.getRecursiveCondition(set);
      } else {
        const { length } = set;

        if (length > 1) {
          object.set = [];
          for (let i = 0; i < length; i += 1) {
            object.set.push(this.getRecursiveCondition(set[i]));
          }
        } else if (length) {
          object.set = this.getRecursiveCondition(set[0]);
        } else {
          delete object.set;
        }
      }
    }

    return object;
  }

  static createWhisperList(list) {
    const whisperList = [];

    for (let i = 0; i < list.length; i += 1) {
      whisperList.push(this.createWhisper(list[i]));
    }

    return whisperList;
  }

  static createWhisper(objectOrList) {
    const data = Util.getObjectFromData(objectOrList);

    if (
      !data.id
      || !data.type
      || !data.value
    ) {
      throw Error('id, type or value attribute is not contained in Whisper object');
    }

    const whisper = {
      id: data.id,
      value: data.value,
    };

    switch (data.type) {
      case 'o':
        whisper.type = 'Operator';
        whisper.class = 'info';
        break;
      case 'c':
        whisper.type = 'Class';
        whisper.class = 'warning';
        break;
      case 'p':
        whisper.type = 'Property';
        whisper.class = 'success';
        break;
      case 'r':
        whisper.type = 'Restriction';
        whisper.class = 'danger';
        break;
      default:
        throw Error('Unsupported whisper type value.');
    }

    return whisper;
  }
}
