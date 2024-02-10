import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { ChevronLeftIcon } from "react-native-heroicons/solid";
import FacebookOAuth from "../components/OAuth/FacebookOAuth";
import GoogleOAuth from "../components/OAuth/GoogleOAuth";

const SignIn = ({ navigation }: any) => {
	return (
		<View className="flex-1 bg-secondary  py-10 px-4">
			<TouchableOpacity onPress={() => navigation.goBack()}>
				<ChevronLeftIcon color="white" size={24} />
			</TouchableOpacity>
			<View className="flex-1 flex justify-between items-center">
				<View className="flex-1 w-80 h-80">
					<Image
						source={require("../../assets/images/auth-image.png")}
						resizeMode="contain"
						className="w-full h-full"
					/>
				</View>
				<View className="flex space-y-8">
					<View className="">
						<GoogleOAuth />
					</View>
					<View>
						<FacebookOAuth />
					</View>

					<View>
						<Text className="text-accent text-center text-base">
							By continuing you agree to the terms and conditions
							of this application
						</Text>
					</View>
				</View>
			</View>
		</View>
	);
};

export default SignIn;
