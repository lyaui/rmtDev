import { createContext, useState, useMemo, useCallback } from 'react';
import type { ReactNode } from 'react';

import { TJobItem } from '../lib/types';
import { useSearchTextCtxVal, useSearchQuery } from '../lib/hooks';
import { PAGE_DIRECTION, SORT_BY } from '../lib/types';
import { RESULT_PER_PAGE } from '../lib/constants';

type TJobItemsContext = {
  isLoading: boolean;
  jobItemsSortedAndSliced: TJobItem[] | undefined;
  total: number;
  sortBy: SORT_BY;
  handleChangePage: (direction: PAGE_DIRECTION) => void;
  handleChangeSortBy: (sortBy: SORT_BY) => void;
  currentPage: number;
  totalPages: number;
};

export const JobItemsContext = createContext<TJobItemsContext | null>(null);

type JobItemsContextProviderProps = {
  children: ReactNode;
};

function JobItemsContextProvider({ children }: JobItemsContextProviderProps) {
  // state
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState(SORT_BY.RELEVANT);
  const { debouncedText } = useSearchTextCtxVal();

  // computed(derived) states
  const { jobItemList, isLoading } = useSearchQuery(debouncedText);
  const jobItemsSorted = useMemo(
    () =>
      [...(jobItemList || [])].sort((a, b) => {
        if (sortBy === SORT_BY.RELEVANT) {
          return b.relevanceScore - a.relevanceScore;
        } else if (sortBy === SORT_BY.RECENT) {
          return a.daysAgo - b.daysAgo;
        }
        return 0;
      }),
    [jobItemList, sortBy],
  );

  const jobItemsSortedAndSliced = useMemo(
    () =>
      jobItemsSorted.slice(
        (currentPage - 1) * RESULT_PER_PAGE,
        currentPage * RESULT_PER_PAGE,
      ),
    [jobItemsSorted, currentPage],
  );
  const total = jobItemList?.length || 0;
  const totalPages = Math.ceil(total / RESULT_PER_PAGE);

  // event handler / actions
  const handleChangePage = useCallback((direction: PAGE_DIRECTION) => {
    if (direction === PAGE_DIRECTION.NEXT) {
      setCurrentPage((_curState) => _curState + 1);
    } else if (direction === PAGE_DIRECTION.BACK) {
      setCurrentPage((_curState) => _curState - 1);
    }
  }, []);

  const handleChangeSortBy = useCallback((sortBy: SORT_BY) => {
    setCurrentPage(1);
    setSortBy(sortBy);
  }, []);

  const value = useMemo(
    () => ({
      isLoading,
      jobItemsSortedAndSliced,
      total,
      sortBy,
      handleChangePage,
      handleChangeSortBy,
      currentPage,
      totalPages,
    }),
    [
      currentPage,
      isLoading,
      jobItemsSortedAndSliced,
      sortBy,
      total,
      totalPages,
      handleChangePage,
      handleChangeSortBy,
    ],
  );

  return (
    <JobItemsContext.Provider value={value}>
      {children}
    </JobItemsContext.Provider>
  );
}

export default JobItemsContextProvider;
