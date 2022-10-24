import PropTypes from 'prop-types';
import React, { useState, useMemo, useCallback } from 'react';
import GlobalContext from './GlobalContext';

function GlobalProvider({ children }) {
  // States
  const [searchType, setSearchType] = useState([]);
  const [searchInput, setSearchInput] = useState([]);
  const [revenues, setRevenues] = useState([]);

  // functions
  const selectSearchType = useCallback(({ target: { value } }) => {
    setSearchType(value);
  }, []);

  const handleSearchInput = useCallback(({ target: { value } }) => {
    if (value.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
    setSearchInput(value);
  }, []);

  const handleSearchType = useCallback(async (pageTitle) => {
    if (searchType === 'Ingredient') {
      const response = (pageTitle === 'Drinks')
        ? await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchInput}`)
        : await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`);
      const dataRevenues = await response.json();
      setRevenues(dataRevenues);
    }
    if (searchType === 'Name') {
      const response = (pageTitle === 'Drinks')
        ? await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput}`)
        : await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`);
      const dataRevenues = await response.json();
      setRevenues(dataRevenues);
    }
    if (searchType === 'First Letter') {
      const response = (pageTitle === 'Drinks')
        ? await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchInput}`)
        : await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInput}`);
      const dataRevenues = await response.json();
      setRevenues(dataRevenues);
    }
  }, [searchInput, searchType]);

  // context
  const contextValue = useMemo(() => ({
    searchType,
    revenues,
    selectSearchType,
    handleSearchType,
    handleSearchInput,
  }), [searchType, revenues, selectSearchType, handleSearchType, handleSearchInput]);

  return (
    <GlobalContext.Provider value={ contextValue }>
      {children}
    </GlobalContext.Provider>
  );
}

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GlobalProvider;
