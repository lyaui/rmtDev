import { useState, useEffect, useRef } from 'react';
import type { MouseEvent } from 'react';
import { TriangleDownIcon } from '@radix-ui/react-icons';

import BookmarksPopover from './BookmarksPopover';
import { useClickOutside } from '../lib/hooks';

export default function BookmarksButton() {
  const [isOpen, setIsOpen] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  useClickOutside([buttonRef, popoverRef], () => setIsOpen(false));

  return (
    <section>
      <button
        className='bookmarks-btn'
        onClick={() => setIsOpen(true)}
        ref={buttonRef}
      >
        Bookmarks <TriangleDownIcon />
      </button>
      {isOpen && <BookmarksPopover ref={popoverRef} />}
    </section>
  );
}
