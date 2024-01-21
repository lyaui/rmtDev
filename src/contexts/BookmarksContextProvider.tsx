import { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

type TBookmarkContext = {
  bookmarkedIds: number[];
  handleToggleBookmark: (id: number) => void;
};

export const BookmarkContext = createContext<TBookmarkContext | null>(null);

type BookmarksContextProviderProps = {
  children: ReactNode;
};

const STORAGE_KEY = 'bookmarkedIds';

function BookmarksContextProvider({ children }: BookmarksContextProviderProps) {
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>(
    () => JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as number[],
  );

  const handleToggleBookmark = (id: number) => {
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds((_curState) => _curState.filter((_id) => _id !== id));
    } else {
      setBookmarkedIds((_curState) => [..._curState, id]);
    }
  };

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarkedIds));
  }, [bookmarkedIds]);

  const value = { bookmarkedIds, handleToggleBookmark };

  return (
    <BookmarkContext.Provider value={value}>
      {children}
    </BookmarkContext.Provider>
  );
}

export default BookmarksContextProvider;
