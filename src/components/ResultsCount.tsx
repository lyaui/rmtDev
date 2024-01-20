type ResultsCount = {
  count: number;
};
export default function ResultsCount({ count }: ResultsCount) {
  return (
    <p className='count'>
      <span className='u-bold'>{count} results</span>
    </p>
  );
}
