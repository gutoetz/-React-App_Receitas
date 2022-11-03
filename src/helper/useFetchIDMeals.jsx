import { useEffect } from 'react';

export default function useFetchIDMeals(id, setData) {
  useEffect(() => {
    async function fetchData() {
      const requestAPI = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
      );

      const response = await requestAPI.json();
      setData(response.meals);
    }
    fetchData();
  }, [setData, id]);
}
