import React from "react";
import * as WebBrowser from "expo-web-browser";
import { Image, Text, TouchableOpacity } from "react-native";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../../hooks/warmUpBrowser";

WebBrowser.maybeCompleteAuthSession();

const GoogleOAuth = () => {
	useWarmUpBrowser();

	const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

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
			className="flex flex-row justify-center space-x-4 bg-accent p-4 rounded-lg items-center"
		>
			<Image
				source={require("../../../assets/images/google-icon.png")}
				resizeMode="contain"
				className="h-5 w-5"
			/>
			<Text className="font-medium text-lg">Login with Google</Text>
		</TouchableOpacity>
	);
};
export default GoogleOAuth;
