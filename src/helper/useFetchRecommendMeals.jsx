import { useEffect } from 'react';

export default function useFetchRecommendMeals(setData) {
  useEffect(() => {
    async function fetchData() {
      const requestAPI = await fetch(
        'https://www.themealdb.com/api/json/v1/1/search.php?s=',
      );
      const response = await requestAPI.json();
      setData(response.meals);
    }
    fetchData();
  }, []);
}
