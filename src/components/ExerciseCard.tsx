import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { ExerciseProps } from "../types";
import { Image } from "expo-image";
import {
	NavigationProp,
	ParamListBase,
	useNavigation,
} from "@react-navigation/native";

const ExerciseCard = ({ item }: { item: ExerciseProps }) => {
	const navigation = useNavigation<NavigationProp<ParamListBase>>();

	const blurhash =
		"|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

	return (
		<TouchableOpacity
			onPress={() =>
				navigation.navigate("exerciseDetails", { data: item })
			}
			className="flex-1 p-3"
		>
			<View className="">
				<Image
					source={{ uri: item?.gifUrl }}
					contentFit="fill"
					className="w-full h-36 object-cover rounded-lg"
					placeholder={blurhash}
				/>
			</View>
			<View>
				<Text className="text-center font-bold mt-2 text-lg capitalize text-accent">
					{item?.name?.length > 20
						? item?.name?.slice(0, 18) + "..."
						: item?.name}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

export default ExerciseCard;
