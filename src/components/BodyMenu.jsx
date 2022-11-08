import React from 'react';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

export default function BodyMenu({ categorys, handleCategory, handleCategoryAll }) {
  return (
    <>
      <Button
        id="All-category-filter"
        variant="outlined"
        onClick={ () => handleCategoryAll() }
        fullWidth
        sx={ {
          mt: 1.5,
          mb: 0.5,
          py: 1,
        } }
      >
        All Recipes
      </Button>
      <ButtonGroup
        size="large"
        variant="outlined"
        aria-label="outlined button group"
        fullWidth
        sx={ {
          mb: 0.5,
          mx: 'auto',
          maxWidth: 360,
        } }
      >
        { categorys && categorys.map((category, index) => (
          <Button
            key={ index }
            id={ `${category.strCategory}/-category-filter` }
            onClick={ () => handleCategory(category.strCategory) }
            textButton={ category.strCategory }
            sx={ { fontSize: 12, px: 1 } }
          >
            { category.strCategory.replace('/', ' ') }
          </Button>
        )) }
      </ButtonGroup>
    </>
  );
}

BodyMenu.propTypes = {
  categorys: PropTypes.arrayOf(PropTypes.string),
  handleCategory: PropTypes.func,
  handleCategoryAll: PropTypes.func,
}.isRequired;
