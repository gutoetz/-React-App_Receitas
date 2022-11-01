import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import GlobalContext from './GlobalContext';

function GlobalProvider({ children }) {
  const [searching, setSearching] = useState({
    search: false,
    parameters: [],
  });

  const [favoriteRecipes, setFavoriteRecipes] = useState();

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
