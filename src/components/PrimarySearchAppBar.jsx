import * as React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';

import SearchBar from './SearchBar';

export default function PrimarySearchAppBar({ title }) {
  const [searching, setSearching] = useState();

  // const arrayOfTitles = ['Done Recipes', 'Favorite Recipes', 'Profile'];

  const history = useHistory();

  return (
    <AppBar position="static">
      <Toolbar sx={ { justifyContent: 'space-between' } }>
        <Typography
          variant="h6"
          noWrap
          component="div"
        >
          {document.title}
        </Typography>

        <IconButton
          size="large"
          edge="end"
          aria-label="account of current user"
          color="inherit"
        >
          <SearchIcon
            onClick={ () => setSearching(!searching) }
            data-testid="search-top-btn"
          />
        </IconButton>

        { searching && <SearchBar pageTitle={ title } /> }

        <IconButton
          size="large"
          edge="end"
          aria-label="account of current user"
          color="inherit"
        >
          <AccountCircle
            data-testid="search-top-btn"
            onClick={ () => history.push({ pathname: '/profile' }) }
          />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

PrimarySearchAppBar.propTypes = {
  title: PropTypes.string.isRequired,
};
