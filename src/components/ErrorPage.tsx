import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { ExclamationTriangleIcon } from "react-native-heroicons/solid";
import {
	useNavigation,
	NavigationProp,
	ParamListBase,
} from "@react-navigation/native";

const ErrorPage = ({ errorMsg }: { errorMsg: string }) => {
	const navigation = useNavigation<NavigationProp<ParamListBase>>();
	return (
		<View className="flex h-full justify-center items-center space-y-6">
			<ExclamationTriangleIcon color={"#ae2012"} size={40} />
			<Text className="text-gray-400 text-lg">{errorMsg}</Text>
			<TouchableOpacity
				onPress={() => navigation.goBack()}
				className="p-2 bg-primary rounded-md"
			>
				<Text className="font-medium">Go back</Text>
			</TouchableOpacity>
		</View>
	);
};

export default ErrorPage;

const styles = StyleSheet.create({});
