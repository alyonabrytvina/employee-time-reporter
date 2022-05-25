import React, { useState } from 'react';
import './ExcelItem.scss';
import { BaseData } from '../Excel/Excel';
import deleteIcon from '../../assets/svgs/delete icon.svg';

interface Props<Data>{
  data: Data
}

export function ExcelItem<Data extends BaseData>({ data }: Props<Data>) {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const items = Object.entries(data).filter(([key, value]) => key !== 'id').map((value) => value[1]);

  const [curI, setCurI] = useState<number>();
  const onClickCheckbox = (id: number) => {
    if (selectedItems.includes(id)) {
      setSelectedItems((prevSelectedItems) => prevSelectedItems.filter((prevState) => prevState !== data.id));
    } else {
      setSelectedItems((prevSelectedItems) => [...prevSelectedItems, id]);
    }
  };

  const onClickHiddenContent = (index: number) => {
    setCurI(index);
  };

  return (
    <div
      className={selectedItems.includes(data.id) ? 'grid__row_selected' : 'grid__row'}
    >
      <div className="grid-item__cell">
        <input type="checkbox" className="custom-checkbox" onClick={() => onClickCheckbox(data.id)} />
      </div>
      {items.map((item, index) => {
        const showItems = Array.isArray(item) ? item.slice(0, 2) : [];
        const showHiddenItems = curI === index && Array.isArray(item) ? item.slice(2) : [];

        return (
          <div
            className="grid-item__cell"
            key={Math.random()}
            style={{
              display: 'flex',
              justifyContent: typeof item === 'number' ? 'right' : 'left',
              padding: typeof item === 'number' ? '0 20px 0 0' : '0 0 0 20px',
            }}
          >
            {Array.isArray(item) && item.length > 2 ? (
              <div>
                <span>
                  {showItems.map((el) => (
                    <div key={Math.random()}>
                      {el}
                      <br />
                    </div>
                  ))}
                </span>
                {curI === index && Array.isArray(item) ? (
                  <>
                    <span className="grid-item__cell_hide-content" onClick={() => onClickHiddenContent(0)}>
                      Hide(
                      {item.length - 2}
                      )
                    </span>
                    <div id="tooltip" className="left">
                      <div className="tooltip-arrow" />
                      <div className="tooltip-label">
                        {showHiddenItems.map((el) => (
                          <div key={Math.random()} className="tooltip-label__item">
                            {el}
                            <br />
                          </div>
                        ))}
                        <div
                          className="tooltip-label__icon"
                          onClick={() => onClickHiddenContent(0)}
                        >
                          <img
                            src={deleteIcon}
                            alt="delete icon"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <span className="grid-item__cell_hide-content" onClick={() => onClickHiddenContent(index)}>
                    Show more(
                    {item.length - 2}
                    )
                  </span>
                )}
              </div>
            ) : (
              <div>{item}</div>
            )}
          </div>
        );
      })}
    </div>

  );
}
