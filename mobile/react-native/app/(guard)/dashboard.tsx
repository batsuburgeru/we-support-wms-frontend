import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import images from '@/constants/images';

const Profile = () => {
    const router = useRouter();
    const [userName, setUserName] = useState<string>('');

    // Fetch user information
    const fetchUserName = async () => {
        try {
            const response = await fetch("http://192.168.1.9:3002/users/display-user-info", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });

            if (response.ok) {
                const data = await response.json();
                if (data.userInfo && data.userInfo.name) {
                    setUserName(data.userInfo.name);
                } else {
                    console.error("No user information found");
                }
            } else {
                console.error("Failed to fetch user information:", await response.text());
            }
        } catch (error) {
            console.error("Error fetching user information:", error);
        }
    };

    useEffect(() => {
        fetchUserName();
    }, []);

    // Handle user sign-out
    const handleSignOut = async () => {
        try {
            const response = await fetch("http://192.168.1.9:3002/users/logout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });

            if (response.ok) {
                console.log("Logout successful");
                router.replace("/");
            } else {
                console.error("Logout failed:", await response.text());
                alert("Logout failed. Try again.");
            }
        } catch (error) {
            console.error("Logout error:", error);
            alert("Failed to connect to server.");
        }
    };

    return (
        <SafeAreaView className="flex-1 justify-center items-center bg-white">
            <View className="items-center">
                <Image source={images.avatar} className="w-20 h-20 rounded-full mb-4" />
                <Text className="text-2xl font-poppins-bold">Hi, {userName}</Text>
            </View>
            <TouchableOpacity className="bg-red-500 p-4 rounded-lg mt-5" onPress={handleSignOut}>
                <Text className="text-white text-center font-poppins-bold text-lg">Sign Out</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default Profile;
