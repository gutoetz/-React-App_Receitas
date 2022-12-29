import React from 'react';
import { useHistory } from 'react-router-dom';
import { Paper, Typography, Button, ButtonGroup } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MenuButton from '../components/MenuButton';
import PrimarySearchAppBar from '../components/PrimarySearchAppBar';

export default function Profile() {
  const history = useHistory();

  const { email } = JSON.parse(localStorage.getItem('user')) || {
    email: undefined,
  };

  const logout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <PrimarySearchAppBar title="Profile" />

      <ButtonGroup
        sx={ { my: 2 } }
        className="profile-menu"
      >
        <Button
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes

        </Button>

        <Button
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes

        </Button>

        <Button
          data-testid="profile-logout-btn"
          onClick={ logout }
        >
          Logout

        </Button>
      </ButtonGroup>
      <Typography
        variant="h5"
        data-testid="profile-email"
      >
        { `Email: ${email}` }

      </Typography>

      <Footer />
    </div>
  );
}
