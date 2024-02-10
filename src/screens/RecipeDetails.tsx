import {
	View,
	Text,
	Image,
	SafeAreaView,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
	ChevronLeftIcon,
	ClockIcon,
	FireIcon,
	Square3Stack3DIcon,
	UserGroupIcon,
} from "react-native-heroicons/solid";
import { getDetailedMealData } from "../api/MealsDB";
import { MealInfo } from "../types";
import Loader from "../components/Loader";
import ErrorPage from "../components/ErrorPage";

const RecipeDetails = ({ route, navigation }: any) => {
	const { item } = route.params;
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [mealData, setMealData] = useState<MealInfo>();
	const [selectedTab, setSelectedTab] = useState<
		"ingredient" | "instructions"
	>("ingredient");
	useEffect(() => {
		const fetchMealsData = async () => {
			setLoading(true);
			try {
				const data = await getDetailedMealData(item?.idMeal);
				setMealData(data.meals[0]);
			} catch (error) {
				console.log(error);
				setError("Error fetching meal data. Please try again.");
			} finally {
				setLoading(false);
			}
		};

		fetchMealsData();
	}, [item?.idMeal]);

	const ingredientsList: string[] = [];
	if (mealData) {
		for (let i = 1; i <= 20; i++) {
			const ingredientKey = `strIngredient${i}` as keyof MealInfo;
			const measureKey = `strMeasure${i} ` as keyof MealInfo;

			if (
				mealData[ingredientKey] !== undefined &&
				mealData[measureKey] !== undefined
			) {
				const ingredient = `${mealData[measureKey]} ${mealData[ingredientKey]}`;
				ingredientsList.push(ingredient);
			} else if (mealData[ingredientKey] !== undefined) {
				ingredientsList.push(mealData[ingredientKey]!);
			}
		}
	}

	if (loading) {
		return <Loader />;
	}

	if (error) {
		return <ErrorPage errorMsg={error} />;
	}

	return (
		<SafeAreaView className="flex-1 bg-lightGray">
			<ScrollView>
				<View className="h-80 py-2 px-3">
					<Image
						source={{ uri: item?.strMealThumb }}
						resizeMode="cover"
						className="w-full h-full rounded-2xl"
					/>
					<TouchableOpacity
						onPress={() => navigation.goBack()}
						className="absolute left-6 top-6 p-1 bg-accent rounded-full"
					>
						<ChevronLeftIcon size={24} color={"black"} />
					</TouchableOpacity>
				</View>
				{/* Meal Description */}
				<View className="py-6  flex space-y-2 ">
					<View className="flex space-y-2 items-center">
						<Text className="text-left font-bold text-2xl tracking-widest">
							{mealData?.strMeal}
						</Text>
						<Text className="text-left text-lg">
							{mealData?.strArea}
						</Text>
					</View>
					<View className="flex flex-row justify-evenly">
						<View className="p-4 bg-accent rounded-full flex items-center justify-center space-y-2">
							<View className="bg-primary/75 p-2 rounded-full">
								<ClockIcon color={"black"} size={24} />
							</View>
							<View className="flex justify-center items-center">
								<Text className="font-bold text-lg">35 </Text>
								<Text className="font-medium">mins</Text>
							</View>
						</View>
						<View className="p-4 bg-accent rounded-full flex items-center justify-center space-y-2">
							<View className="bg-primary/75 p-2 rounded-full">
								<UserGroupIcon color={"black"} size={24} />
							</View>
							<View className="flex justify-center items-center">
								<Text className="font-bold text-lg">4 </Text>
								<Text className="font-medium">servings</Text>
							</View>
						</View>
						<View className="p-4 bg-accent rounded-full flex items-center justify-center space-y-2">
							<View className="bg-primary/75 p-2 rounded-full">
								<FireIcon color={"black"} size={24} />
							</View>
							<View className="flex justify-center items-center">
								<Text className="font-bold text-lg">250 </Text>
								<Text className="font-medium">Cals</Text>
							</View>
						</View>
						<View className="p-4 bg-accent rounded-full flex items-center justify-center space-y-2">
							<View className="bg-primary/75 p-2 rounded-full">
								<Square3Stack3DIcon color={"black"} size={24} />
							</View>
							<View className="flex justify-center items-center">
								<Text className="font-bold text-lg">Easy </Text>
								<Text className="font-medium">Prep</Text>
							</View>
						</View>
					</View>
					{/* Ingredients & Instructions */}
					<View className="flex flex-row items-center p-4 space-x-4">
						<TouchableOpacity
							onPress={() => setSelectedTab("ingredient")}
							className={`${
								selectedTab === "ingredient"
									? "bg-primary border-2 border-secondary"
									: "bg-secondary border-none"
							} flex-1  p-3 rounded-xl items-center `}
						>
							<Text
								className={`${
									selectedTab === "ingredient"
										? "font-bold text-secondary"
										: "text-accent font-normal"
								} text-lg`}
							>
								Ingredients
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => setSelectedTab("instructions")}
							className={`${
								selectedTab === "instructions"
									? " bg-primary border-2 border-secondary"
									: "bg-secondary"
							} flex-1 p-3 rounded-xl items-center`}
						>
							<Text
								className={`${
									selectedTab === "instructions"
										? "font-bold text-secondary"
										: "text-accent font-normal"
								} text-lg`}
							>
								Instructions
							</Text>
						</TouchableOpacity>
					</View>
					{/* Ingedient */}
					<View className="px-6">
						{selectedTab === "ingredient"
							? ingredientsList.map((item, index) => (
									<View
										key={index}
										className="flex flex-row space-x-6 p-2 items-center
										"
									>
										{item && (
											<View className="h-3 w-3 rounded-full bg-primary" />
										)}

										<Text className="text-base">
											{item}
										</Text>
									</View>
							  ))
							: mealData?.strInstructions
									?.split("\r\n")
									.map((item: any, index: any) => (
										<View
											key={index}
											className="flex flex-row space-x-4 p-2"
										>
											<Text className="font-extrabold py-1">
												{item && index + 1}
											</Text>
											<Text className="text-base">
												{item}
											</Text>
										</View>
									))}
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default RecipeDetails;
