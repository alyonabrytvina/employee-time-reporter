import React, { useRef, useState } from 'react';
import './GridRow.scss';
import { useDataContext } from '../../context';
import { ItemRow } from '../App/App';
import '../../assets/styles/global.scss';

interface Props{
  data: ItemRow
}

export function GridRow({ data }: Props) {
  const { onChangeCellContent, columns } = useDataContext();

  const refTextArea = useRef<HTMLTextAreaElement>(null);
  const refSpanElement = useRef<HTMLSpanElement>(null);

  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [isContentEdit, setIsContentEdit] = useState<boolean>(false);

  const [curIndexCell, setCurIndexCell] = useState<number>(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

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

  const onClickHideContent = (index: number, isOpen: boolean) => {
    setIsDropdownOpen(isOpen);
    setCurIndexCell(index);
  };

  const closeDropdown = (e: React.MouseEvent<HTMLElement>) => {
    if (refSpanElement.current && isDropdownOpen && !refSpanElement.current.contains(e.target as HTMLDivElement)) {
      setIsDropdownOpen(false);
    }
  };

  const closeEdit = (e: React.MouseEvent<HTMLElement>, indexCell: number) => {
    if (refTextArea.current && isContentEdit && !refTextArea.current.contains(e.target as HTMLTextAreaElement)) {
      setIsContentEdit(false);
    }
  };

  return (
    <div
      className={selectedItems.includes(data.id) ? 'grid-row_selected' : 'grid-row'}
      onClick={(e) => closeDropdown(e)}
    >
      <div className="checkbox-wrapper">
        <label htmlFor="checkbox">
          <input className="checkbox" type="checkbox" onClick={() => onClickCheckbox(data.id)} />
        </label>
      </div>
      {columns.map((column, indexCell) => {
        const itemCell = data[column.value as keyof ItemRow];
        return (
          <div
            className="grid-row__cell"
            key={Math.random()}
            onClick={(e) => closeEdit(e, indexCell)}
            style={{
              display: 'flex',
              alignItems: typeof itemCell === 'number' ? 'flex-end' : itemCell?.includes('%') ? 'center' : 'flex-start',
            }}
          >
            {Array.isArray(itemCell)
              ? isContentEdit && curIndexCell === indexCell
                ? (
                  <textarea
                    className="grid-row__textarea"
                    onChange={(e) => onChangeCellContent(e, data, column.value)}
                    defaultValue={itemCell.join(', ')}
                    ref={refTextArea}
                  />
                ) : isDropdownOpen && curIndexCell === indexCell ? (
                  <>
                    <span onClick={(e) => closeEdit(e, indexCell)}>{itemCell[0]}</span>
                    <span
                      ref={refSpanElement}
                      className="grid-row__cell_hide"
                      onClick={() => onClickHideContent(indexCell, false)}
                    >
                      Hide(
                      {itemCell.length - 1}
                      )
                    </span>
                    <div className="tooltip">
                      <div className="tooltip-arrow" />
                      <div className="tooltip-label">
                        {itemCell.slice(1).map((content) => (
                          <div key={Math.random()} className="tooltip-label__item">
                            {content}
                            <br />
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <span onClick={() => onClickCellItem(indexCell)}>{itemCell[0]}</span>
                    <span className="grid-row__cell_hide" onClick={() => onClickHideContent(indexCell, true)}>
                      {Array.isArray(itemCell) && itemCell.length > 1 && `Show more(
                          ${itemCell.length - 1}
                      )`}
                    </span>
                  </>
                )
              : isContentEdit && curIndexCell === indexCell
                ? (
                  <textarea
                    className="grid-row__textarea"
                    onChange={(e) => onChangeCellContent(e, data, column.value)}
                    defaultValue={itemCell as any}
                    ref={refTextArea}
                  />
                ) : (
                  <div onClick={() => onClickCellItem(indexCell)}>{itemCell}</div>
                )}
          </div>
        );
      })}
    </div>
  );
}
