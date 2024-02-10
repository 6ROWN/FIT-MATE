import {
	View,
	Text,
	SafeAreaView,
	Image,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import React from "react";
import { XMarkIcon } from "react-native-heroicons/solid";

const ExerciseDetails = ({ navigation, route }: any) => {
	const { data } = route.params;

	return (
		<SafeAreaView className="flex-1 bg-secondary">
			<View>
				<Image
					source={{ uri: data?.gifUrl }}
					className="h-80 w-full "
					resizeMode="stretch"
				></Image>
				<TouchableOpacity
					onPress={() => navigation.goBack()}
					className="absolute right-5 top-3 bg-red-400 rounded-full p-1"
				>
					<XMarkIcon color={"white"} size={20} />
				</TouchableOpacity>
			</View>
			<View className="bg-primary p-4">
				<Text className="text-center capitalize font-bold text-lg text-dark">
					{data?.name}
				</Text>
			</View>
			<View className="flex justify-between flex-row items-center px-4 mt-4">
				<Text className="text-lightGray text-base">
					Target: {data?.target}
				</Text>
				<Text className="text-lightGray text-base">
					Equipment: {data?.equipment}
				</Text>
			</View>
			<ScrollView className="px-4">
				<Text className="text-lg text-white text-center py-4 font-medium tracking-widest">
					Instructions
				</Text>
				{data?.instructions.map(
					(instruction: string, index: number) => (
						<Text
							className="pb-4 text-lightGray text-base"
							key={index}
						>{`${index + 1}. ${instruction}`}</Text>
					)
				)}
			</ScrollView>
		</SafeAreaView>
	);
};

export default ExerciseDetails;
