import PropTypes from 'prop-types';
import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import GlobalContext from '../context/GlobalContext';
import RecipesCard from './Recipes';

function BodyRecipes({ title }) {
  const history = useHistory();
  // States

  const [revenues, setRevenues] = useState([]);
  const [defaultRevenues, setDefaultRevenues] = useState([]);
  const [categorys, setCategorys] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState('');

  // consts Auxiliares

  const { setSearching, searching } = useContext(GlobalContext);
  const MAX_RENDER = 12;
  const MAX_CATEGORYS = 5;
  const pageName = title === 'Drinks' ? 'Drink' : 'Meal';
  const paramEndPoint = title === 'Drinks' ? 'thecocktaildb' : 'themealdb';

  // functions

  const settingRevenues = useCallback((dataJson) => {
    const data = dataJson[title.toLowerCase()];
    const idRoute = title === 'Drinks' ? 'idDrink' : 'idMeal';
    if (data === null) {
      return global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    if (data.length === 1) {
      return history.push(`/${title.toLowerCase()}/${data[0][idRoute]}`);
    }
    setRevenues(data.slice(0, MAX_RENDER));
  }, [history, title]);

  const fetchingRevenues = useCallback(async (searchType, searchInput) => {
    const letter = searchType === 'Name' ? 's' : 'f';
    if (searchType === 'Ingredient') {
      const response = await fetch(`https://www.${paramEndPoint}.com/api/json/v1/1/filter.php?i=${searchInput}`);
      const dataJson = await response.json();
      settingRevenues(dataJson);
    }
    if (searchType === 'Name' || searchType === 'First Letter') {
      const response = await fetch(`https://www.${paramEndPoint}.com/api/json/v1/1/search.php?${letter}=${searchInput}`);
      const dataJson = await response.json();
      settingRevenues(dataJson);
    }
  }, [settingRevenues, paramEndPoint]);

  // useEffect did Mount

  useEffect(() => {
    async function getCategorys() {
      const response = await fetch(`https://www.${paramEndPoint}.com/api/json/v1/1/list.php?c=list`);
      const dataJson = await response.json();
      const fiveFirst = dataJson[title.toLowerCase()].slice(0, MAX_CATEGORYS);
      setCategorys(fiveFirst);
    }

    async function getRevenues() {
      const response = await fetch(`https://www.${paramEndPoint}.com/api/json/v1/1/search.php?s=`);
      const dataJson = await response.json();
      const data = dataJson[title.toLowerCase()];
      setDefaultRevenues(data);
      const maxRenderRevenues = [...data.slice(0, MAX_RENDER)];
      setRevenues(maxRenderRevenues);
    }

    getCategorys();
    getRevenues();
  }, [paramEndPoint, title]);

  // useEffect DidUpdate

  useEffect(() => {
    async function handleSearchCategory() {
      if (filteredCategory) {
        const response = await fetch(`https://www.${paramEndPoint}.com/api/json/v1/1/filter.php?c=${filteredCategory}`);
        const dataJson = await response.json();
        setRevenues(dataJson[title.toLowerCase()].slice(0, MAX_RENDER));
      }
    }
    handleSearchCategory();
  }, [filteredCategory, title, paramEndPoint]);

  useEffect(() => {
    if (searching.search === true) {
      fetchingRevenues(searching.parameters[0], searching.parameters[1]);
      setSearching({
        search: false,
        parameters: [],
      });
    }
  }, [searching, fetchingRevenues, setSearching]);

  // functions

  const handleCategory = (category) => {
    if (filteredCategory === category) {
      setFilteredCategory('');
      setRevenues([...defaultRevenues.slice(0, MAX_RENDER)]);
    } else {
      setFilteredCategory(category);
    }
  };

  const handleCategoryAll = () => {
    setRevenues([...defaultRevenues.slice(0, MAX_RENDER)]);
  };

  return (
    <div>
      <section>
        {categorys && categorys.map((category, index) => (
          <button
            key={ index }
            type="button"
            data-testid={ `${category.strCategory}-category-filter` }
            onClick={ () => handleCategory(category.strCategory) }
          >
            {category.strCategory}
          </button>
        ))}
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ () => handleCategoryAll() }
        >
          All
        </button>
      </section>

      {revenues && (
        revenues.map((revenue, index) => (
          <RecipesCard
            cardInfo={ revenue }
            type={ `str${pageName}Thumb` }
            name={ `str${pageName}` }
            index={ index }
            key={ index }
          />
        ))
      )}
    </div>
  );
}

BodyRecipes.propTypes = {
  title: PropTypes.string.isRequired,
};

export default BodyRecipes;
