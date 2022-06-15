import React, { useEffect, useMemo, useState } from 'react';
import './Grid.scss';
import { GridRow } from '../GridRow/GridRow';
import sortIcon from '../../assets/svgs/sort.svg';
import confirmation from '../../assets/svgs/checkMark.svg';
import { Search } from '../Search/Search';
import { SelectStatus } from '../SelectStatus/SelectStatus';
import { SelectDevelopers } from '../SelectDevelopers/SelectDevelopers';
import { Context } from '../../context';
import {
  ItemRow, RootObject,
} from '../App/App';
import { Pagination } from '../Pagination/Pagination';
import { UsePagination } from '../../hooks/usePagination';

interface Props{
  dataBase: RootObject
}

function Grid({
  dataBase,
}: Props) {
  const {
    data, columns, status, developers, paginationSelect, selectCategories,
  } = dataBase;

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isSorted, setIsSorted] = useState<boolean>(false);

  const totalRowsCount = data.length;
  const totalPageCount = Math.ceil(totalRowsCount / rowsPerPage);

  const paginationRange = UsePagination({
    totalRowsCount, rowsPerPage, totalPageCount, currentPage, setCurrentPage,
  });

  const [sortedData, setSortedData] = useState(Object.values(paginationRange));
  useEffect(() => {
    if (currentPage > totalPageCount) {
      setCurrentPage(1);
    }

    if (currentPage === 0) {
      setCurrentPage(totalPageCount);
    }
  }, [currentPage]);

  useEffect(() => {
    setSortedData(Object.values(paginationRange));
  }, [paginationRange]);

  const onSort = (label: string) => {
    const sortedItems = sortedData.sort((a, b) => {
      const valueA: any = a[label as keyof ItemRow];
      const valueB: any = b[label as keyof ItemRow];

      if (isSorted) {
        return valueA > valueB ? 1 : -1;
      }
      return valueA < valueB ? 1 : -1;
    });

    setSortedData(sortedItems);
    setIsSorted(!isSorted);
  };

  const onClickSearch = (value: string) => {
    const res = sortedData.filter((obj) => Object.entries(obj).some(([keys, values]) => {
      if (values !== null) {
        const elem = values.toString().toLowerCase();
        return elem.includes(value);
      }
    }));

    if (res.length) {
      setSortedData(res);
    }
  };

  const onChangeSelect = (option: string) => {
    const selectData = sortedData.filter((el: ItemRow) => el.status === option);

    if (selectData.length) {
      setSortedData(selectData);
    } else {
      setSortedData(data);
    }
  };

  const onChangeSelectDev = (developers: string[]) => {
    const filteredData = sortedData.filter((row: ItemRow) => row.developers.some((developer) => developers.indexOf(developer) !== -1));
    setSortedData(filteredData);
  };

  const onChangeCellContent = (event: React.ChangeEvent<HTMLTextAreaElement>, itemRow: Record<string, any>, key: string) => {
    const value = event.target.value.trim();
    const hasPunctuationMarks = /([;,.[\d]+)$/.test(value);

    if (hasPunctuationMarks) {
      itemRow[key] = value.split(/[,.;]/);
      return;
    }
    itemRow[key] = value.toString();
  };

  const categoriesValues = selectCategories.map((category) => category.value);
  const categoriesLabels = selectCategories.map((category) => category.label);

  const provider = useMemo(() => ({
    data,
    onChangeCellContent,
    onChangeSelectDev,
    columns,
    developers,
    status,
    onChangeSelect,
    onClickSearch,
    selectCategories,
    categoriesValues,
    categoriesLabels,
  }), []);

  return (
    <Context.Provider value={provider}>
      <main className="grid">
        <SelectDevelopers />
        <SelectStatus />
        <Search />
        <div className="grid-header header">
          <div className="grid-header__cell img-wrapper">
            <img src={confirmation} alt="check" />
          </div>
          {columns.map((column) => (
            <div className="grid-header__cell" key={Math.random()} onClick={() => onSort(column.value)}>
              <div>{column.label}</div>
              <div className="img-wrapper">
                <img className="grid__icon" src={sortIcon} alt="sort icon" />
              </div>
            </div>
          ))}
        </div>
        <div className="grid-rows-wrapper">
          {sortedData.map((item) => <GridRow key={item.id} data={item} />)}
        </div>
        <Pagination
          currentPage={currentPage}
          onPageChange={(page: number) => setCurrentPage(page)}
          onRowsPerPageChange={(e) => setRowsPerPage(e)}
          rowsPerPage={rowsPerPage}
          paginationSelect={paginationSelect}
          totalPageCount={totalPageCount}
        />
      </main>
    </Context.Provider>
  );
}

export default Grid;