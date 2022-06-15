import { useMemo } from 'react';
import db from '../api/fetchData.json';
import { ItemRow } from '../components/App/App';

interface Pagination{
  rowsPerPage: number,
  currentPage: number,
  setCurrentPage: (value: number) => void
  totalRowsCount: number
  totalPageCount: number
}

export const UsePagination = ({
  totalRowsCount,
  rowsPerPage,
  totalPageCount,
  currentPage,
  setCurrentPage,
}: Pagination) => {
  if (currentPage > totalPageCount) {
    setCurrentPage(1);
  }

  if (currentPage === 0) {
    setCurrentPage(totalPageCount);
  }
  return useMemo(() => {
    const start:number = currentPage * rowsPerPage - rowsPerPage;
    const end:number = start + rowsPerPage;

    return (db.db.data as ItemRow[]).slice(start, end);
  }, [totalRowsCount, rowsPerPage, currentPage]);
};
