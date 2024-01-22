import { forwardRef } from 'react';
import { JobList } from './JobList';
import { useBookmarksCtxVal } from '../lib/hooks';

const BookmarksPopover = forwardRef<HTMLDivElement>((_, ref) => {
  const { bookmarkedJobItems, isLoading } = useBookmarksCtxVal();
  return (
    <div className='bookmarks-popover' ref={ref}>
      <JobList jobItemList={bookmarkedJobItems} isLoading={isLoading} />
    </div>
  );
});

export default BookmarksPopover;
