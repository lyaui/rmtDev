import { createContext, useState } from 'react';
import type { ReactNode } from 'react';

import { useDebounce } from '../lib/hooks';

type TSearchTextContext = {
  searchText: string;
  debouncedText: string;
  handleChangeSearchText: (text: string) => void;
};

export const SearchTextContext = createContext<TSearchTextContext | null>(null);

type SearchTextContextProviderProps = {
  children: ReactNode;
};

function SearchTextContextProvider({
  children,
}: SearchTextContextProviderProps) {
  const [searchText, setSearchText] = useState('');
  const debouncedText = useDebounce(searchText, 250);

  const handleChangeSearchText = (newSearchText: string) => {
    setSearchText(newSearchText);
  };

  const value = {
    searchText,
    debouncedText,
    handleChangeSearchText,
  };

  return (
    <SearchTextContext.Provider value={value}>
      {children}
    </SearchTextContext.Provider>
  );
}

export default SearchTextContextProvider;
