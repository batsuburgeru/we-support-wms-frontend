import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState} from 'react';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import images from '@/constants/images';
import { DQRScan, DQRHistory, DLogout } from '@/assets/svg/iconsvg';

const Dashboard = () => {
    const router = useRouter();
    const [userName, setUserName] = useState<string>('');

    // Fetch user information
    const fetchUserName = async () => {
        try {
            const response = await fetch("http://192.168.16.220:3002/users/display-user-info", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });

            if (response.status === 401) {
                console.warn("Unauthorized: No token or invalid token. Signing out...");
                handleSignOut(); 
                return;
            }

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
            const response = await fetch("http://192.168.16.220:3002/users/logout", {
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
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView>
            <View className="flex-row align-center items-center m-5">
                <Image source={images.avatar} className="w-20 h-20 rounded-full mb-4" />
                <Text className="text-2xl font-poppins-bold ml-5">Hi, {userName}</Text>
            </View>
            <TouchableOpacity className="flex items-center bg-tabs p-4 rounded-lg m-5" onPress={() => router.push('/qrscan')}>
                <DQRScan className="w-20 h-20 m-5" />
                <Text className="text-primary text-center font-poppins-bold text-lg m-5">Scan QR</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex items-center bg-tabs p-4 rounded-lg m-5" onPress={() => router.push('/qrhistory')}>
                <DQRHistory className="w-20 h-20 m-5" />
                <Text className="text-primary text-center font-poppins-bold text-lg m-5">History</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex items-center bg-primary p-4 rounded-lg m-5" onPress={handleSignOut}>
                <DLogout className="w-20 h-20 m-5" />
                <Text className="text-white text-center font-poppins-bold text-lg m-5">Sign Out</Text>
            </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Dashboard;
