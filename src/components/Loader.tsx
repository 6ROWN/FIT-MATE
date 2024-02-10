import { View, Text } from "react-native";
import React from "react";
import * as Progress from "react-native-progress";

const Loader = () => {
	return (
		<View className="flex justify-center items-center h-full">
			<Progress.Pie
				progress={0.4}
				size={60}
				indeterminate={true}
				color="#ffd500"
				borderWidth={2}
			/>
		</View>
	);
};

export default Loader;
