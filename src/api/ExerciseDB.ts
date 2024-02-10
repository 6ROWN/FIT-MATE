import { ExerciseProps } from "../types";

const rapidApiKey = "61b426f4b5mshe584380871579ddp1e8795jsn640bae4618f6";

const baseUrl = "https://exercisedb.p.rapidapi.com/";

const apiCall = async (url: string, params?: string) => {
	const fullUrl = params ? `${baseUrl}${url}${params}` : `${baseUrl}${url}`;

	try {
		const options = {
			method: "GET",
			headers: {
				"X-RapidAPI-Key": rapidApiKey,
				"X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
			},
		};

		const response = await fetch(fullUrl, options);
		const result = await response.json();

		return result;
	} catch (error) {
		console.log(error);
		return [];
	}
};

export const fetchExerciseByBodyPart = async (bodyPart: string) => {
	return await apiCall("exercises/bodyPart/", bodyPart);
};

export const fetchExerciseByEquipment = async (equipment: string) => {
	return await apiCall("exercises/equipment/", equipment);
};

export const searchExercises = async (searchParams: string) => {
	try {
		// Fetch all exercises from the API
		const exerciseData = await apiCall("exercises?limit=20");

		// Check if there are any search parameters
		if (searchParams.trim() !== "") {
			// Filter exercises based on searchParams
			const filteredExercises = exerciseData.filter(
				(exercise: ExerciseProps) =>
					exercise.name
						.toLowerCase()
						.includes(searchParams.toLowerCase()) ||
					exercise.bodyPart
						.toLowerCase()
						.includes(searchParams.toLowerCase()) ||
					exercise.equipment
						.toLowerCase()
						.includes(searchParams.toLowerCase()) ||
					exercise.target.toLowerCase()
			);

			// Return the filtered list of exercises
			return filteredExercises;
		} else {
			// If no search parameters provided, return all exercises
			return exerciseData;
		}
	} catch (error) {
		console.error("Error fetching or filtering exercises:", error);
		throw error; // Rethrow the error for the caller to handle
	}
};
