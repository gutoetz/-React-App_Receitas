import React, { useState, useEffect } from "react";
import useFetchIdDrinks from "../helper/useFetchIdDrinks";
import useFetchRecommendMeals from "../helper/useFetchRecommendMeals";
import { useHistory } from "react-router-dom";
import shareIcon from "../images/shareIcon.svg";
import blackHeartIcon from "../images/blackHeartIcon.svg";
import whiteHeartIcon from "../images/whiteHeartIcon.svg";
import CarouselMeals from "./CarouselMeals";

const copy = require("clipboard-copy");

function DrinkRevenueDetail({ id }) {
  const [selectedRevenue, setSelectedRevenue] = useState([]);
  const [ingredient, setIngredient] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const [allIngredients, setAllIngredients] = useState([]);
  const [meals, setMeals] = useState([]);
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [startButton, setStartButton] = useState("Start Recipe");
  const [showCopied, setShowCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  

  const history = useHistory();

  useFetchIdDrinks(id, setSelectedRevenue);
  console.log(selectedRevenue)

  // useFetchRecommendMeals(setMeals);

  useEffect(() => getIngredients(), [selectedRevenue]);
  useEffect(() => getQuantity(), [selectedRevenue]);
  useEffect(() => showIngredients(), [ingredient, quantity]);
  useEffect(() => verifyFavorite(id), []);
  useEffect(() => showMeals(), [meals]);

  const getIngredients = () => {
    if (selectedRevenue.length > 0) {
      const filterIngredients = Object.values(selectedRevenue[0]);

      const arrayIngredients = [];
      for (let index = 17; index <= 31; index++) {
        arrayIngredients.push(filterIngredients[index]);
      }
      const allIngredients = arrayIngredients.filter((e) => e);
      setIngredient(allIngredients);
    }
  };

  const getQuantity = () => {
    if (selectedRevenue.length > 0) {
      const filterQuantity = Object.values(selectedRevenue[0]);
      const arrayQuantity = [];
      for (let index = 32; index <= 46; index++) {
        arrayQuantity.push(filterQuantity[index]);
      }
      const allQuantity = arrayQuantity.filter((e) => e);
      setQuantity(allQuantity);
    }
  };

  const showIngredients = () => {
    setAllIngredients(ingredient.map((e, i) => `${e}: ${quantity[i]}`));
  };

  const verifyFavorite = (id) => {
    if (localStorage.getItem("favoriteRecipes") !== null) {
        const allFavorites = JSON.parse(localStorage.getItem("favoriteRecipes"));
        const haveFavorite = allFavorites.some((e) => e.id === id);
        setIsFavorite(haveFavorite);
    }
  };

  const showMeals = () => {
    const selectedMeals = meals.slice(null, 6);
    setFilteredMeals(selectedMeals);
  };

  function redirectStart() {
    history.push(`/drinks/${id}/in-progress`);
  }

  function shareRevenue() {
    const copyUrl = `http://localhost:3000/drinks/${id}`
    copy(copyUrl);
    setShowCopied(true);
  }

  function showFavorite(id) {
    let favoriteRevenue = {
      id: selectedRevenue[0].idDrink,
      type: "drink",
      nationality: '',
      category: selectedRevenue[0].strCategory,
      alcoholicOrNot: selectedRevenue[0].strAlcoholic,
      name: selectedRevenue[0].strDrink,
      image: selectedRevenue[0].strDrinkThumb,
    };
    let arrayFavorite = [];
    if (isFavorite === false) {
      if (localStorage.getItem("favoriteRecipes") === null) {
        localStorage.setItem(
          "favoriteRecipes",
          JSON.stringify([favoriteRevenue])
        );
        setIsFavorite(true);
      } else {
        const favorites = JSON.parse(localStorage.getItem("favoriteRecipes"));
        arrayFavorite = [...favorites, favoriteRevenue];
        localStorage.setItem("favoriteRecipes", JSON.stringify(arrayFavorite));
        setIsFavorite(true);
      }
    } else {
      arrayFavorite = JSON.parse(localStorage.getItem("favoriteRecipes"));
      const filteredRevenues = arrayFavorite.filter((e) => e.id !== id);
      localStorage.setItem("favoriteRecipes", JSON.stringify(filteredRevenues));
      setIsFavorite(false);
    }
  }

  return (
    <div>
      {selectedRevenue &&
        selectedRevenue.map((revenue) => (
          <div key={revenue.strDrink}>
            <h3 data-testid="recipe-title">{revenue.strDrink}</h3>
            <h4 data-testid="recipe-category">{revenue.strCategory}</h4>
            <img
              src={revenue.strDrinkThumb}
              alt="Selected Revenue"
              data-testid="recipe-photo"
              width='150px'
            />
            <p data-testid="instructions">{revenue.strInstructions}</p>
            </div>
        ))}
      <li>Ingredients:</li>
      {allIngredients &&
        allIngredients.map((e, index) => (
          <ul key={index} data-testid={`${index}-ingredient-name-and-measure`}>
            {e}
          </ul>
        ))}
      <h4>Recommended Meals</h4>
      {filteredMeals && <CarouselMeals filteredMeals={filteredMeals} />}
      <button
        data-testid="start-recipe-btn"
        type="button"
        onClick={() => redirectStart()}
        className='recipeDetailsButton'
      >
        {startButton}
      </button>
      <div>
        <button onClick={shareRevenue} type="button" data-testid="share-btn">
          <img src={shareIcon} alt="shareIcon" />
        </button>
        {showCopied && <span>Link copied!</span>}
      </div>
      <div>
        {isFavorite === false ? (
          <button onClick={() => showFavorite(id)} data-testid="favorite-btn">
            <img src={whiteHeartIcon} alt="White Heart Icon" />
          </button>
        ) : (
          <button onClick={() => showFavorite(id)} data-testid="favorite-btn">
            <img src={blackHeartIcon} alt="Black Heart Icon" />
          </button>
        )}
      </div>
    </div>
  );
}

export default DrinkRevenueDetail;
