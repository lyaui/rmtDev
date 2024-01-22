import type { TJobItem } from '../lib/types';
import { useActiveIdCtxVal } from '../lib/hooks';
import JobListItem from './JobListItem';
import Spinner from './Spinner';

type JobListProps = {
  jobItemList: TJobItem[];
  isLoading: boolean;
};

export function JobList({ jobItemList = [], isLoading }: JobListProps) {
  const { activeId } = useActiveIdCtxVal();

  return (
    <ul className='job-list'>
      {isLoading ? (
        <Spinner />
      ) : (
        jobItemList.map((_item) => (
          <JobListItem
            key={_item.id}
            jobItem={_item}
            isActive={activeId === _item.id}
          />
        ))
      )}
    </ul>
  );
}

export default JobList;
