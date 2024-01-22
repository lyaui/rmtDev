import { useJobItem, useActiveIdCtxVal } from '../lib/hooks';
import BookmarkIcon from './BookmarkIcon';
import Spinner from './Spinner';

export default function JobItemContent() {
  const { activeId } = useActiveIdCtxVal();
  const { jobItem, isLoading } = useJobItem(activeId);

  let content = null;

  if (!jobItem) {
    content = <EmptyJobContent />;
  } else {
    const {
      id,
      coverImgURL,
      companyURL,
      badgeLetters,
      daysAgo,
      title,
      company,
      description,
      duration,
      salary,
      location,
      qualifications,
      reviews,
    } = jobItem;
    content = (
      <section className='job-details'>
        <div>
          <img src={coverImgURL} alt='#' />
          <a className='apply-btn' href={companyURL} target='_blank'>
            Apply
          </a>

          <section className='job-info'>
            <div className='job-info__left'>
              <div className='job-info__badge'>{badgeLetters}</div>
              <div className='job-info__below-badge'>
                <time className='job-info__time'>{daysAgo}d</time>

                <BookmarkIcon id={id} />
              </div>
            </div>

            <div className='job-info__right'>
              <h2 className='second-heading'>{title}</h2>
              <p className='job-info__company'>{company}</p>
              <p className='job-info__description'>{description}</p>
              <div className='job-info__extras'>
                <p className='job-info__extra'>
                  <i className='fa-solid fa-clock job-info__extra-icon'></i>
                  {duration}
                </p>
                <p className='job-info__extra'>
                  <i className='fa-solid fa-money-bill job-info__extra-icon'></i>
                  {salary}
                </p>
                <p className='job-info__extra'>
                  <i className='fa-solid fa-location-dot job-info__extra-icon'></i>{' '}
                  {location}
                </p>
              </div>
            </div>
          </section>

          <div className='job-details__other'>
            <section className='qualifications'>
              <div className='qualifications__left'>
                <h4 className='fourth-heading'>Qualifications</h4>
                <p className='qualifications__sub-text'>
                  Other qualifications may apply
                </p>
              </div>
              <ul className='qualifications__list'>
                {qualifications.map((_qual) => (
                  <li className='qualifications__item' key={_qual}>
                    {_qual}
                  </li>
                ))}
              </ul>
            </section>

            <section className='reviews'>
              <div className='reviews__left'>
                <h4 className='fourth-heading'>Company reviews</h4>
                <p className='reviews__sub-text'>
                  Recent things people are saying
                </p>
              </div>
              <ul className='reviews__list'>
                {reviews.map((_review) => (
                  <li className='reviews__item' key={_review}>
                    {_review}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <footer className='job-details__footer'>
            <p className='job-details__footer-text'>
              If possible, please reference that you found the job on{' '}
              <span className='u-bold'>rmtDev</span>, we would really appreciate
              it!
            </p>
          </footer>
        </div>
      </section>
    );
  }

  if (isLoading) {
    content = <LoadingJobContent />;
  }

  return content;
}

function LoadingJobContent() {
  return (
    <section className='job-details'>
      <div>
        <Spinner />
      </div>
    </section>
  );
}

function EmptyJobContent() {
  return (
    <section className='job-details'>
      <div>
        <div className='job-details__start-view'>
          <p>What are you looking for?</p>
          <p>
            Start by searching for any technology your ideal job is working with
          </p>
        </div>
      </div>
    </section>
  );
}
