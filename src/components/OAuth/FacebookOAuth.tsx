import React from "react";
import * as WebBrowser from "expo-web-browser";
import { Button, Image, Text, TouchableOpacity } from "react-native";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../../hooks/warmUpBrowser";

WebBrowser.maybeCompleteAuthSession();

const FacebookOAuth = () => {
	// Warm up the android browser to improve UX
	// https://docs.expo.dev/guides/authentication/#improving-user-experience
	useWarmUpBrowser();

	const { startOAuthFlow } = useOAuth({ strategy: "oauth_facebook" });

	const onPress = React.useCallback(async () => {
		try {
			const { createdSessionId, signIn, signUp, setActive } =
				await startOAuthFlow();

			if (createdSessionId) {
				setActive?.({ session: createdSessionId });
			} else {
				// Use signIn or signUp for next steps such as MFA
			}
		} catch (err) {
			console.error("OAuth error", err);
		}
	}, []);

	return (
		<TouchableOpacity
			onPress={onPress}
			className="flex flex-row justify-center space-x-4 bg-[#00509d] p-4 rounded-lg items-center"
		>
			<Image
				source={require("../../../assets/images/facebook-icon.png")}
				resizeMode="contain"
				className="h-5 w-5"
			/>
			<Text className="font-medium text-lg text-accent">
				Login with Facebook
			</Text>
		</TouchableOpacity>
	);
};
export default FacebookOAuth;
