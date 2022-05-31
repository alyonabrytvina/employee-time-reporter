import React, { useContext } from 'react';
import { ItemRow } from './App';

export interface ContextProps {
        onChangeContent: (e:React.ChangeEvent<HTMLTextAreaElement>, itemRow: ItemRow, key: string) => void,
        onChangeSelectDev: (option: string[], subDevCategory: string[]) => void,
        labelsCell: string[]
        status: string[]
        labelsDev: string[]
        dev: Record<string, string[]>
        onChangeSelect: (option: string) => void,
        onClickSearch: (value: string) => void,
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
