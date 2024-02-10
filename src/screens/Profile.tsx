import {
	View,
	Text,
	SafeAreaView,
	TouchableOpacity,
	Image,
	ScrollView,
} from "react-native";
import React from "react";
import {
	ChevronLeftIcon,
	ChevronRightIcon,
} from "react-native-heroicons/solid";
import { useUser } from "@clerk/clerk-expo";
import {
	ArrowLeftStartOnRectangleIcon,
	BellIcon,
	ChatBubbleOvalLeftIcon,
	Cog6ToothIcon,
	LockClosedIcon,
	PencilSquareIcon,
	ShieldCheckIcon,
} from "react-native-heroicons/solid";
import { useAuth } from "@clerk/clerk-expo";

const Profile = () => {
	const { user } = useUser();
	const { signOut } = useAuth();

	const ProfileData = {
		privacy: [
			{ id: 1, name: "security", icon: LockClosedIcon },
			{ id: 2, name: "Privacy Policy", icon: ShieldCheckIcon },
		],
		settings: [
			{ id: 1, name: "Edit Account", icon: PencilSquareIcon },
			{ id: 2, name: "Change Password", icon: LockClosedIcon },
			{ id: 3, name: "General", icon: Cog6ToothIcon },
			{ id: 4, name: "Notifications", icon: BellIcon },
			{ id: 5, name: "Support", icon: ChatBubbleOvalLeftIcon },
			{
				id: 6,
				name: "Logout",
				icon: ArrowLeftStartOnRectangleIcon,
				onPress: () => signOut(),
			},
		],
	};

	return (
		<SafeAreaView className="flex-1 bg-dark">
			<ScrollView>
				<View className="p-4 flex space-y-8">
					<View className="flex flex-row items-center justify-between">
						<TouchableOpacity>
							<ChevronLeftIcon color={"white"} size={20} />
						</TouchableOpacity>
						<View>
							<Text className="text-accent font-bold text-xl">
								Privacy & Setting
							</Text>
						</View>
						<View />
					</View>
					{/* Name */}
					<View className="p-4 bg-secondary rounded-md flex flex-row items-center space-x-8">
						<View className="h-12 w-12">
							<Image
								source={{ uri: user?.imageUrl }}
								resizeMode="contain"
								className="w-full h-full rounded-md"
							/>
						</View>
						<View className="flex space-y-1">
							<Text className="font-bold text-gray-300">
								{user?.lastName} {user?.firstName}
							</Text>
							<Text className="text-sm text-gray-300">
								{user?.emailAddresses[0]?.emailAddress}
							</Text>
						</View>
					</View>
					{/* Privacy */}
					<View>
						<Text className="text-accent mb-4 text-xl font-bold">
							Privacy
						</Text>
						<View className="bg-secondary rounded-md">
							{ProfileData.privacy.map((profile) => (
								<TouchableOpacity
									key={profile?.id}
									className=" flex flex-row justify-between items-center px-4 "
								>
									<View className="flex flex-row items-center space-x-4">
										<profile.icon
											size={18}
											color={"#eeeeee"}
										/>
										<Text className="text-gray-300 p-4 capitalize font-medium">
											{profile.name}
										</Text>
									</View>

									<View>
										<ChevronRightIcon
											color={"white"}
											size={20}
										/>
									</View>
								</TouchableOpacity>
							))}
						</View>
					</View>

					{/* Settings */}
					<View>
						<Text className="text-accent mb-4 text-xl font-bold">
							Settings
						</Text>
						<View className="bg-secondary rounded-md">
							{ProfileData.settings.map((profile) => (
								<TouchableOpacity
									onPress={profile?.onPress}
									key={profile?.id}
									className=" flex flex-row justify-between items-center px-4 "
								>
									<View className="flex flex-row items-center space-x-4">
										<profile.icon
											size={18}
											color={"#eeeeee"}
										/>
										<Text className="text-gray-300 p-4 capitalize font-medium">
											{profile.name}
										</Text>
									</View>
									<View>
										<ChevronRightIcon
											color={"white"}
											size={20}
										/>
									</View>
								</TouchableOpacity>
							))}
						</View>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default Profile;
