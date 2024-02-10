import { FlatList, SafeAreaView, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import ExerciseCard from "../components/ExerciseCard";
import Loader from "../components/Loader";

const SearchScreen = ({ route }: any) => {
	const { data } = route.params || [];
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 2000);
	}, [data]);

	if (loading) {
		return <Loader />;
	}

	return (
		<SafeAreaView className="flex-1 bg-dark">
			<View className="p-4">
				<Header screenName={route.name} />
				<View className="">
					{data && data?.length ? (
						<FlatList
							data={data}
							renderItem={({ item }) => (
								<ExerciseCard item={item} />
							)}
							numColumns={2}
							showsVerticalScrollIndicator={false}
						/>
					) : (
						<View className="justify-center items-center h-full px-4">
							<Text className="text-lg font-medium text-accent text-center mb-4">
								Not Data Found
							</Text>
							<Text className="text-lightGray text-base">
								Search required for data access.
							</Text>
						</View>
					)}
				</View>
			</View>
		</SafeAreaView>
	);
};

export default SearchScreen;
