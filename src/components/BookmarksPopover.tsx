import { JobList } from './JobList';
import { useBookmarksCtxVal } from '../lib/hooks';

export default function BookmarksPopover({ isOpen }) {
  const { bookmarkedJobItems, isLoading } = useBookmarksCtxVal();
  if (!isOpen) return null;
  return (
    <div className='bookmarks-popover'>
      <JobList jobItemList={bookmarkedJobItems} isLoading={isLoading} />
    </div>
  );
}
