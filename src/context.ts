import React, { useContext } from 'react';
import {
  Columns, ItemRow, SelectCategories,
} from './components/App/App';

export interface ContextProps {
    columns: Columns[]
    onChangeCellContent: (e:React.ChangeEvent<HTMLTextAreaElement>, itemRow: ItemRow, key: string) => void,
     onChangeSelectDev: (subDevCategory: string[]) => void,
    status: string[]
    developers: Record<string, string[]>
     onChangeSelect: (option: string) => void,
     onClickSearch: (value: string) => void,

    selectCategories:SelectCategories[],
    categoriesLabels: string[],
    categoriesValues: string[],
    data: ItemRow[]
}

export const Context = React.createContext<ContextProps|undefined>(undefined);

export function useDataContext() {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error(
      'Context must be used inside Provider',
    );
  }

  return context;
}
