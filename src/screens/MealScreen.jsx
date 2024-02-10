import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import Categories from "../components/MealsComponents/Categories";
import Recipes from "../components/MealsComponents/Recipes";
import { ScrollView } from "react-native-virtualized-view";

const MealScreen = () => {
	return (
		<SafeAreaView className="flex-1 bg-secondary">
			<ScrollView className="px-4">
				<Text className="text-primary text-center text-2xl tracking-widest py-4 font-medium">
					Meal Plan
				</Text>
				<Categories />
			</ScrollView>
		</SafeAreaView>
	);
};

export default MealScreen;
