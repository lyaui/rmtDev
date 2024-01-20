import type { TJobItem } from '../lib/types';
import BookmarkIcon from './BookmarkIcon';

type JobItemProps = {
  jobItem: TJobItem;
};

export default function JobItem({ jobItem }: JobItemProps) {
  const { id, badgeLetters = '', company, title, daysAgo } = jobItem;

  return (
    <li className='job-item'>
      <a className='job-item__link' href={`#${id}`}>
        <div className='job-item__badge'>{badgeLetters || ''}</div>

        <div className='job-item__middle'>
          <h3 className='third-heading'>{title}</h3>
          <p className='job-item__company'>{company}</p>
        </div>

        <div className='job-item__right'>
          <BookmarkIcon />
          <time className='job-item__time'>{daysAgo}d</time>
        </div>
      </a>
    </li>
  );
}
