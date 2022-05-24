import React, { useState } from 'react';
import './Excel.scss';
import { ExcelItem } from '../ExcelItem/ExcelItem';
import sortIcon from '../../assets/svgs/sort.svg';
import confirmation from '../../assets/svgs/confirmation.svg';
import { Search } from '../Search/Search';

export interface BaseData {
  id: number
}

interface Props<Data>{
    data: Data[]
    labels: string[]
}

export function Excel<Data extends BaseData>({ labels, data }: Props<Data>) {
  const [isSorted, setIsSorted] = useState<boolean>(false);
  const [sortedData, setSortedData] = useState(Object.values(data));

  const onSort = (label: string) => {
    const sortedItems = data.sort((a, b) => {
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
    const res = data.filter((obj) => Object.entries(obj).some((item) => {
      const elem = item[1].toString();
      return elem.includes(value);
    }));

    if (res.length) {
      setSortedData(res);
    }
  };

  return (
    <main
      className="grid-wrapper"
    >
      <Search onClickSearch={onClickSearch} />
      <div className="grid__header">
        <div className="grid__cell">
          <img src={confirmation} alt="check" />
        </div>
        {labels.map((label) => (
          <div className="grid__cell" key={Math.random()} onClick={() => onSort(label)}>
            <div>{label}</div>
            <img className="icon" src={sortIcon} alt="sort icon" />
          </div>
        ))}
      </div>
      {sortedData.map((item: Data) => <ExcelItem<Data> key={item.id} data={item} />)}
    </main>
  );
}
