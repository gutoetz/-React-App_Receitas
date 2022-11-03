import { useEffect } from 'react';

export default function useFetchIdDrinks(id, setData) {
  useEffect(() => {
    async function fetchData() {
      const requestAPI = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
      );
      const response = await requestAPI.json();
      setData(response.drinks);
    }
    fetchData();
  }, [setData, id]);
}
