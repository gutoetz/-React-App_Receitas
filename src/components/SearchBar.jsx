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
        Ingredient
        <input
          type="radio"
          value="Ingredient"
          data-testid="ingredient-search-radio"
          name="searchType"
          onClick={ selectSearchType }
        />
      </label>

      <label htmlFor="Name">
        Name
        <input
          type="radio"
          value="Name"
          data-testid="name-search-radio"
          name="searchType"
          onClick={ selectSearchType }
        />
      </label>

      <label htmlFor="First letter">
        First letter
        <input
          type="radio"
          value="First Letter"
          data-testid="first-letter-search-radio"
          name="searchType"
          onClick={ selectSearchType }
        />
      </label>

      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => handleSearchType(pageTitle) }
      >
        Buscar
      </button>

    </form>
  );
}

SearchBar.propTypes = {
  pageTitle: PropTypes.string.isRequired,
};

export default SearchBar;
