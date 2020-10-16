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
}
