import React from 'react';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

export default function BodyMenu({ categorys, handleCategory, handleCategoryAll }) {
  return (
    <ButtonGroup
      size="small"
      variant="outlined"
      aria-label="outlined button group"
      sx={ {
        mt: 1.5,
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
        >
          { category.strCategory }
        </Button>
      )) }
      <Button
        id="All-category-filter"
        onClick={ () => handleCategoryAll() }
        textButton="All"
      >
        All
      </Button>
    </ButtonGroup>
  );
}

BodyMenu.propTypes = {
  categorys: PropTypes.arrayOf(PropTypes.string),
  handleCategory: PropTypes.func,
  handleCategoryAll: PropTypes.func,
}.isRequired;
