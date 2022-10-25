import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import GlobalContext from '../context/GlobalContext';

function SearchBar({ pageTitle }) {
  const {
    selectSearchType,
    handleSearchType,
    handleSearchInput } = useContext(GlobalContext);

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
        onClick={ () => handleSearchType(pageTitle) }
      >
        Search
      </button>

    </form>
  );
}

SearchBar.propTypes = {
  pageTitle: PropTypes.string.isRequired,
};

export default SearchBar;
