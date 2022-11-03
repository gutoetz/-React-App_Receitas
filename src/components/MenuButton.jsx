import React from 'react';
import PropTypes from 'prop-types';

function MenuButton({ id, value, onClick, textButton }) {
  return (
    <li>
      <button
        type="button"
        data-testid={ id }
        value={ value }
        onClick={ onClick }
      >
        { textButton }
      </button>
    </li>
  );
}

MenuButton.propTypes = {
  id: PropTypes.string,
  value: PropTypes.string,
  onClick: PropTypes.func,
  textButton: PropTypes.string,
}.isRequired;

export default MenuButton;
