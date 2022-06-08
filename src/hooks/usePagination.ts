import { useMemo } from 'react';
import db from '../api/fetchData.json';
import { ItemRow } from '../App';

interface Pagination{
  totalCount: number,
  rowsPerPage: number,
  currentPage: number,
  setCurrentPage: (value: number) => void
}

export const UsePagination = ({
  totalCount,
  rowsPerPage,
  currentPage,
  setCurrentPage,
}: Pagination) => {
  const totalPageCount = Math.ceil(db.data.length / rowsPerPage);
  console.log(totalPageCount);

  if (currentPage > totalPageCount) {
    setCurrentPage(1);
  }

  if (currentPage === 0) {
    setCurrentPage(totalPageCount);
  }
  //
  // const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  // const rightSiblingIndex = Math.min(
  //   currentPage + siblingCount,
  //   totalPageCount,
  // );

  // console.log(leftSiblingIndex, rightSiblingIndex);
  return useMemo(() => {
    const start:number = currentPage * rowsPerPage - rowsPerPage;
    const end:number = start + rowsPerPage;

    return (db.data as ItemRow[]).slice(start, end);
  }, [totalCount, rowsPerPage, currentPage]);
};
