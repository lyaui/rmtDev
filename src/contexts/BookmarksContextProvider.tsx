import { createContext, useState } from 'react';
import type { ReactNode } from 'react';

type TBookmarkContext = {
  bookmarkedIds: number[];
  handleToggleBookmark: (id: number) => void;
};

export const BookmarkContext = createContext<TBookmarkContext | null>(null);

type BookmarksContextProviderProps = {
  children: ReactNode;
};

function BookmarksContextProvider({ children }: BookmarksContextProviderProps) {
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>([]);

  const handleToggleBookmark = (id: number) => {
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds((_curState) => _curState.filter((_id) => _id !== id));
    } else {
      setBookmarkedIds((_curState) => [..._curState, id]);
    }
  };

  const value = { bookmarkedIds, handleToggleBookmark };
  return (
    <BookmarkContext.Provider value={value}>
      {children}
    </BookmarkContext.Provider>
  );
}

export default BookmarksContextProvider;
