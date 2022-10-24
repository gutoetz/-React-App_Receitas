import React, { useState } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';

import SearchBar from './SearchBar';

export default function Header({ title }) {
  const [searching, setSearching] = useState();

  const arrayOfTitles = ['Done Recipes', 'Favorite Recipes', 'Profile'];

  const history = useHistory();

  return (
    <header style={ { display: 'flex' } }>

      <h3 data-testid="page-title">{title}</h3>

      <img
        src="src/images/profileIcon.svg"
        alt="profile-top-btn"
        data-testid="profile-top-btn"
        onClick={ () => history.push({ pathname: '/profile' }) }
        aria-hidden="true"
      />

      { !arrayOfTitles.some((pageTitle) => pageTitle === title)
       && (
         <img
           src="src/images/searchIcon.svg"
           alt="search-top-btn"
           data-testid="search-top-btn"
           onClick={ () => setSearching(!searching) }
           aria-hidden="true"
         />
       ) }

      { searching && <SearchBar pageTitle={ title } /> }

    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string,
}.isRequired;
