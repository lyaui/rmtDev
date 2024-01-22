import { forwardRef } from 'react';
import { createPortal } from 'react-dom';
import { JobList } from './JobList';
import { useBookmarksCtxVal } from '../lib/hooks';

const BookmarksPopover = forwardRef<HTMLDivElement>((_, ref) => {
  const { bookmarkedJobItems, isLoading } = useBookmarksCtxVal();
  return createPortal(
    <div className='bookmarks-popover' ref={ref}>
      <JobList jobItemList={bookmarkedJobItems} isLoading={isLoading} />
    </div>,
    document.body,
  );
});

export default BookmarksPopover;
