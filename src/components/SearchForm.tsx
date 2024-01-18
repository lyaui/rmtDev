import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

export default function SearchForm() {
  const [serachText, setSearchText] = useState('');
  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };
  return (
    <form onSubmit={handleFormSubmit} action='#' className='search'>
      <button type='submit'>
        <i className='fa-solid fa-magnifying-glass'></i>
      </button>

      <input
        value={serachText}
        onChange={handleInputChange}
        spellCheck='false'
        type='text'
        required
        placeholder='Find remote developer jobs...'
      />
    </form>
  );
}
