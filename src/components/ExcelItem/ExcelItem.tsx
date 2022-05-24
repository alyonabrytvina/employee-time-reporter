import React, { useState } from 'react';
import './ExcelItem.scss';
import { BaseData } from '../Excel/Excel';

interface Props<Data>{
  data: Data
}

export function ExcelItem<Data extends BaseData>({ data }: Props<Data>) {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const items = Object.entries(data).filter(([key, value]) => key !== 'id').map((value) => value[1]);

  const onClickCheckbox = (id: number) => {
    if (selectedItems.includes(id)) {
      setSelectedItems((prevSelectedItems) => prevSelectedItems.filter((prevState) => prevState !== data.id));
    } else {
      setSelectedItems((prevSelectedItems) => [...prevSelectedItems, id]);
    }
  };

  return (
    <div
      className={selectedItems.includes(data.id) ? 'grid__row_selected' : 'grid__row'}
    >
      <div className="grid-item__cell">
        <input type="checkbox" className="custom-checkbox" onClick={() => onClickCheckbox(data.id)} />
      </div>
      {items.map((item) => (
        <div
          className="grid-item__cell"
          key={Math.random()}
          style={{
            display: 'flex',
            justifyContent: typeof item === 'number' ? 'right' : 'left',
            padding: typeof item === 'number' ? '0 20px 0 0' : '0 0 0 20px',
          }}
        >
          {item}
        </div>
      ))}
    </div>
  );
}
