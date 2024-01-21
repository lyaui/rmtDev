import type { MouseEvent } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';

import { PAGE_DIRECTION } from '../lib/types';

type PaginationButtonProps = {
  direction: PAGE_DIRECTION;
  currentPage: number;
  onClick: () => void;
};

const PaginationButton = ({
  direction,
  currentPage,
  onClick,
}: PaginationButtonProps) => {
  return (
    <button
      className={`pagination__button pagination__button--${direction}`}
      onClick={(event: MouseEvent<HTMLButtonElement>) => {
        onClick();
        event.currentTarget.blur();
      }}
    >
      {direction === PAGE_DIRECTION.BACK && (
        <>
          <ArrowLeftIcon />
          {`Page ${currentPage - 1}`}
        </>
      )}
      {direction === PAGE_DIRECTION.NEXT && (
        <>
          {`Page ${currentPage + 1}`}
          <ArrowRightIcon />
        </>
      )}
    </button>
  );
};

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onClick: (direction: PAGE_DIRECTION) => void;
};

export default function Pagination({
  totalPages,
  currentPage,
  onClick,
}: PaginationProps) {
  return (
    <section className='pagination'>
      {currentPage > 1 && (
        <PaginationButton
          direction={PAGE_DIRECTION.BACK}
          currentPage={currentPage}
          onClick={() => onClick(PAGE_DIRECTION.BACK)}
        />
      )}
      {currentPage < totalPages && (
        <PaginationButton
          direction={PAGE_DIRECTION.NEXT}
          currentPage={currentPage}
          onClick={() => onClick(PAGE_DIRECTION.NEXT)}
        />
      )}
    </section>
  );
}
