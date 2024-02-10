import { View, Text, Image } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import { Route } from "@react-navigation/native";
import {
	HomeIcon,
	UserIcon,
	MagnifyingGlassIcon,
} from "react-native-heroicons/solid";
import Profile from "../screens/Profile";
import MealScreen from "../screens/MealScreen";
import { BlurView } from "expo-blur";
import SearchScreen from "../screens/SearchScreen";

const Tabs = createBottomTabNavigator();

const TabNavigator = () => {
	const menuIcons = (route: Route<string>, focused: boolean) => {
		let icon;

		switch (route.name) {
			case "Home":
				icon = <HomeIcon color={focused ? "#ffd500" : "#939392"} />;
				break;

			case "Search":
				icon = (
					<MagnifyingGlassIcon
						color={focused ? "#ffd500" : "#939392"}
					/>
				);
				break;

			case "Meals":
				icon = (
					<Image
						source={
							focused
								? require("../../assets/images/meal-icon-focused.png")
								: require("../../assets/images/meal-icon.png")
						}
						resizeMode="contain"
						className="h-7 w-7"
					/>
				);
				break;

			case "Profile":
				icon = <UserIcon color={focused ? "#ffd500" : "#939392"} />;
				break;

			default:
				icon = null;
				break;
		}

		return icon;
	};

	return (
		<Tabs.Navigator
			screenOptions={({ route }) => ({
				tabBarShowLabel: false,
				headerShown: false,
				tabBarIcon: ({ focused }) => menuIcons(route, focused),
				tabBarStyle: {
					backgroundColor: "#262624",
				},

				tabBarBackground: () => (
					<BlurView tint="dark" intensity={100} />
				),
			})}
		>
			<Tabs.Screen name="Home" component={HomeScreen} />
			<Tabs.Screen name="Search" component={SearchScreen} />
			<Tabs.Screen name="Meals" component={MealScreen} />
			<Tabs.Screen name="Profile" component={Profile} />
		</Tabs.Navigator>
	);
};

export default TabNavigator;
