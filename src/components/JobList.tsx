import JobListItem from './JobListItem';

export function JobList({ jobItemList = [] }) {
  return (
    <ul className='job-list'>
      {jobItemList.map((_item) => (
        <JobListItem {..._item} />
      ))}
    </ul>
  );
}

export default JobList;
