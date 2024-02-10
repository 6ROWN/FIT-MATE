import { SafeAreaView } from "react-native";
import React from "react";
import CategoryList from "../components/CategoryList";
import BodyPartList from "../components/BodyPartList";
import { ScrollView } from "react-native-virtualized-view";
import Header from "../components/Header";

const HomeScreen = () => {
	return (
		<SafeAreaView className="flex-1 bg-secondary">
			<ScrollView className="px-4 py-2">
				<Header />
				<CategoryList />
				<BodyPartList />
			</ScrollView>
		</SafeAreaView>
	);
};

export default HomeScreen;
