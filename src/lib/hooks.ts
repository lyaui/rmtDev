import { useState, useEffect } from 'react';

import { TJobItem } from '../lib/types';

export const useJobItems = (searchText: string) => {
  const [jobItemList, setJobItemList] = useState<TJobItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const jobItemsSliced = jobItemList.slice(0, 7);

  useEffect(() => {
    if (!searchText) return;

    const fetchJobItemList = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=${searchText}`,
        );
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
