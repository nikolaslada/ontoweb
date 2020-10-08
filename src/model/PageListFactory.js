export default class PageListFactory {
  static createPageList(currentPage, pageTotal, maxCount) {
    let pageList = [];

    if (pageTotal > 1) {
      if (currentPage === 1) {
        const to = (maxCount < pageTotal) ? maxCount : pageTotal;
        pageList = [
          ...this.getListByFromTo(currentPage, to),
        ];
      } else if (currentPage === pageTotal) {
        let from = maxCount - 1;
        from = (from < pageTotal) ? pageTotal - from : pageTotal;
        pageList = [
          ...this.getListByFromTo(from, pageTotal),
        ];
      } else {
        const beforeAndAfter = maxCount - 1;
        let after = (beforeAndAfter + (beforeAndAfter % 2)) / 2;
        let before = beforeAndAfter - after;
        before = (currentPage - before > 0) ? before : currentPage - 1;
        after = (pageTotal - after > currentPage) ? after : pageTotal - currentPage;

        if (before > 0) {
          pageList = [
            ...pageList,
            ...this.getListByFromTo(currentPage - before, currentPage - 1),
          ];
        }

        pageList.push(currentPage);

        if (after <= pageTotal) {
          pageList = [
            ...pageList,
            ...this.getListByFromTo(currentPage + 1, currentPage + after),
          ];
        }
      }
    }

    return pageList;
  }

  static getListByFromTo(from, to) {
    const pageList = [];
    let page = from;

    for (; page <= to; page += 1) {
      pageList.push(page);
    }

    return pageList;
  }
}
