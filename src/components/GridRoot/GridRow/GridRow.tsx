import React, {
  useContext, useState,
} from 'react';
import './GridRow.scss';
import { useDataContext } from '../../../context/gridContext';
import { Column, ItemRow } from '../../App/App';
import '../../../assets/styles/global.scss';
import { ThemeContext } from '../../../context/themeContext';
import { useDropdown } from '../../../hooks/useDropdown';

interface Props{
  data: ItemRow
  columns: Column[]
}

export function GridRow({ data, columns }: Props) {
  const { onChangeCellContent } = useDataContext();
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [curIndexCell, setCurIndexCell] = useState<number>(0);

  const {
    ref,
    isDropdownOpen,
    setIsDropdownOpen,
    isContentEdit,
    setIsContentEdit,
  } = useDropdown();

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

  const theme = useContext(ThemeContext);
  return (
    <div
      className="grid-row"
      style={{
        background: selectedItems.includes(data.id) ? 'rgba(143, 127, 255, 0.25)' : theme.backgroundRowsOdd,
        color: theme.mainColor,
        border: theme.border,
      }}
    >
      <div className="checkbox-wrapper">
        <label htmlFor="checkbox">
          <input
            className="checkbox"
            type="checkbox"
            onClick={() => onClickCheckbox(data.id)}
            style={{
              filter: theme.checkmarkColor,
            }}
          />
        </label>
      </div>
      {columns.map((column, indexCell) => {
        const itemCell = data[column.value as keyof ItemRow];

        return (
          <div
            className="grid-row__cell"
            key={Math.random()}
            style={{
              display: 'flex',
              alignItems: typeof itemCell === 'number' ? 'flex-end' : itemCell?.includes('%') ? 'center' : 'flex-start',
            }}
          >
            {Array.isArray(itemCell)
              ? isContentEdit && curIndexCell === indexCell
                ? (
                  <div
                    contentEditable
                    className="grid-row__textarea"
                    onInput={(event) => onChangeCellContent(event.currentTarget.innerText, data, column.value)}
                    suppressContentEditableWarning
                    ref={ref}
                  >
                    {itemCell.join(', ')}
                  </div>
                ) : isDropdownOpen && curIndexCell === indexCell ? (
                  <>
                    <span>
                      {itemCell[0]}
                    </span>
                    <span
                      ref={ref}
                      className="grid-row__cell_hide"
                      onClick={() => onClickHideContent(indexCell, false)}
                    >
                      Hide(
                      {itemCell.length - 1}
                      )
                    </span>
                    <div className="tooltip">
                      <div className="tooltip-arrow" />
                      <div
                        className="tooltip-label"
                        style={{
                          background: selectedItems.includes(data.id) ? 'rgba(143, 127, 255, 0.25)' : theme.backgroundTooltip,
                          color: theme.mainColor,
                          border: theme.border,
                        }}
                      >
                        {itemCell.slice(1).map((content) => (
                          <div
                            key={Math.random()}
                            className="tooltip-label__item"
                            style={{
                              wordBreak: content.length > 13 ? 'break-word' : 'normal',
                            }}
                          >
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
                  <div
                    suppressContentEditableWarning
                    ref={ref}
                    onInput={(event) => onChangeCellContent(event.currentTarget.innerText, data, column.value)}
                    contentEditable
                    onClick={() => onClickCellItem(indexCell)}
                  >
                    {itemCell}
                  </div>
                ) : (
                  <div
                    onClick={() => onClickCellItem(indexCell)}
                    style={{
                      wordBreak: typeof itemCell === 'string' ? 'break-word' : 'normal',
                    }}
                  >
                    {itemCell}
                  </div>
                )}
          </div>
        );
      })}
    </div>
  );
}
