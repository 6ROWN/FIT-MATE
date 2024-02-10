import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import * as Animatable from "react-native-animatable";

const Splash = ({ navigation }: any) => {
	useEffect(() => {
		const splashTimeout = setTimeout(() => {
			navigation.replace("welcome");
		}, 3000);

		return () => clearTimeout(splashTimeout);
	}, []);

	return (
		<View className="flex-1 bg-dark justify-center items-center">
			<View className="w-40 h-40">
				<Image
					source={require("../../assets/images/logo-img.png")}
					resizeMode="contain"
					className="w-full h-full"
				/>
			</View>

			<Animatable.Text
				animation="zoomInUp"
				className="text-primary text-4xl mt-4 font-black tracking-widest"
			>
				FIT MATE
			</Animatable.Text>
		</View>
	);
};

export default Splash;
