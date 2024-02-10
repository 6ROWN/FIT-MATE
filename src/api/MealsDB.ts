export const getMealsCategory = async () => {
	const response = await fetch(
		"https://www.themealdb.com/api/json/v1/1/categories.php"
	);

	const data = response.json();

	return data;
};

export const getRecipes = async (params: any) => {
	const response = await fetch(
		`https://www.themealdb.com/api/json/v1/1/filter.php?c=${params}`
	);

	const data = response.json();

	return data;
};

export const getDetailedMealData = async (id: number) => {
	const response = await fetch(
		`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
	);

	const data = response.json();

	return data;
};
