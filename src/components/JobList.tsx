import type { TJobItem } from '../lib/types';
import JobListItem from './JobListItem';
import Spinner from './Spinner';

type JobListProps = {
  jobItemList: TJobItem[];
  isLoading: boolean;
};

export function JobList({ jobItemList = [], isLoading }: JobListProps) {
  return (
    <ul className='job-list'>
      {isLoading ? (
        <Spinner />
      ) : (
        jobItemList.map((_item) => (
          <JobListItem key={_item.id} jobItem={_item} />
        ))
      )}
    </ul>
  );
}

export default JobList;
