import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { BASE_API_URL } from './constants';
import { handleError } from './utils';
import { TJobItem, TJobItemExpanded } from '../lib/types';

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

export const useJobItem = (id: number) => {
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

type JobItemsApiRes = {
  public: boolean;
  sorted: boolean;
  jobItems: TJobItem[];
};

export const useJobItems = (searchText: string) => {
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
