import React from 'react';
import Header from '../components/Header';

export default function Profile() {
  const { email } = JSON.parse(localStorage.getItem('user'));

  return (
    <div>
      <Header title="Profile" />
      <p data-testid="profile-email">{ email }</p>
      <div className="profile-menu">
        <button type="button" data-testid="profile-done-btn">Done Recipes</button>
        <button type="button" data-testid="profile-favorite-btn">Favorite Recipes</button>
        <button type="button" data-testid="profile-logout-btn">Logout</button>
      </div>
    </div>
  );
}
