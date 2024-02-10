import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import {
	BellAlertIcon,
	ChevronLeftIcon,
	MagnifyingGlassIcon,
	UserIcon,
} from "react-native-heroicons/solid";
import { useUser } from "@clerk/clerk-expo";
import Searchbar from "../components/Searchbar";
import {
	useNavigation,
	NavigationProp,
	ParamListBase,
} from "@react-navigation/native";

const Header = ({ screenName }: { screenName?: string }) => {
	const { user } = useUser();

	const [isVisible, setIsVisible] = useState(false);
	const navigation = useNavigation<NavigationProp<ParamListBase>>();

	const toggleVisibility = () => {
		setIsVisible(!isVisible);
	};

	return (
		<View>
			<View className="flex flex-row items-center justify-between">
				{screenName === "Search" || screenName === "searchScreen" ? (
					<TouchableOpacity onPress={() => navigation.goBack()}>
						<ChevronLeftIcon color={"white"} />
					</TouchableOpacity>
				) : (
					<TouchableOpacity className="" onPress={() => ""}>
						{user?.hasImage ? (
							<View className="border border-white rounded-full">
								<Image
									source={{ uri: user?.imageUrl }}
									resizeMode="cover"
									className="w-6 h-6  rounded-full"
								/>
							</View>
						) : (
							<UserIcon color={"white"} size={24} />
						)}
					</TouchableOpacity>
				)}

				<View className="flex-row items-center space-x-2">
					<TouchableOpacity onPress={() => toggleVisibility()}>
						<MagnifyingGlassIcon color={"white"} size={24} />
					</TouchableOpacity>
					<TouchableOpacity onPress={() => ""}>
						<BellAlertIcon color={"white"} size={24} />
					</TouchableOpacity>
				</View>
			</View>
			{isVisible && <Searchbar handleSearchBarVisiblity={setIsVisible} />}
		</View>
	);
};

export default Header;
