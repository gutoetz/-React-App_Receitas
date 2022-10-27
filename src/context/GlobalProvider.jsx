import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import GlobalContext from './GlobalContext';

function GlobalProvider({ children }) {
  const [searching, setSearching] = useState({
    search: false,
    parameters: [],
  });

<<<<<<< HEAD
  const [favoriteRecipes, setFavoriteRecipes] = useState();
=======
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
    if (data === null) {
      return global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    if (data.length === 1) {
      return history.push(`/${pageTitle.toLowerCase()}/${data[0][path]}`);
    }
    setRevenues(data.splice(0, MAX_RENDER));
  }, [history]);

  const handleSearchType = useCallback(async (pageTitle) => {
    const letter = searchType === 'Name' ? 's' : 'f';
    const paramEndPoint = pageTitle === 'Drinks' ? 'thecocktaildb' : 'themealdb';
    if (searchType === 'Ingredient') {
      const response = await fetch(`https://www.${paramEndPoint}.com/api/json/v1/1/filter.php?i=${searchInput}`);
      const dataJson = await response.json();
      settingRevenues(dataJson, pageTitle);
    }
    if (searchType === 'Name' || searchType === 'First Letter') {
      const response = await fetch(`https://www.${paramEndPoint}.com/api/json/v1/1/search.php?${letter}=${searchInput}`);
      const dataJson = await response.json();
      settingRevenues(dataJson, pageTitle);
    }
  }, [searchInput, searchType, settingRevenues]);
>>>>>>> 66787c5 (Requisito 24, 25 e 26 sem lint)

  // context
  const contextValue = useMemo(() => ({
    searching,
    favoriteRecipes,
    setFavoriteRecipes,
    setSearching,
  }), [searching, favoriteRecipes]);

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
