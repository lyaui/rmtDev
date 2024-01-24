import { useJobItemsContextVal } from '../lib/hooks';

export default function ResultsCount() {
  const { total } = useJobItemsContextVal();
  return (
    <p className='count'>
      <span className='u-bold'>{total} results</span>
    </p>
  );
}
