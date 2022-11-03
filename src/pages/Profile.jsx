import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MenuButton from '../components/MenuButton';

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
      <Header title="Profile" />

      <p data-testid="profile-email">{ email }</p>

      <menu className="profile-menu">
        <MenuButton
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
          textButton="Done Recipes"
        />

        <MenuButton
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
          textButton="Favorite Recipes"
        />

        <MenuButton
          type="button"
          data-testid="profile-logout-btn"
          onClick={ logout }
          textButton="Logout"
        />
      </menu>

      <Footer />
    </div>
  );
}
