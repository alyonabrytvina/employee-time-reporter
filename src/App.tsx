import React, { useEffect, useState } from 'react';
import { Header } from './components/Header/Header';
import { Excel } from './components/Excel/Excel';
import db from './api/fetchData.json';
import { Pagination } from './components/Pagination/Pagination';
import { UsePagination } from './hooks/usePagination';

export interface ItemRow{
    taskName: string,
    developers: string[],
    workType: string|string[],
    status: string,
    totalTimeSpent: number,
    myTimeSpentByPeriod: number,
    estimation: number,
    efficiency: number|null,
    id: number
}

export interface Columns{
    value: string
    label: string
}

export interface SelectCategories{
    value: string
    label: string
}

export interface PaginationSelect{
    option: number
    id: number
}

interface RootObject {
    data: ItemRow[]
    columns: Columns[]
    status: string[]
    selectCategories: SelectCategories[]
    developers: Record<string, string[]>
    paginationSelect: PaginationSelect[]
}

function App() {
  const {
    status, data, developers, columns, selectCategories, paginationSelect,
  } = db as RootObject;
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPageCount = Math.ceil(db.data.length / rowsPerPage);

  useEffect(() => {
    if (currentPage > totalPageCount) {
      setCurrentPage(1);
    }

    if (currentPage === 0) {
      setCurrentPage(totalPageCount);
    }
  }, [currentPage]);

  const paginationRange = UsePagination({
    totalCount: data.length, rowsPerPage, currentPage, setCurrentPage,
  });

  return (
    <div>
      <Header />
      <Excel<ItemRow>
        data={paginationRange}
        columns={columns}
        status={status}
        dev={developers}
        selectCategories={selectCategories}
      />
      <Pagination
        currentPage={currentPage}
        onPageChange={(page: number) => setCurrentPage(page)}
        onRowsPerPageChange={(e) => setRowsPerPage(e)}
        rowsPerPage={rowsPerPage}
        paginationSelect={paginationSelect}
        totalPageCount={totalPageCount}
      />
    </div>
  );
}

export default App;
