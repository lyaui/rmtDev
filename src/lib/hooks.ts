import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { BASE_API_URL } from './constants';
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

export const useJobItem = (id: number | null) => {
  const { data, isLoading } = useQuery(
    ['job-item', id],
    async () => {
      const res = await fetch(`${BASE_API_URL}/${id}`);
      const data = await res.json();
      return data;
    },
    {
      staleTime: 1000 * 60 * 60, // 1hr
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!id, // condition
      onError: (error) => {},
    },
  );

  return { jobItem: data?.jobItem, isLoading } as const;
};

export const useJobItems = (searchText: string) => {
  const [jobItemList, setJobItemList] = useState<TJobItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const jobItemsSliced = jobItemList.slice(0, 7);
  const total = jobItemList.length;

  useEffect(() => {
    if (!searchText) return;

    const fetchJobItemList = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_API_URL}?search=${searchText}`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setJobItemList(data.jobItems);
      } catch {
        console.log('something went wrong');
      } finally {
        setIsLoading(false);
      }
    };
    fetchJobItemList();
  }, [searchText]);

  return { jobItemsSliced, isLoading, total };
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
