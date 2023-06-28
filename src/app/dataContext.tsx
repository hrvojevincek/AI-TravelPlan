'use client';

import { SearchData } from '@/types';
import React, { useState, useContext, ReactNode } from 'react';

type DataContextType = {
  data: SearchData | null;
  setData: React.Dispatch<React.SetStateAction<SearchData | null>>;
};

type Props = {
  children: ReactNode;
};

const initialContextState: DataContextType = {
  data: null,
  setData: () => {
    console.warn('setUser function not yet provided');
  },
};

export const dataContext =
  React.createContext<DataContextType>(initialContextState);

// Create a provider component
export const DataProvider = ({ children }: Props) => {
  const [data, setData] = useState<SearchData | null>(null);

  // Define any functions or values you want to provide
  const value = { data, setData };
  return <dataContext.Provider value={value}>{children}</dataContext.Provider>;
};
// Export the context
export const useDataContext = () => useContext(dataContext);
