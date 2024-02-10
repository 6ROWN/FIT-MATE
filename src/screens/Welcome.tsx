import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import Onboarding from "react-native-onboarding-swiper";
import { ChevronRightIcon } from "react-native-heroicons/solid";
import * as Animatable from "react-native-animatable";

const Next = ({ ...props }) => (
	<TouchableOpacity
		{...props}
		className="p-2 mr-4 rounded-full bg-secondary justify-center items-center flex "
	>
		<Animatable.Text animation="bounceInDown">
			<ChevronRightIcon color={"#fefefe"} size={24} />
		</Animatable.Text>
	</TouchableOpacity>
);

const Welcome = ({ navigation }: any) => {
	return (
		<Onboarding
			onSkip={() => navigation.replace("signIn")}
			onDone={() => navigation.replace("signIn")}
			NextButtonComponent={Next}
			pages={[
				{
					backgroundColor: "#070705",
					image: (
						<Image
							source={require("../../assets/images/slide-1.png")}
							resizeMode="contain"
							className="h-80"
						/>
					),
					title: (
						<Animatable.Text
							animation={"bounceIn"}
							duration={2000}
							className="text-accent text-2xl font-bold tracking-widest "
						>
							Elevate Your Fitness Journey
						</Animatable.Text>
					),
					subtitle: (
						<Animatable.Text
							animation={"bounceInUp"}
							className="text-lightGray text-base font-medium text-center pt-4"
						>
							Your Ultimate Gym Companion for a Healthier You
						</Animatable.Text>
					),
				},
				{
					backgroundColor: "#070705",
					image: (
						<View className="">
							<Image
								source={require("../../assets/images/slide-2.png")}
								resizeMode="contain"
								className="h-80"
							/>
						</View>
					),
					title: (
						<Text className="text-accent text-2xl font-bold tracking-widest">
							Unleash Your Potential
						</Text>
					),
					subtitle: (
						<Text className="text-lightGray text-base font-medium  mt-4 px-4 text-center">
							Forge Your Body, Transform Your Mind, Own Your
							Fitness
						</Text>
					),
				},
				{
					backgroundColor: "black",
					image: (
						<View className="">
							<Image
								source={require("../../assets/images/slide-3.png")}
								resizeMode="contain"
								className="h-80"
							/>
						</View>
					),
					title: (
						<Text className="text-white text-2xl font-bold tracking-widest">
							Energize Your Fitness Experience
						</Text>
					),
					subtitle: (
						<Text className="text-lightGray text-base font-medium  mt-4 px-4 text-center">
							Ignite Your Workout Passion and Unleash Your Inner
							Strength
						</Text>
					),
				},
			]}
		/>
	);
};

export default Welcome;
