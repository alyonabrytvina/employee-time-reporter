import React, { useContext } from 'react';
import {
  Column, ItemRow, SelectCategory,
} from '../components/App/App';

export interface ContextProps {
    columns: Column[]
    onChangeCellContent: (eventValue:string, itemRow: ItemRow, key: string) => void,
    onChangeSelectDev: (subDevCategory: string[]) => void,
    status: string[]
    developers: Record<string, string[]>
    onChangeSelect: (option: string) => void,
    onClickSearch: (value: string) => void,
    selectCategories:SelectCategory[],
    categoriesLabels: string[],
    categoriesValues: string[],
    data: ItemRow[]
}

export const GridContext = React.createContext<ContextProps|undefined>(undefined);

export function useDataContext() {
  const context = useContext(GridContext);

  if (context === undefined) {
    throw new Error(
      'GridContext must be used inside Provider',
    );
  }

  return context;
}
