import type { ReactNode } from 'react';

import { useJobItemsContextVal } from '../lib/hooks';
import { SORT_BY } from '../lib/types';

export default function Sorting() {
  const { sortBy, handleChangeSortBy } = useJobItemsContextVal();
  return (
    <section className='sorting'>
      <i className='fa-solid fa-arrow-down-short-wide'></i>
      <SortByButton
        isActive={sortBy === SORT_BY.RELEVANT}
        onClick={() => handleChangeSortBy(SORT_BY.RELEVANT)}
      >
        Relevant
      </SortByButton>
      <SortByButton
        isActive={sortBy === SORT_BY.RECENT}
        onClick={() => handleChangeSortBy(SORT_BY.RECENT)}
      >
        Recent
      </SortByButton>
    </section>
  );
}

type SortByButtonProps = {
  children: ReactNode;
  onClick: () => void;
  isActive: boolean;
};

const SortByButton = ({ children, isActive, onClick }: SortByButtonProps) => {
  return (
    <button
      className={`sorting__button ${isActive ? 'sorting__button--active' : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
