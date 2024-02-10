import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Splash from "../screens/Splash";
import Welcome from "../screens/Welcome";
import SignIn from "../screens/SignIn";

const Stack = createStackNavigator();

const AuthStack = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="splash" component={Splash} />
			<Stack.Screen name="welcome" component={Welcome} />

			<Stack.Screen name="signIn" component={SignIn} />
		</Stack.Navigator>
	);
};

export default AuthStack;
