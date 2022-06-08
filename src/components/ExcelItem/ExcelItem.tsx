import React, { useRef, useState } from 'react';
import './ExcelItem.scss';
import { useDataContext } from '../../context';
import { ItemRow } from '../../App';
import '../../assets/styles/global.scss';

interface Props{
  data: ItemRow
}

export function ExcelItem({ data }: Props) {
  const { onChangeContent, columns } = useDataContext();

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

  const onClickHiddenContent = (index: number, isOpen: boolean) => {
    setIsDropdownOpen(isOpen);
    setCurIndexCell(index);
  };

  const closeOpenDropdown = (e: React.MouseEvent<HTMLElement>) => {
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
      className={selectedItems.includes(data.id) ? 'grid__row_selected' : 'grid__row'}
      onClick={(e) => closeOpenDropdown(e)}
    >
      <div className="grid-item__cell">
        <input type="checkbox" className="custom-checkbox" onClick={() => onClickCheckbox(data.id)} />
      </div>
      { columns.map((column, indexCell) => {
        const itemCell = data[column.value as keyof ItemRow];
        return (
          <div
            className="grid-item__cell"
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
                    className="cell-edit"
                    onChange={(e) => onChangeContent(e, data, column.value)}
                    defaultValue={itemCell.join(', ')}
                    ref={refTextArea}
                  />
                ) : isDropdownOpen && curIndexCell === indexCell ? (
                  <>
                    <span onClick={(e) => closeEdit(e, indexCell)}>{itemCell[0]}</span>
                    <span ref={refSpanElement} className="grid-item__cell_hide-content">
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
                    <span className="grid-item__cell_hide-content" onClick={() => onClickHiddenContent(indexCell, true)}>
                      {Array.isArray(itemCell) && itemCell.length > 1 && `Show more(
                          ${itemCell.length - 1}
                      )`}
                    </span>
                  </>
                )
              : isContentEdit && curIndexCell === indexCell
                ? (
                  <textarea
                    className="cell-edit"
                    onChange={(e) => onChangeContent(e, data, column.value)}
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
