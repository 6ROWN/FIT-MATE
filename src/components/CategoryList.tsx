import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { equipments } from "../constants";
import { Equipments } from "../types";
import {
	useNavigation,
	NavigationProp,
	ParamListBase,
} from "@react-navigation/native";

const CategoryList = () => {
	const navigation = useNavigation<NavigationProp<ParamListBase>>();
	const renderCategoryItems = ({ item }: { item: Equipments }) => (
		<TouchableOpacity
			onPress={() => navigation.navigate("exercise", { data: item })}
			className={`bg-primary mr-4 py-2 px-4 rounded-lg`}
		>
			<Text className={` capitalize font-semibold text-dark`}>
				{item?.name}
			</Text>
		</TouchableOpacity>
	);

	return (
		<View className="py-4">
			<FlatList
				data={equipments}
				renderItem={renderCategoryItems}
				keyExtractor={(item) => item.id.toString()}
				horizontal
				showsHorizontalScrollIndicator={false}
			/>
		</View>
	);
};

export default CategoryList;
