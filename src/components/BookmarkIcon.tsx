import type { MouseEvent } from 'react';
import { BookmarkFilledIcon } from '@radix-ui/react-icons';

import { useBookmarksCtxVal } from '../lib/hooks';

type BookmarkIconProps = { id: number };

export default function BookmarkIcon({ id }: BookmarkIconProps) {
  const { handleToggleBookmark, bookmarkedIds } = useBookmarksCtxVal();
  const isActive = !!bookmarkedIds.find((_id) => _id === id);

  return (
    <button
      className='bookmark-btn'
      onClick={(event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.stopPropagation();
        handleToggleBookmark(id);
      }}
    >
      <BookmarkFilledIcon className={isActive ? 'filled' : ''} />
    </button>
  );
}
