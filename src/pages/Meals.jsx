import React from 'react';

import Footer from '../components/Footer';
import BodyRecipes from '../components/BodyRecipes';
import PrimarySearchAppBar from '../components/PrimarySearchAppBar';

export default function Meals() {
  return (
    <div>
      <PrimarySearchAppBar title="Meals" />
      <BodyRecipes title="Meals" />
      <Footer />
    </div>
  );
}
