import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { getRecipes } from "../../api/MealsDB";
import { MealCategory, Recipe } from "../../types";
import { Image } from "expo-image";
import {
	useNavigation,
	NavigationProp,
	ParamListBase,
} from "@react-navigation/native";
import Loader from "../Loader";
import ErrorPage from "../ErrorPage";

const Recipes = ({ isActiveCategory }: { isActiveCategory: string }) => {
	const [recipes, setRecipes] = useState<Recipe[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const navigation = useNavigation<NavigationProp<ParamListBase>>();

	useEffect(() => {
		const fetchRecipes = async () => {
			setLoading(true);
			setError(null);
			try {
				const data = await getRecipes(isActiveCategory);
				setRecipes(data.meals);
			} catch (error) {
				console.log(error);
				setError("Error fetching recipes. Please try again.");
			} finally {
				setLoading(false);
			}
		};

		fetchRecipes();
	}, [isActiveCategory]);

	const renderItem = ({ item }: { item: Recipe }) => (
		<TouchableOpacity
			onPress={() => navigation.navigate("recipeDetails", { item })}
			className="flex-1 p-3"
		>
			<View className="w-full h-40">
				<Image
					source={{ uri: item?.strMealThumb }}
					contentFit="cover"
					className="w-full h-full rounded-xl"
				/>
			</View>
			<View className="mt-3">
				<Text className="text-gray-200 text-base text-center font-medium">
					{item?.strMeal && item?.strMeal.length > 20
						? item?.strMeal.slice(0, 20) + "..."
						: item?.strMeal}
				</Text>
			</View>
		</TouchableOpacity>
	);

	if (loading) {
		return <Loader />;
	}

	if (error) {
		return <ErrorPage errorMsg={error} />;
	}

	return (
		<View className="">
			<Text className="text-accent font-bold text-2xl py-4">Recipes</Text>

			<FlatList
				data={recipes}
				keyExtractor={(item): string => item?.idMeal.toString()}
				numColumns={2}
				renderItem={renderItem}
				showsVerticalScrollIndicator={false}
			/>
		</View>
	);
};

export default Recipes;
