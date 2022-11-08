import React, { useContext, useState } from 'react';
import { Backdrop, Button, CircularProgress, FormControlLabel, Radio,
  RadioGroup, TextField } from '@mui/material';

import GlobalContext from '../context/GlobalContext';

function SearchBar() {
  const [searchType, setSearchType] = useState('Name');
  const [searchInput, setSearchInput] = useState('');

  const { loading, setLoading, setSearching } = useContext(GlobalContext);

  const selectSearchType = ({ target: { id } }) => {
    setSearchType(id);
  };

  const handleSearchInput = ({ target: { value } }) => {
    if (searchType === 'First  Letter' && value.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
    setSearchInput(value);
  };

  const handleSearchType = () => {
    setSearching({
      search: true,
      parameters: [searchType, searchInput],
    });
    setLoading(true);
  };

  return (
    <form>
      <TextField
        margin="normal"
        id="search"
        name="search"
        variant="standard"
        label="Recipe"
        autoFocus
        size="small"
        data-testid="search-input"
        color="secondary"
        sx={ { input: { color: 'white' }, color: 'white', mx: 1 } }
        onChange={ handleSearchInput }
      />

      <RadioGroup
        name="searchType"
        defaultValue="Name"
        row
        sx={ { mx: 3 } }
      >
        <FormControlLabel
          value="Ingredient"
          label="Ingredient"
          data-testid="ingredient-search-radio"
          control={
            <Radio
              size="small"
              color="secondary"
              id="Ingredient"
              onClick={ selectSearchType }
              sx={ {
                '& .MuiSvgIcon-root': {
                  fontSize: 16,
                },
              } }
            />
          }
        />

        <FormControlLabel
          value="Name"
          label="Name"
          data-testid="name-search-radio"
          control={
            <Radio
              size="small"
              color="secondary"
              id="Name"
              onClick={ selectSearchType }
              sx={ {
                '& .MuiSvgIcon-root': {
                  fontSize: 16,
                },
              } }
            />
          }
        />

        <FormControlLabel
          value="First Letter"
          label="First Letter"
          data-testid="first-letter-search-radio"
          control={
            <Radio
              size="small"
              color="secondary"
              id="First Letter"
              onClick={ selectSearchType }
              sx={ {
                '& .MuiSvgIcon-root': {
                  fontSize: 16,
                },
              } }
            />
          }
        />
      </RadioGroup>

      <Button
        variant="contained"
        size="small"
        color="secondary"
        data-testid="exec-search-btn"
        onClick={ () => handleSearchType() }
        sx={ { color: 'white', mb: 2, mx: 5 } }
      >
        Search
      </Button>

      <Backdrop
        sx={ { color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 } }
        open={ loading }
      >
        <CircularProgress color="inherit" />
      </Backdrop>

    </form>
  );
}

export default SearchBar;
