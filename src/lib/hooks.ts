import { useState, useEffect, useContext } from 'react';
import type { RefObject } from 'react';
import { useQuery, useQueries } from '@tanstack/react-query';

import { BASE_API_URL } from './constants';
import { handleError } from './utils';
import { TJobItem, TJobItemExpanded } from '../lib/types';
import { ActiveIdContext } from '../contexts/ActiveIdContextProvider';
import { BookmarkContext } from '../contexts/BookmarksContextProvider';

export const useActiveIdCtxVal = () => {
  const ctx = useContext(ActiveIdContext);
  if (!ctx) {
    throw new Error('ActiveIdContext is not defined');
  }
  return ctx;
};

export const useBookmarksCtxVal = () => {
  const ctx = useContext(BookmarkContext);
  if (!ctx) {
    throw new Error('BookmarkContext is not defined');
  }
  return ctx;
};

export const useLocalStorage = <T>(key: string, defaultValue: T) => {
  const [value, setValue] = useState<T>(() =>
    JSON.parse(localStorage.getItem(key) || JSON.stringify(defaultValue)),
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
};

export const useActiveId = () => {
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = +window.location.hash.slice(1);
      setActiveId(hash);
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return activeId;
};

type JobItemApiRes = {
  public: boolean;
  jobItem: TJobItemExpanded;
};

const fetchJobItem = async (id: number): Promise<JobItemApiRes> => {
  const res = await fetch(`${BASE_API_URL}/${id}`);

  // 4xx 5xx
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.description);
  }

  const data = await res.json();
  return data;
};

export const useJobItem = (id: number | null) => {
  const { data, isInitialLoading } = useQuery(
    ['job-item', id],
    () => (id ? fetchJobItem(id) : null),
    {
      staleTime: 1000 * 60 * 60, // 1hr
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!id, // condition
      onError: (error) => {
        console.log(error);
      },
    },
  );

  return { jobItem: data?.jobItem, isLoading: isInitialLoading } as const;
};

export const useJobItems = (ids: number[]) => {
  const result = useQueries({
    queries: ids.map((_id) => ({
      queryKey: ['job-item', _id],
      queryFn: () => fetchJobItem(_id),
      ...{
        staleTime: 1000 * 60 * 60,
        refetchOnWindowFocus: false,
        retry: false,
        enabled: !!_id,
        onError: handleError,
      },
    })),
  });

  const jobItems = result
    .map((_result) => _result.data?.jobItem)
    .filter((_item) => !!_item) as TJobItemExpanded[]; // 濾掉 undefined

  const isLoading = result.some((_result) => _result.isLoading);

  return { jobItems, isLoading } as const;
};

type JobItemsApiRes = {
  public: boolean;
  sorted: boolean;
  jobItems: TJobItem[];
};

export const useSearchQuery = (searchText: string) => {
  const fetchJobItems = async (searchText: string): Promise<JobItemsApiRes> => {
    const res = await fetch(`${BASE_API_URL}?search=${searchText}`);
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.description);
    }
    const data = await res.json();
    return data;
  };

  const { data, isInitialLoading } = useQuery(
    ['job-items', searchText],
    () => fetchJobItems(searchText),
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!searchText,
      onError: handleError,
    },
  );
  return { jobItemList: data?.jobItems, isLoading: isInitialLoading } as const;
};

export const useDebounce = <T>(value: T, delay: number = 500): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timeId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeId);
    };
  }, [value, delay]);

  return debouncedValue;
};

export const useClickOutside = (
  refs: RefObject<HTMLElement>[],
  cb: () => void,
) => {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        refs.every((_ref) => !_ref.current?.contains(event.target as Node))
        // !buttonRef.current.contains(event.target) && // e.target.contains() 的參數應該是一個 DOM 元素
        // !buttonRef.current.contains(event.target)
      ) {
        cb();
      }
    };
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [refs, cb]);
};
