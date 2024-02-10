import {
	View,
	Text,
	TouchableOpacity,
	Image,
	SafeAreaView,
	ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ChevronLeftIcon } from "react-native-heroicons/solid";
import {
	fetchExerciseByBodyPart,
	fetchExerciseByEquipment,
} from "../api/ExerciseDB";
import { FlatList } from "react-native-gesture-handler";
import { ExerciseProps } from "../types";
import { ScrollView } from "react-native-virtualized-view";
import ExerciseCard from "../components/ExerciseCard";
import Loader from "../components/Loader";
import ErrorPage from "../components/ErrorPage";

const ExerciseScreen = ({ navigation, route }: any) => {
	const { data } = route.params;

	const [exercises, setExercises] = useState<ExerciseProps[] | undefined>();
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<null | string>(null);

	useEffect(() => {
		if (data?.part) {
			const fetchExercises = async () => {
				setLoading(true);
				setError(null);
				try {
					const exerciseData = await fetchExerciseByBodyPart(
						data.part
					);
					setExercises(exerciseData);
				} catch (error) {
					console.error(error);
					setError("Error fetching exercises. Please try again.");
				} finally {
					setLoading(false);
				}
			};
			fetchExercises();
		}

		if (data?.name) {
			const fetchExercises = async () => {
				setLoading(true);
				setError(null);
				try {
					const exerciseData = await fetchExerciseByEquipment(
						data.name
					);
					setExercises(exerciseData);
				} catch (error) {
					console.error(error);
					setError("Error fetching exercises. Please try again.");
				} finally {
					setLoading(false);
				}
			};
			fetchExercises();
		}
	}, [data?.part || data?.name]);

	if (loading) {
		return <Loader />;
	}

	if (error) {
		return <ErrorPage errorMsg={error} />;
	}

	return (
		<SafeAreaView className="flex-1 bg-lightGray ">
			<ScrollView showsVerticalScrollIndicator={false}>
				<View className="bg-primary h-[300px]">
					<ImageBackground
						source={
							data?.imgLink ||
							require("../../assets/images/slide-3.png")
						}
						className="h-full w-full"
					>
						<View className="py-6 px-4">
							<TouchableOpacity
								onPress={() => navigation.goBack()}
								className=""
							>
								<ChevronLeftIcon color={"gray"} size={28} />
							</TouchableOpacity>
						</View>
					</ImageBackground>
				</View>
				<View className="bg-secondary py-4 mx-4 rounded-2xl -mt-8 border-2 border-accent">
					<Text className="text-center text-accent text-2xl capitalize font-bold">
						{data?.part || data?.name} Exercises
					</Text>
				</View>
				<View className="">
					{exercises && exercises?.length ? (
						<FlatList
							data={exercises}
							renderItem={({ item }) => (
								<ExerciseCard item={item} />
							)}
							numColumns={2}
							showsVerticalScrollIndicator={false}
						/>
					) : (
						<View className="justify-center items-center mt-24">
							<Text className="text-xl font-bold">No data</Text>
						</View>
					)}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default ExerciseScreen;
