import React from 'react';

import Footer from '../components/Footer';
import BodyRecipes from '../components/BodyRecipes';
import PrimarySearchAppBar from '../components/PrimarySearchAppBar';

export default function Drinks() {
  return (
    <div>
      <PrimarySearchAppBar title="Drinks" />
      <BodyRecipes title="Drinks" />
      <Footer />
    </div>
  );
}
