import type { ReactNode } from 'react';

import { SORT_BY } from '../lib/types';

type SortingProps = {
  sortBy: SORT_BY;
  onClick: (sortBy: SORT_BY) => void;
};

export default function Sorting({ sortBy, onClick }: SortingProps) {
  return (
    <section className='sorting'>
      <i className='fa-solid fa-arrow-down-short-wide'></i>
      <SortByButton
        isActive={sortBy === SORT_BY.RELEVANT}
        onClick={() => onClick(SORT_BY.RELEVANT)}
      >
        Relevant
      </SortByButton>
      <SortByButton
        isActive={sortBy === SORT_BY.RECENT}
        onClick={() => onClick(SORT_BY.RECENT)}
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
