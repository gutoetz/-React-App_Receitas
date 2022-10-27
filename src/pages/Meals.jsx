import React from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import BodyRecipes from '../components/BodyRecipes';

export default function Meals() {
  return (
    <div>
      <Header title="Meals" />
      <BodyRecipes title="Meals" />
      <Footer />
    </div>
  );
}
