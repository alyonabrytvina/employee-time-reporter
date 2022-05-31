import React, { useState } from 'react';
import './ExcelItem.scss';
import { BaseData } from '../Excel/Excel';
import { useDataContext } from '../../context';
import { ItemRow } from '../../App';

// export interface ItemRow{
//   taskName: string,
//   developers: string | string[],
//   workType: string | string[],
//   status: string,
//   estimation: number,
//   totalTimeSpent: number,
//   myTimeSpentByPeriod: number,
//   efficiency: number,
//   id: number
// }

interface Props<Data>{
  data: Data
  indexRow: number
}

export function ExcelItem<Data extends BaseData>({ data, indexRow }: Props<Data>) {
  const { onChangeContent, labelsCell } = useDataContext();

  const labelKeys = labelsCell?.map((label) => Object.keys(label));

  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [isContentEdit, setIsContentEdit] = useState<boolean>(false);

  const [curIndexCell, setCurIndexCell] = useState<number>(0);
  const [isHiddenContentOpen, setIsHiddenContentOpen] = useState<boolean>(false);

  const onClickCellItem = (indexCell: number) => {
    setIsContentEdit(true);
    setCurIndexCell(indexCell);
  };

  const onClickCheckbox = (id: number) => {
    if (selectedItems.includes(id)) {
      setSelectedItems((prevSelectedItems) => prevSelectedItems.filter((prevState) => prevState !== data.id));
    } else {
      setSelectedItems((prevSelectedItems) => [...prevSelectedItems, id]);
    }
  };

  const onClickHiddenContent = (index: number, isOpen: boolean) => {
    setIsHiddenContentOpen(isOpen);
    setCurIndexCell(index);
  };

  const closeEdit = (indexCell: number) => {
    if (isContentEdit && indexCell !== curIndexCell) {
      setIsContentEdit(false);
    }
  };

  return (
    <div
      className={selectedItems.includes(data.id) ? 'grid__row_selected' : 'grid__row'}
    >
      <div className="grid-item__cell">
        <input type="checkbox" className="custom-checkbox" onClick={() => onClickCheckbox(data.id)} />
      </div>
      { labelKeys.map((labels, indexCell) => {
        const key = labels.toString();
        const itemCell = data[key as keyof ItemRow];

        return (
          <div
            className="grid-item__cell"
            key={Math.random()}
            onClick={() => closeEdit(indexCell)}
            style={{
              display: 'flex',
              alignItems: typeof itemCell === 'number' ? 'flex-end' : 'flex-start',
              padding: typeof itemCell === 'number' ? '0 20px 0 0' : '0 0 0 20px',
            }}
          >

            {Array.isArray(itemCell)
              ? isContentEdit && curIndexCell === indexCell
                ? (
                  <div className="grid-item__wrapper-cell-edit">
                    {/* <div onClick={() => setIsContentEdit(false)}> */}
                    {/*  <img */}
                    {/*    src={checkMark} */}
                    {/*    alt="checkMark icon" */}
                    {/*  /> */}
                    {/* </div> */}
                    <textarea
                      className="grid-item__cell-edit"
                      onChange={(e) => onChangeContent(e, data, key)}
                      defaultValue={itemCell.join(', ')}
                    />
                  </div>
                ) : isHiddenContentOpen && curIndexCell === indexCell ? (
                  <>
                    <span onClick={() => onClickCellItem(indexCell)}>{itemCell[0]}</span>
                    <span className="grid-item__cell_hide-content" onClick={() => onClickHiddenContent(indexCell, false)}>
                      Hide(
                      {itemCell.length - 1}
                      )
                    </span>
                    <div id="tooltip" className="left">
                      <div className="tooltip-arrow" />
                      <div className="tooltip-label">
                        {itemCell.slice(1).map((el) => (
                          <div key={Math.random()} className="tooltip-label__item">
                            {el}
                            <br />
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <span onClick={() => onClickCellItem(indexCell)}>{itemCell[0]}</span>
                    <span className="grid-item__cell_hide-content" onClick={() => onClickHiddenContent(indexCell, true)}>
                      Show more(
                      {itemCell.length - 1}
                      )
                    </span>
                  </>
                )
              : isContentEdit && curIndexCell === indexCell
                ? (
                  <div className="grid-item__wrapper-cell-edit">
                    {/* <div onClick={() => setIsContentEdit(false)}> */}
                    {/*  <img */}
                    {/*    src={checkMark} */}
                    {/*    alt="checkMark icon" */}
                    {/*  /> */}
                    {/* </div> */}
                    <textarea
                      className="grid-item__cell-edit"
                      onChange={(e) => onChangeContent(e, data, key)}
                      defaultValue={itemCell}
                    />
                  </div>
                ) : (
                  <div onClick={() => onClickCellItem(indexCell)}>{itemCell}</div>
                )}
          </div>
        );
      })}
    </div>
  );
}
