import type { ChangeEvent, FormEvent } from 'react';

import { useSearchTextCtxVal } from '../lib/hooks';

export default function SearchForm() {
  const { searchText, handleChangeSearchText } = useSearchTextCtxVal();

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleChangeSearchText(event.target.value);
  };
  return (
    <form onSubmit={handleFormSubmit} action='#' className='search'>
      <button type='submit'>
        <i className='fa-solid fa-magnifying-glass'></i>
      </button>

      <input
        value={searchText}
        onChange={handleInputChange}
        spellCheck='false'
        type='text'
        required
        placeholder='Find remote developer jobs...'
      />
    </form>
  );
}
