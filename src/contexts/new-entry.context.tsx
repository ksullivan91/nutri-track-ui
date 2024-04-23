import { createContext, ReactNode, useState } from 'react';
import { NutritionalInfo } from '../service/ocr.service';

interface Entry {
  entry: NutritionalInfo;
  updateEntry: (newData: Partial<NutritionalInfo>) => void;
}

export const NewEntryContext = createContext<Entry>({
  entry: {} as NutritionalInfo,
  updateEntry: () => {},
});

interface NewEntryProviderProps {
  children: ReactNode;
}

export const NewEntryProvider = ({ children }: NewEntryProviderProps) => {
  const [newEntry, setNewEntry] = useState<NutritionalInfo>(
    {} as NutritionalInfo
  );

  const updateNewEntry = (newData: Partial<NutritionalInfo>) => {
    setNewEntry({ ...newEntry, ...newData } as NutritionalInfo);
  };

  const value: Entry = {
    entry: newEntry,
    updateEntry: updateNewEntry,
  };

  return (
    <NewEntryContext.Provider value={value}>
      {children}
    </NewEntryContext.Provider>
  );
};
