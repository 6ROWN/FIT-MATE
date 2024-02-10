import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { getMealsCategory } from "../../api/MealsDB";
import { MealCategory } from "../../types";
import Recipes from "./Recipes";

const Categories = () => {
	const [categories, setCategories] = useState<MealCategory[]>([]);
	const [isActiveCategory, setIsActiveCategory] = useState("beef");

	useEffect(() => {
		const getCategories = async () => {
			try {
				const data = await getMealsCategory();
				setCategories(data.categories);
			} catch (error) {
				console.log(error);
			}
		};

		getCategories();
	}, [isActiveCategory]);

	const renderCategoryItems = ({ item }: { item: MealCategory }) => (
		<TouchableOpacity
			onPress={() => setIsActiveCategory(item?.strCategory)}
			className="mr-6"
		>
			<View
				className={`${
					isActiveCategory === item?.strCategory
						? "bg-primary border-2 border-accent"
						: "bg-accent"
				} w-16 h-16 p-1 rounded-full`}
			>
				<Image
					source={{ uri: item?.strCategoryThumb }}
					resizeMode="cover"
					className="w-full h-full rounded-full"
				/>
			</View>

			<Text
				className={`${
					isActiveCategory === item?.strCategory
						? "font-bold text-primary text-lg"
						: "text-accent font-medium text-base"
				} text-center  py-2  `}
			>
				{item?.strCategory}
			</Text>
		</TouchableOpacity>
	);

	return (
		<View className="">
			<FlatList
				data={categories}
				renderItem={renderCategoryItems}
				keyExtractor={(item) => item.idCategory.toString()}
				horizontal
				showsHorizontalScrollIndicator={false}
			/>
			{categories && isActiveCategory && (
				<Recipes isActiveCategory={isActiveCategory} />
			)}
		</View>
	);
};

export default Categories;
