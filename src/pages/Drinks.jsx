import React, { useContext } from 'react';
import RevenueCard from '../components/Card';
import Header from '../components/Header';
import GlobalContext from '../context/GlobalContext';

export default function Drinks() {
  const { revenues } = useContext(GlobalContext);
  return (
    <div>
      <Header title="Drinks" />
      <div>
        {revenues ? (
          revenues.map((revenue, index) => (
            <RevenueCard
              cardInfo={ revenue }
              type="strDrinkThumb"
              name="strDrink"
              index={ index }
              key={ index }
            />
          ))
        ) : (null)}
      </div>
    </div>
  );
}
