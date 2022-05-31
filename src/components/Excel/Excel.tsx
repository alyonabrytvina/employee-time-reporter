import React, { useMemo, useState } from 'react';
import './Excel.scss';
import { ExcelItem } from '../ExcelItem/ExcelItem';
import sortIcon from '../../assets/svgs/sort.svg';
import confirmation from '../../assets/svgs/checkMark.svg';
import { Search } from '../Search/Search';
import { SelectStatus } from '../SelectStatus/SelectStatus';
import { SelectDev } from '../SelectDev/SelectDev';
import { Context } from '../../context';
import { ItemRow } from '../../App';

export interface BaseData {
  developers: string | string[],
  efficiency: number,
  estimation: number,
  id: number,
  myTimeSpentByPeriod: number,
  status: string
  taskName: string,
  totalTimeSpent: number,
  workType: string | string[],
}

interface Props<Data>{
    tasks: Data[]
    labelsCell: string[]
    status: string[]
    labelsDev: string[]
    dev: Record<string, string[]>
}

export function Excel<Data extends BaseData>({
  tasks, labelsCell, status, dev, labelsDev,
}: Props<Data>) {
  const [isSorted, setIsSorted] = useState<boolean>(false);
  const [sortedData, setSortedData] = useState(Object.values(tasks));
  // const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const onSort = (label: string) => {
    const sortedItems = tasks.sort((a, b) => {
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
    const res = tasks.filter((obj) => Object.entries(obj).some(([keys, values]) => {
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
    const selectData = tasks.filter((el: BaseData) => el.status === option);

    if (selectData.length) {
      setSortedData(selectData);
    } else {
      setSortedData(tasks);
    }
  };

  const onChangeSelectDev = (option: string[], subDevCat: string[]) => {
    // const filteredData = tasks.filter((el: BaseData) => option.includes(el.workType));
    // console.log(filteredData);
    // setSortedData(filteredData);
  };

  const onChangeContent = (event: React.ChangeEvent<HTMLTextAreaElement>, itemRow: ItemRow, key: string) => {
    const value = event.target.value.trim().split(',');

    if (event.target.value.includes(',')) {
      // @ts-ignore
      itemRow[key as keyof ItemRow] = value;
      return;
    }
    // @ts-ignore
    itemRow[key as keyof ItemRow] = value.toString();

    console.log(itemRow[key as keyof ItemRow]);
  };

  const provider = useMemo(() => ({
    onChangeContent,
    onChangeSelectDev,
    labelsCell,
    labelsDev,
    dev,
    status,
    onChangeSelect,
    onClickSearch,
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
          <div className="grid__cell">
            <img src={confirmation} alt="check" />
          </div>
          {labelsCell?.map((label) => {
            const keyHeader = Object.values(label);
            const labelValue = Object.keys(label).join('');

            return (
              <div className="grid__cell" key={Math.random()} onClick={() => onSort(labelValue)}>
                <div>{keyHeader}</div>
                <img className="grid__icon" src={sortIcon} alt="sort icon" />
              </div>
            );
          })}
        </div>
        {sortedData.map((item: Data, index) => <ExcelItem<Data> key={item.id} data={item} indexRow={index} />)}
      </main>
    </Context.Provider>
  );
}
