import type { ChangeEvent, FormEvent } from 'react';

type SearchFormProps = {
  searchText: string;
  setSearchText: (text: string) => void;
};

export default function SearchForm({
  searchText,
  setSearchText,
}: SearchFormProps) {
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
