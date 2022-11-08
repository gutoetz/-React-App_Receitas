import { BottomNavigation, BottomNavigationAction, IconButton, Paper } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import LocalBarRoundedIcon from '@mui/icons-material/LocalBarRounded';
import LunchDiningRoundedIcon from '@mui/icons-material/LunchDiningRounded';

function Footer() {
  return (
    <footer data-testid="footer">
      <Paper
        elevation={ 3 }
        sx={ {
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          maxWidth: 360,
          mx: 'auto',
        } }
      >
        <BottomNavigation
          showLabels
          sx={ {
            justifyContent: 'space-evenly',
            backgroundColor: 'primary.main',
            alignContent: 'center',
          } }
        >
          <Link to="/drinks">
            <BottomNavigationAction
              label="Drinks"
              icon={
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="Drinks"
                  color="inherit"
                >
                  <LocalBarRoundedIcon sx={ { color: 'white' } } />
                </IconButton>
              }
            />
          </Link>

          <Link to="/meals">
            <BottomNavigationAction
              label="Meals"
              icon={
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="Meals"
                  color="inherit"
                >
                  <LunchDiningRoundedIcon sx={ { color: 'white' } } />
                </IconButton>
              }
            />
          </Link>
        </BottomNavigation>
      </Paper>
    </footer>
  );
}

export default Footer;
