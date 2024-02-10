import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { XMarkIcon } from "react-native-heroicons/solid";
import { searchExercises } from "../api/ExerciseDB";
import {
	useNavigation,
	NavigationProp,
	ParamListBase,
} from "@react-navigation/native";

const Searchbar = ({
	handleSearchBarVisiblity,
}: {
	handleSearchBarVisiblity: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const [searchInput, SetSearchInput] = useState("");

	const navigation = useNavigation<NavigationProp<ParamListBase>>();

	const handleSearch = async () => {
		if (searchInput.trim().length > 2) {
			try {
				const data = await searchExercises(searchInput);
				navigation.navigate("searchScreen", { data });
			} catch (error) {
				console.error("Error fetching search results:", error);
			}
		}
	};

	return (
		<View className="pt-4 flex flex-row items-center space-x-4">
			<TextInput
				placeholder="Search..."
				className="p-4 bg-lightGray rounded-lg flex-1"
				placeholderTextColor={"white"}
				value={searchInput}
				onChangeText={SetSearchInput}
				clearButtonMode="always"
				onSubmitEditing={handleSearch}
			/>
			<TouchableOpacity onPress={() => handleSearchBarVisiblity(false)}>
				<XMarkIcon color={"white"} size={24} />
			</TouchableOpacity>
		</View>
	);
};

export default Searchbar;
