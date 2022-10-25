import React, { useState } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';

import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

export default function Header({ title }) {
  const [searching, setSearching] = useState();

  const arrayOfTitles = ['Done Recipes', 'Favorite Recipes', 'Profile'];

  const history = useHistory();

  return (
    <header
      style={ {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '5px',
      } }
    >

      <h2 data-testid="page-title">{title}</h2>

      <img
        src={ profileIcon }
        alt="profile-top-btn"
        data-testid="profile-top-btn"
        onClick={ () => history.push({ pathname: '/profile' }) }
        aria-hidden="true"
      />

      <div
        style={ {
          display: 'flex',
        } }
      >
        { !arrayOfTitles.some((pageTitle) => pageTitle === title)
       && (
         <img
           src={ searchIcon }
           alt="search-top-btn"
           data-testid="search-top-btn"
           onClick={ () => setSearching(!searching) }
           aria-hidden="true"
         />
       ) }

        { searching && <SearchBar pageTitle={ title } /> }
      </div>

    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string,
}.isRequired;
