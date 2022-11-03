import React from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import BodyRecipes from '../components/BodyRecipes';

export default function Drinks() {
  return (
    <div>
      <Header title="Drinks" />
      <BodyRecipes title="Drinks" />
      <Footer />
    </div>
  );
}
