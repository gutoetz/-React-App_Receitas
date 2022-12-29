import PropTypes from 'prop-types';
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

export default function CheckboxList(props) {
  const { handleCheck, ingredient, checkedList } = props;
  return ingredient.length > 0 && (
    <List sx={ { width: '100%', maxWidth: 360, bgcolor: 'background.paper' } }>
      {ingredient.map((e, i) => {
        const labelId = `checkbox-list-label-${e}`;

        return (
          <ListItem
            key={ i }
            disablePadding
          >
            <ListItemButton role={ undefined } onClick={ () => handleCheck(e[1]) } dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={ !!checkedList.includes(e[1]) }
                  tabIndex={ -1 }
                  disableRipple
                  inputProps={ { 'aria-labelledby': labelId } }
                />
              </ListItemIcon>
              <ListItemText id={ labelId } primary={ `${e[1]}` } />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}

CheckboxList.propTypes = {
  checkedList: PropTypes.shape({
    includes: PropTypes.func,
  }).isRequired,
  handleCheck: PropTypes.func.isRequired,
  ingredient: PropTypes.shape({
    length: PropTypes.number,
    map: PropTypes.func,
  }).isRequired,
};
