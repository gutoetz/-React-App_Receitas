import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function Login() {
  const { selectSearchType, handleSearch, handleSearchInput } = useContext(MyContext);
  return (
    <div>
      <input data-testid="search-input" onChange={ handleSearchInput } />
      <label htmlFor="Ingredient">
        Ingredient
        <input
          id="Ingredient"
          type="radio"
          data-testid="ingredient-search-radio"
          name="searchType"
          onClick={ selectSearchType }
        />
      </label>
      <label htmlFor="Name">
        Name
        <input
          id="Name"
          type="radio"
          data-testid="name-search-radio"
          name="searchType"
          onClick={ selectSearchType }
        />
      </label>
      <label htmlFor="First letter">
        First letter
        <input
          id="First letter"
          type="radio"
          data-testid="first-letter-search-radio"
          name="searchType"
          onClick={ selectSearchType }
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => handleSearch }
      >
        Buscar
      </button>
    </div>
  );
}

export default Login;
