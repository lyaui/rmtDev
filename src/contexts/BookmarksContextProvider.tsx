import { createContext } from 'react';
import type { ReactNode } from 'react';

import { useJobItems, useLocalStorage } from '../lib/hooks';
import { TJobItemExpanded } from '../lib/types';

type TBookmarkContext = {
  bookmarkedIds: number[];
  handleToggleBookmark: (id: number) => void;
  bookmarkedJobItems: TJobItemExpanded[];
  isLoading: boolean;
};

export const BookmarkContext = createContext<TBookmarkContext | null>(null);

type BookmarksContextProviderProps = {
  children: ReactNode;
};

function BookmarksContextProvider({ children }: BookmarksContextProviderProps) {
  const [bookmarkedIds, setBookmarkedIds] = useLocalStorage<number[]>(
    'bookmarkedIds',
    [],
  );

  const { jobItems, isLoading } = useJobItems(bookmarkedIds);

  const handleToggleBookmark = (id: number) => {
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds((_curState) => _curState.filter((_id) => _id !== id));
    } else {
      setBookmarkedIds((_curState) => [..._curState, id]);
    }
  };

  const value = {
    bookmarkedIds,
    handleToggleBookmark,
    bookmarkedJobItems: jobItems,
    isLoading,
  };

  return (
    <BookmarkContext.Provider value={value}>
      {children}
    </BookmarkContext.Provider>
  );
}

export default BookmarksContextProvider;
