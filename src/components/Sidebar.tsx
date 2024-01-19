import JobList from './JobList';
import PaginationControls from './PaginationControls';
import ResultsCount from './ResultsCount';
import SortingControls from './SortingControls';

export default function Sidebar({ jobItemList }) {
  return (
    <div className='sidebar'>
      <div className='sidebar__top'>
        <ResultsCount />
        <SortingControls />
      </div>
      <JobList jobItemList={jobItemList} />
      <PaginationControls />
    </div>
  );
}
