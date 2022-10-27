import React, { useContext } from 'react';
import RevenueCard from '../components/Card';
import Footer from '../components/Footer';
import Header from '../components/Header';
import GlobalContext from '../context/GlobalContext';

export default function Meals() {
  const { revenues } = useContext(GlobalContext);
  return (
    <div>
      <Header title="Meals" />
      <Footer />
      <div>
        {revenues && (
          revenues.map((revenue, index) => (
            <RevenueCard
              cardInfo={ revenue }
              type="strMealThumb"
              name="strMeal"
              index={ index }
              key={ index }
            />
          ))
        )}
      </div>
    </div>
  );
}
