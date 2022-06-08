import React, { useEffect, useMemo, useState } from 'react';
import './Excel.scss';
import { ExcelItem } from '../ExcelItem/ExcelItem';
import sortIcon from '../../assets/svgs/sort.svg';
import confirmation from '../../assets/svgs/checkMark.svg';
import { Search } from '../Search/Search';
import { SelectStatus } from '../SelectStatus/SelectStatus';
import { SelectDev } from '../SelectDev/SelectDev';
import { Context } from '../../context';
import { Columns, ItemRow, SelectCategories } from '../../App';

interface Props<Data>{
    data: Data[]
    columns: Columns[]
    status: string[]
    selectCategories: SelectCategories[]
    dev: Record<string, string[]>
}

export function Excel<Data extends ItemRow>({
  data, columns, status, dev, selectCategories,
}: Props<Data>) {
  const [isSorted, setIsSorted] = useState<boolean>(false);
  const [sortedData, setSortedData] = useState(Object.values(data));

  useEffect(() => {
    setSortedData(Object.values(data));
  }, [data]);

  const onSort = (label: string) => {
    const sortedItems = sortedData.sort((a, b) => {
      const valueA = a[label as keyof Data];
      const valueB = b[label as keyof Data];

      if (isSorted) {
        return valueA > valueB ? 1 : -1;
      }
      return valueA < valueB ? 1 : -1;
    });

    setSortedData(sortedItems);
    setIsSorted(!isSorted);
  };

  const onClickSearch = (value: string) => {
    const res = data.filter((obj) => Object.entries(obj).some(([keys, values]) => {
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

  const onChangeContent = (event: React.ChangeEvent<HTMLTextAreaElement>, itemRow: Record<string, any>, key: string) => {
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
    onChangeContent,
    onChangeSelectDev,
    columns,
    dev,
    status,
    onChangeSelect,
    onClickSearch,

    selectCategories,
    categoriesValues,
    categoriesLabels,
  }), []);

  return (
    <Context.Provider value={provider}>
      <main
        className="grid-wrapper"
      >
        <SelectDev />
        <SelectStatus />
        <Search />
        <div className="grid__header">
          <div className="grid__cell icon">
            <img src={confirmation} alt="check" />
          </div>
          {columns.map((column) => (
            <div className="grid__cell" key={Math.random()} onClick={() => onSort(column.label)}>
              <div>{column.label}</div>
              <img className="grid__icon" src={sortIcon} alt="sort icon" />
            </div>
          ))}
        </div>
        {sortedData.map((item) => <ExcelItem key={item.id} data={item} />)}
      </main>
    </Context.Provider>
  );
}
