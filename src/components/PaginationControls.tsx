import type { MouseEvent } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';

import { useJobItemsContextVal } from '../lib/hooks';
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

export default function Pagination() {
  const { totalPages, currentPage, handleChangePage } = useJobItemsContextVal();
  return (
    <section className='pagination'>
      {currentPage > 1 && (
        <PaginationButton
          direction={PAGE_DIRECTION.BACK}
          currentPage={currentPage}
          onClick={() => handleChangePage(PAGE_DIRECTION.BACK)}
        />
      )}
      {currentPage < totalPages && (
        <PaginationButton
          direction={PAGE_DIRECTION.NEXT}
          currentPage={currentPage}
          onClick={() => handleChangePage(PAGE_DIRECTION.NEXT)}
        />
      )}
    </section>
  );
}
