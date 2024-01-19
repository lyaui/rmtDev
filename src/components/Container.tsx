import JobItemContent from './JobItemContent';
import Sidebar from './Sidebar';

export default function Container({ jobItemList }) {
  return (
    <div className='container'>
      <Sidebar jobItemList={jobItemList} />
      <JobItemContent />
    </div>
  );
}
