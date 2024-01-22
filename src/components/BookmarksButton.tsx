import { useState } from 'react';
import { TriangleDownIcon } from '@radix-ui/react-icons';

import BookmarksPopover from './BookmarksPopover';

export default function BookmarksButton() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <section>
      <button className='bookmarks-btn' onClick={() => setIsOpen(true)}>
        Bookmarks <TriangleDownIcon />
      </button>
      <BookmarksPopover isOpen={isOpen} />
    </section>
  );
}
