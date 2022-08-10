import { useEffect, useMemo, useState } from 'react';
import { ItemRow } from '../components/App/App';
import { services } from '../api/services';

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
  const [data, setData] = useState([]);

  useEffect(() => {
    services('data').then((response) => {
      setData(response);
    });
  }, []);

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
  }, [totalRowsCount, rowsPerPage, currentPage, data]);

  return {
    paginationRange,
    totalPageCount,
  };
};
