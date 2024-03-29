import React, {
  useContext, useEffect, useMemo, useState,
} from 'react';
import './Grid.scss';
import { GridRow } from '../GridRow/GridRow';
import { Search } from '../../Search/Search';

import sortIcon from '../../../assets/svgs/sort.svg';
import confirmation from '../../../assets/svgs/checkMark.svg';
import { SelectStatus } from '../../Filters/SelectStatus/SelectStatus';
import { SelectDevelopers } from '../../Filters/SelectDevelopers/SelectDevelopers';

import { GridContext } from '../../../context/gridContext';
import {
  Column, ItemRow,
  PaginationSelectI, SelectCategory,
} from '../../App/App';
import { Pagination } from '../../PaginationRoot/Pagination/Pagination';
import { UsePagination } from '../../../hooks/usePagination';

import { ThemeContext } from '../../../context/themeContext';

export interface RootObject {
  columns: Column[]
  data: ItemRow[]
  developers: Record<string, string[]>
  paginationSelect: PaginationSelectI[]
  selectCategories: SelectCategory[]
  status: string[]
}

export interface RootObjectParent {
  dataBase: {}|RootObject
}

function Grid({ dataBase }: RootObjectParent) {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isSorted, setIsSorted] = useState<boolean>(false);
  const theme = useContext(ThemeContext);

  const {
    status,
    developers,
    paginationSelect,
    selectCategories,
    columns,
    data,
  } = dataBase as RootObject;

  const {
    paginationRange,
    totalPageCount,
  } = UsePagination({
    rowsPerPage,
    currentPage,
    setCurrentPage,
  });

  const [sortedData, setSortedData] = useState(Object.values(paginationRange));

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
    const sortedData = Object.values(paginationRange);
    const filteredData = sortedData.filter((row: ItemRow) => row.developers.some((developer) => developers.indexOf(developer) !== -1));

    if (filteredData.length) {
      setSortedData(filteredData);
    }
  };

  const onChangeCellContent = (eventValue: string, itemRow: Record<string, any>, key: string) => {
    const hasPunctuationMarks = /([;,.])/.test(eventValue);

    if (hasPunctuationMarks) {
      itemRow[key] = eventValue.split(/[,.;]/);

      return itemRow[key];
    }
    itemRow[key] = eventValue.toString();
  };

  const categoriesValues = selectCategories.map((category: SelectCategory) => category.value);
  const categoriesLabels = selectCategories.map((category: SelectCategory) => category.label);

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
  }), [
    data, columns, status,
    selectCategories, categoriesValues,
    categoriesLabels,
  ]);

  return (
    <GridContext.Provider value={provider}>
      <main
        className="grid-wrapper"
        style={{ background: theme.mainBackground }}
      >
        <SelectDevelopers />
        <SelectStatus />
        <Search />
        <div
          className="grid-header header"
          style={{
            background: theme.backgroundHeader,
            border: theme.border,
            color: theme.mainColor,
          }}
        >
          <div className="grid-header__cell img-wrapper">
            <img
              src={confirmation}
              alt="check"
              style={{
                filter: theme.arrowColor,
              }}
            />
          </div>
          {columns.map((column) => (
            <div
              className="grid-header__cell"
              key={Math.random()}
              onClick={() => onSort(column.value)}
            >
              <div>{column.label}</div>
              <div className="img-wrapper">
                <img
                  className="grid__icon"
                  src={sortIcon}
                  alt="sort icon"
                  style={{
                    filter: theme.arrowColor,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="grid-rows-wrapper">
          {sortedData.map((item) => (
            <GridRow
              key={item.id}
              data={item}
              columns={columns}
            />
          ))}
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
    </GridContext.Provider>
  );
}

export default Grid;
