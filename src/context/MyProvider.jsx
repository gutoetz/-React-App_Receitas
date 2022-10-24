import PropTypes from 'prop-types';
import React, { useState, useMemo, useCallback } from 'react';
import MyContext from './MyContext';

function Provider({ children }) {
  // States
  const [searchType, setSearchType] = useState([]);
  const [searchInput, setSearchInput] = useState([]);
  const [revenues, setRevenues] = useState([]);

  // function

  const selectSearchType = useCallback(({ target: { value } }) => {
    setSearchType(value);
  }, []);

  const handleSearchInput = useCallback(({ target: { value } }) => {
    if (searchType === 'First Letter' && value > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
    setSearchInput(value);
  }, [searchType]);

  const handleSearch = useCallback(async () => {
    if (searchType === 'Ingredient') {
      const data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`);
      const dataRevenues = await data.json();
      setRevenues(dataRevenues);
    }
    if (searchType === 'Ingredient') {
      const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`);
      const dataRevenues = await data.json();
      setRevenues(dataRevenues);
    }
    if (searchType === 'Ingredient') {
      const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInput}`);
      const dataRevenues = await data.json();
      setRevenues(dataRevenues);
    }
  }, [searchInput, searchType]);
  // context
  const contextValue = useMemo(() => ({
    searchType,
    revenues,
    selectSearchType,
    handleSearch,
    handleSearchInput,
  }), [searchType, revenues, handleSearch, selectSearchType, handleSearchInput]);

  return (
    <MyContext.Provider value={ contextValue }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
