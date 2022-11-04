import React, { useContext, useState } from 'react';

// import { styled, alpha } from '@mui/material/styles';
// import InputBase from '@mui/material/InputBase';

import GlobalContext from '../context/GlobalContext';

// const Search = styled('div')(({ theme }) => ({
//   position: 'relative',
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   '&:hover': {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginRight: theme.spacing(2),
//   marginLeft: 0,
//   width: '100%',
//   [theme.breakpoints.up('sm')]: {
//     marginLeft: theme.spacing(3),
//     width: 'auto',
//   },
// }));

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: '100%',
//   position: 'absolute',
//   pointerEvents: 'none',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: 'inherit',
//   '& .MuiInputBase-input': {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create('width'),
//     width: '100%',
//     [theme.breakpoints.up('md')]: {
//       width: '20ch',
//     },
//   },
// }));

function SearchBar() {
  const [searchType, setSearchType] = useState('Name');
  const [searchInput, setSearchInput] = useState('');

  const { setSearching } = useContext(GlobalContext);

  const selectSearchType = ({ target: { id } }) => {
    setSearchType(id);
  };

  const handleSearchInput = ({ target: { value } }) => {
    if (searchType === 'First Letter' && value.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
    setSearchInput(value);
  };

  const handleSearchType = () => {
    setSearching({
      search: true,
      parameters: [searchType, searchInput],
    });
  };

  return (
    <form>
      <input type="text" data-testid="search-input" onChange={ handleSearchInput } />

      <label htmlFor="Ingredient">
        <input
          type="radio"
          id="Ingredient"
          data-testid="ingredient-search-radio"
          name="searchType"
          onClick={ selectSearchType }
        />
        Ingredient
      </label>

      <label htmlFor="Name">
        <input
          type="radio"
          id="Name"
          data-testid="name-search-radio"
          name="searchType"
          onClick={ selectSearchType }
        />
        Name
      </label>

      <label htmlFor="First Letter">
        <input
          type="radio"
          id="First Letter"
          data-testid="first-letter-search-radio"
          name="searchType"
          onClick={ selectSearchType }
        />
        First Letter
      </label>

      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => handleSearchType() }
      >
        Search
      </button>

    </form>
  );
}

export default SearchBar;
