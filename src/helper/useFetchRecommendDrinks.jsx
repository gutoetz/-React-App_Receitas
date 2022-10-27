import {useEffect} from 'react';

export default function useFetchRecommendDrinks(setData) {
useEffect(() => {
    async function fetchData() {
      const requestAPI = await fetch(
        'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
      );

      const response = await requestAPI.json();
      setData(response.drinks)
    }
    fetchData();
  }, []);
}