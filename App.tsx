import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./src/navigations/AppStack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import AuthStack from "./src/navigations/AuthStack";
import * as SecureStore from "expo-secure-store";
import { StatusBar } from "react-native";

export default function App() {
	const [isFirstLaunched, setIsFirstLaunched] = useState(false);

	const tokenCache = {
		async getToken(key: string) {
			try {
				return SecureStore.getItemAsync(key);
			} catch (err) {
				return null;
			}
		},
		async saveToken(key: string, value: string) {
			try {
				return SecureStore.setItemAsync(key, value);
			} catch (err) {
				return;
			}
		},
	};

	useEffect(() => {
		AsyncStorage.getItem("alreadyLaunched").then((value) => {
			if (value === null) {
				AsyncStorage.setItem("alreadyLaunched", "true");
				setIsFirstLaunched(true);
			} else {
				setIsFirstLaunched(false);
			}
		});
	}, []);

	return (
		<NavigationContainer>
			<ClerkProvider
				tokenCache={tokenCache}
				publishableKey="pk_test_bWFueS1zaWxrd29ybS01NS5jbGVyay5hY2NvdW50cy5kZXYk"
			>
				<SignedIn>
					<AppStack />
				</SignedIn>
				<SignedOut>
					<AuthStack />
				</SignedOut>
			</ClerkProvider>
			<StatusBar barStyle={"light-content"} />
		</NavigationContainer>
	);
}
