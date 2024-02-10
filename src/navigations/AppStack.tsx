import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import ExerciseScreen from "../screens/ExerciseScreen";
import ExerciseDetails from "../screens/ExerciseDetails";
import TabNavigator from "./TabNavigator";
import RecipeDetails from "../screens/RecipeDetails";
import SearchScreen from "../screens/SearchScreen";

const Stack = createStackNavigator();

const AppStack = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="home" component={TabNavigator} />
			<Stack.Screen name="exercise" component={ExerciseScreen} />
			<Stack.Screen
				name="exerciseDetails"
				options={{ presentation: "modal" }}
				component={ExerciseDetails}
			/>
			<Stack.Screen name="recipeDetails" component={RecipeDetails} />
			<Stack.Screen name="searchScreen" component={SearchScreen} />
		</Stack.Navigator>
	);
};

export default AppStack;
