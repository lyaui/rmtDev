import { useJobItemsContextVal } from '../lib/hooks';
import JobList from './JobList';

function JobListSearch() {
  const { isLoading, jobItemsSortedAndSliced } = useJobItemsContextVal();
  return (
    <JobList
      jobItemList={jobItemsSortedAndSliced || []}
      isLoading={isLoading}
    />
  );
}

export default JobListSearch;
