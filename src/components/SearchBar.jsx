import React, { useContext, useState } from 'react';
import GlobalContext from '../context/GlobalContext';

function SearchBar() {
  const [searchType, setSearchType] = useState('Name');
  const [searchInput, setSearchInput] = useState('');

  const { setSearching } = useContext(GlobalContext);

  const selectSearchType = ({ target: { id } }) => {
    setSearchType(id);
  };

  const handleSearchInput = ({ target: { value } }) => {
    if (searchType === 'First Letter' && value.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
    setSearchInput(value);
  };

  const handleSearchType = () => {
    setSearching({
      search: true,
      parameters: [searchType, searchInput],
    });
  };

  return (
    <form>
      <input type="text" data-testid="search-input" onChange={ handleSearchInput } />

      <label htmlFor="Ingredient">
        <input
          type="radio"
          id="Ingredient"
          data-testid="ingredient-search-radio"
          name="searchType"
          onClick={ selectSearchType }
        />
        Ingredient
      </label>

      <label htmlFor="Name">
        <input
          type="radio"
          id="Name"
          data-testid="name-search-radio"
          name="searchType"
          onClick={ selectSearchType }
        />
        Name
      </label>

      <label htmlFor="First Letter">
        <input
          type="radio"
          id="First Letter"
          data-testid="first-letter-search-radio"
          name="searchType"
          onClick={ selectSearchType }
        />
        First Letter
      </label>

      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => handleSearchType() }
      >
        Search
      </button>

    </form>
  );
}

export default SearchBar;
