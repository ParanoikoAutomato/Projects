import { Table } from '@tanstack/react-table';

export function generateTablePagination<TData>(table: Table<TData>) {
  const paginationArray = [];
  const pageCount = table.getPageCount();
  const currentPageIndex = table.getState().pagination.pageIndex;
  let isPageNumberOutOfRange = false;

  for (let pageIndex = 0; pageIndex < pageCount; pageIndex++) {
    const isPageNumberFirst = pageIndex === 0;
    const isPageNumberLast = pageIndex === pageCount - 1;
    const isCurrentPageWithinTwoPageNumbers =
      Math.abs(pageIndex - currentPageIndex) <= 2;

    if (
      isPageNumberFirst ||
      isPageNumberLast ||
      isCurrentPageWithinTwoPageNumbers
    ) {
      isPageNumberOutOfRange = false;
      paginationArray.push({
        type: 'button',
        pageIndex,
        pageNumber: pageIndex + 1,
        isActive: pageIndex === currentPageIndex,
      });
    } else {
      if (!isPageNumberOutOfRange) {
        isPageNumberOutOfRange = true;
        paginationArray.push({
          type: 'ellipsis',
          pageIndex,
          pageNumber: pageIndex + 1,
          isActive: false,
        });
      }
    }
  }

  return paginationArray;
}
