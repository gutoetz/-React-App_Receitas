import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import MealRevenueDetail from "../components/MealRevenueDetail";
import DrinkRevenueDetail from "../components/DrinkRevenueDetail";

function RecipeDetails() {
  const history = useHistory();
  const [isDrink, setIsDrink] = useState(false);
  const idMeals = history.location.pathname.slice(7);
  const idDrinks = history.location.pathname.slice(8);

  useEffect(() => showRevenues(), []);

  const showRevenues = () => {
    if (history.location.pathname.includes("meals")) {
      setIsDrink(false);
    } else {
      setIsDrink(true);
    }
  };

  return (
    <div>
      {isDrink === false ? (
        <MealRevenueDetail id={idMeals} />
      ) : (
        <DrinkRevenueDetail id={idDrinks} />
      )}
    </div>
  );
}

export default RecipeDetails;
