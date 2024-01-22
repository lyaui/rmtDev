import { useState, useEffect, useRef } from 'react';
import type { MouseEvent } from 'react';
import { TriangleDownIcon } from '@radix-ui/react-icons';

import BookmarksPopover from './BookmarksPopover';

export default function BookmarksButton() {
  const [isOpen, setIsOpen] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!(event.target instanceof HTMLElement)) return;
      if (!buttonRef.current) return;
      if (
        !buttonRef.current.contains(event.target) &&
        !event.target.closest('.bookmarks-popover')
      ) {
        setIsOpen(false); // e.target.contains() 的參數應該是一個 DOM 元素
      }
    };
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

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
