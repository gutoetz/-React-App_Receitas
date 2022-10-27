import React, { useState, useEffect } from "react";
import useFetchIDMeals from "../helper/useFetchIDMeals";
import useFetchRecommendDrinks from "../helper/useFetchRecommendDrinks";
import { useHistory } from "react-router-dom";
import shareIcon from "../images/shareIcon.svg";

const copy = require("clipboard-copy");

function MealRevenueDetail({ id }) {
  const [selectedRevenue, setSelectedRevenue] = useState([]);
  const [ingredient, setIngredient] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const [allIngredients, setAllIngredients] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [filteredDrinks, setFilteredDrinks] = useState([]);
  const [startButton, setStartButton] = useState("Start Recipe");
  const history = useHistory();

  useFetchIDMeals(id, setSelectedRevenue);
  useFetchRecommendDrinks(setDrinks);

  const getIngredients = () => {
    if (selectedRevenue.length > 0) {
      const filterIngredients = Object.values(selectedRevenue[0]);
      const arrayIngredients = [];
      for (let index = 9; index <= 28; index++) {
        arrayIngredients.push(filterIngredients[index]);
      }
      const allIngredients = arrayIngredients.filter((e) => e !== "");
      setIngredient(allIngredients);
    }
  };

  const getQuantity = () => {
    if (selectedRevenue.length > 0) {
      const filterQuantity = Object.values(selectedRevenue[0]);
      const arrayQuantity = [];
      for (let index = 29; index <= 48; index++) {
        arrayQuantity.push(filterQuantity[index]);
      }
      const allQuantity = arrayQuantity.filter((e) => e !== "");
      setQuantity(allQuantity);
    }
  };

  useEffect(() => getIngredients(), [selectedRevenue]);
  useEffect(() => getQuantity(), [selectedRevenue]);

  const showIngredients = () => {
    setAllIngredients(ingredient.map((e, i) => `${e}: ${quantity[i]}`));
  };

  useEffect(() => showIngredients(), [ingredient, quantity]);

  const showDrinks = () => {
    const selectedDrinks = drinks.slice(null, 6);
    setFilteredDrinks(selectedDrinks);
  };

  useEffect(() => showDrinks(), [drinks]);

  function redirectStart() {
    history.push(`/meals/${id}/in-progress`);
  }

  function shareRevenue() {
    copy(history.location.pathname);
  }

  return (
    <div>
      {selectedRevenue &&
        selectedRevenue.map((revenue) => (
          <div key={revenue.strMeal}>
            <h3 data-testid="recipe-title">{revenue.strMeal}</h3>
            <h4 data-testid="recipe-category">{revenue.strCategory}</h4>
            <img
              src={revenue.strMealThumb}
              alt="Selected Revenue"
              data-testid="recipe-photo"
            />
            <p data-testid="instructions">{revenue.strInstructions}</p>
            {revenue.strYoutube && (
              <iframe src={revenue.strYoutube} data-testid="video" />
            )}
          </div>
        ))}
      <li>Ingredients:</li>
      {allIngredients &&
        allIngredients.map((e, index) => (
          <ul key={index} data-testid={`${index}-ingredient-name-and-measure`}>
            {e}
          </ul>
        ))}
      <h4>Recommended Drinks</h4>
      {filteredDrinks &&
        filteredDrinks.map((drink, index) => (
          <div key={index} data-testid={`${index}-recommendation-card`}>
            <img src={drink.strDrinkThumb} />
            <span data-testid={`${index}-recommendation-title`}>
              {drink.strDrink}
            </span>
          </div>
        ))}
      <button
        data-testid="start-recipe-btn"
        type="button"
        onClick={() => redirectStart()}
      >
        {startButton}
      </button>
      <div id="liveAlertPlaceholder">
      <button onClick={shareRevenue} type="button" class="btn btn-primary" id="liveAlertBtn">
        <img src={shareIcon} />
      </button>
      </div>
    </div>
  );
}

export default MealRevenueDetail;
