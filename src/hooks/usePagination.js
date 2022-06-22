import { useMemo } from "react";

export const DOTS = "...";

const range = (start, end) => {
  let length = end - start + 1;
  // Create an array of given length and populate it with numbers from start to end
  return [...Array(length)].map((element, index) => element = start + index);
};

function usePagination({
  currentPage,
  totalCount,
  pageSize,
  siblingCount = 1,
}) {
  const paginationRange = useMemo(() => {
    // Calculate number of pages 
    const pageCount = Math.ceil(totalCount / pageSize);
    const [firstPage, lastPage] = [1, pageCount];

    // BASE CASE: no dots should be inserted, returns all options
    // firstPage + currentPage + lastPage, first and last pages are both siblings of the current page
    if (pageCount <= 3) return range(firstPage, lastPage);
	
    // Calculate current page siblings, ensure they are within the firstPage-lastPage range
    const leftSibling = Math.max(firstPage, currentPage - siblingCount);
    const rightSibling = Math.min(currentPage + siblingCount, lastPage);

    // Determine if left/right dots should be inserted
    // If leftSibling equals 1 that means we are either on page is 1 or 2, and left dots should not be inserted
    const shouldInsertLeftDots = leftSibling != firstPage;
    // If rightSibling equals last page number that means we are either on last page or the one before, and right dots should not be inserted
    const shouldInsertRightDots = rightSibling != lastPage;

    // Define inner range size
    const innerRangeCount = 1 + 2 * siblingCount;

    // CASE 2: No left dots, but rights dots
    if (!shouldInsertLeftDots && shouldInsertRightDots) {
      let leftRange = range(firstPage, innerRangeCount);

      return [...leftRange, DOTS, lastPage];
    }

    // CASE 3: No right dots, but left dots
    if (shouldInsertLeftDots && !shouldInsertRightDots) {
      let rightRange = range(pageCount - innerRangeCount + 1, lastPage);

      return [firstPage, DOTS, ...rightRange];
    }
     
    // CASE 4: Both left and right dots
    if (shouldInsertLeftDots && shouldInsertRightDots) {
      let middleRange = range(leftSibling, rightSibling);

      return [firstPage, DOTS, ...middleRange, DOTS, pageCount];
    }
  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange;
}

export default usePagination;
