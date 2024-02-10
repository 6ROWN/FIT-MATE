import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import React from "react";
import { bodyParts } from "../constants";
import { BodyPart } from "../types";
import {
	useNavigation,
	NavigationProp,
	ParamListBase,
} from "@react-navigation/native";

const BodyPartList = () => {
	const navigation = useNavigation<NavigationProp<ParamListBase>>();

	const renderCategoryItems = ({ item }: { item: BodyPart }) => (
		<TouchableOpacity
			onPress={() => navigation.navigate("exercise", { data: item })}
			className={`bg-lightGray mb-4 py-3 px-4 rounded-lg`}
		>
			<View className="h-[100px]">
				<Image
					source={item?.imgLink}
					resizeMode="contain"
					className="w-full h-full"
				/>
			</View>

			<View className=" bg-primary p-3 rounded-lg">
				<Text className="capitalize font-extrabold tracking-widest text-dark text-center">
					{item?.part}
				</Text>
			</View>
		</TouchableOpacity>
	);

	return (
		<View className="">
			<Text className="pb-4 text-xl font-black text-accent">
				Exercises
			</Text>
			<FlatList
				data={bodyParts}
				renderItem={renderCategoryItems}
				keyExtractor={(item) => item.id.toString()}
				showsVerticalScrollIndicator={false}
			/>
		</View>
	);
};

export default BodyPartList;
