import { useState, useEffect } from 'react';

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

  return { activeId };
};

export const useJobItem = (id: number | null) => {
  const [jobItem, setJobItem] = useState<TJobItemExpanded | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchJobItem = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_API_URL}/${id}`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setJobItem(data.jobItem);
      } catch {
        console.log('something went wrong');
      } finally {
        setIsLoading(false);
      }
    };
    fetchJobItem();
  }, [id]);

  return { jobItem, isLoading };
};

export const useJobItems = (searchText: string) => {
  const [jobItemList, setJobItemList] = useState<TJobItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const jobItemsSliced = jobItemList.slice(0, 7);

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

  return { jobItemsSliced, isLoading };
};
