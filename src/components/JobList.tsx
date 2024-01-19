import JobListItem from './JobListItem';
import Spinner from './Spinner';

// type JobListProps = {
//   jobItemList: []; // TODO
//   isLoading: boolean;
// };

export function JobList({ jobItemList = [], isLoading }) {
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
