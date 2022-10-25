import PropTypes from 'prop-types';
import React, { useState, useMemo, useCallback } from 'react';
import { useHistory } from 'react-router';
import GlobalContext from './GlobalContext';

function GlobalProvider({ children }) {
  // States
  const [searchType, setSearchType] = useState([]);
  const [searchInput, setSearchInput] = useState([]);
  const [revenues, setRevenues] = useState([]);
  const history = useHistory();
  // functions
  const selectSearchType = useCallback(({ target: { id } }) => {
    setSearchType(id);
  }, []);

  const handleSearchInput = useCallback(({ target: { value } }) => {
    if (value.length > 1 && searchType === 'First Letter') {
      global.alert('Your search must have only 1 (one) character');
    }
    setSearchInput(value);
  }, [searchType]);

  const settingRevenues = useCallback((dataJson, pageTitle) => {
    const MAX_RENDER = 12;
    const path = pageTitle === 'Drinks' ? 'idDrink' : 'idMeal';
    const data = dataJson[pageTitle.toLowerCase()];
    console.log(data);
    if (data === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } else if (data.length === 1) {
      history.push(`/${pageTitle.toLowerCase()}/${data[0][path]}`);
    } else if (data.length > 1) setRevenues(data.splice(0, MAX_RENDER));
  }, [history]);

  const handleSearchType = useCallback(async (pageTitle) => {
    const letter = searchType === 'Name' ? 's' : 'f';
    if (searchType === 'Ingredient') {
      const response = (pageTitle === 'Drinks')
        ? await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchInput}`)
        : await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`);
      const dataJson = await response.json();
      settingRevenues(dataJson, pageTitle);
    }
    if (searchType === 'Name' || searchType === 'First Letter') {
      const response = (pageTitle === 'Drinks')
        ? await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?${letter}=${searchInput}`)
        : await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?${letter}=${searchInput}`);
      const dataJson = await response.json();
      settingRevenues(dataJson, pageTitle);
    }
  }, [searchInput, searchType, settingRevenues]);

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
