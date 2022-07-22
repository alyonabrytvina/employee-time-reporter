import { useEffect, useMemo } from 'react';
import db from '../api/fetchData.json';
import { ItemRow } from '../components/App/App';

interface Pagination{
  rowsPerPage: number,
  currentPage: number,
  setCurrentPage: (value: number) => void
}

export const UsePagination = ({
  rowsPerPage,
  currentPage,
  setCurrentPage,
}: Pagination) => {
  const { data } = db.db;
  const totalRowsCount = data.length;
  const totalPageCount = Math.ceil(totalRowsCount / rowsPerPage);

  useEffect(() => {
    if (currentPage > totalPageCount) {
      setCurrentPage(1);
    }

    if (currentPage === 0) {
      setCurrentPage(totalPageCount);
    }
  }, [currentPage]);

  const paginationRange = useMemo(() => {
    const start:number = currentPage * rowsPerPage - rowsPerPage;
    const end:number = start + rowsPerPage;

    return (data as ItemRow[]).slice(start, end);
  }, [totalRowsCount, rowsPerPage, currentPage]);

  return {
    paginationRange,
    totalPageCount,
  };
};
