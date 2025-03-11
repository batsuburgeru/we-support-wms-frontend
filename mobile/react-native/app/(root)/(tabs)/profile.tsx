import { View, Text, ScrollView, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import images from '@/constants/images';
import { Arrow, CancelledRequest, DeniedRequest, ApprovedRequest, PendingRequest, TotalRequest } from '@/assets/svg/iconsvg';

interface RequestItem {
  status: "Pending" | "Approved" | "Rejected" | "Processed";
}

interface SettingsItemProps {
  icon?: ImageSourcePropType;
  iconComponent?: JSX.Element;
  title: string;
  count: number;
  bgColor: string;
  textColor: string;
  hideArrow?: boolean;
  onPress?: () => void;
}

const Profile = () => {
  const router = useRouter();
  const [userName, setUserName] = useState<string>('');
  const [requests, setRequests] = useState<RequestItem[]>([]);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await fetch("http://192.168.1.4:3002/users/search-users?search=admin", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          if (data.data && data.data.length > 0) {
            setUserName(data.data[0].name);
          } else {
            console.error("No user data found");
          }
        } else {
          console.error("Failed to fetch user name:", await response.text());
        }
      } catch (error) {
        console.error("Error fetching user name:", error);
      }
    };

    const fetchRequests = async () => {
      try {
        const response = await fetch("http://192.168.1.4:3002/purchaseRequests/view-purchase-requests", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
    
        if (response.ok) {
          const data = await response.json();
          if (data && Array.isArray(data.data)) {  // <- Check `data.data`
            setRequests(data.data);  // <- Assign `data.data`
          } else {
            console.error("Invalid response format for requests");
          }
        } else {
          console.error("Failed to fetch requests:", await response.text());
        }
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };    

    fetchUserName();
    fetchRequests();
  }, []);

  const handleSignOut = async () => {
    try {
      const response = await fetch("http://192.168.1.4:3002/users/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (response.ok) {
        console.log("Logout successful");
        router.replace("/signIn");
      } else {
        console.error("Logout failed:", await response.text());
        alert("Logout failed. Try again.");
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("Failed to connect to server.");
    }
  };

  const pendingCount = requests.filter(req => req.status === "Pending").length;
  const approvedCount = requests.filter(req => req.status === "Approved").length;
  const deniedCount = requests.filter(req => req.status === "Rejected").length;
  const cancelledCount = requests.filter(req => req.status === "Processed").length;
  const totalCount = pendingCount + approvedCount + deniedCount + cancelledCount;

  return (
    <SafeAreaView className="flex-1">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 10, paddingHorizontal: 0 }}>
        <View className="flex-row items-center bg-white flex-1 pt-5">
          <Image source={images.avatar} className="w-12 h-12 mx-5 my-5 rounded-full" />
          <Text className="text-2xl font-poppins-bold">Hi, {userName}</Text>
        </View>

        <View className="bg-gray-100 p-5 rounded-lg">
          <Text className="text-2xl font-poppins-bold mb-4">Your Activity</Text>

          {[{
            title: "Total requests", count: totalCount, iconComponent: <TotalRequest />,
          }, {
            title: "Pending requests", count: pendingCount, iconComponent: <PendingRequest />, onPress: () => router.push('/')
          }, {
            title: "Approved requests", count: approvedCount, iconComponent: <ApprovedRequest />, onPress: () => router.push({ pathname: "/history", params: { status: "Approved" } })
          }, {
            title: "Denied requests", count: deniedCount, iconComponent: <DeniedRequest />, onPress: () => router.push({ pathname: "/history", params: { status: "Denied" } })
          }, {
            title: "Cancelled requests", count: cancelledCount, iconComponent: <CancelledRequest/>, onPress: () => router.push({ pathname: "/history", params: { status: "Cancelled" } })
          }].map((item, index) => (
            <View key={index} className="p-2 rounded-lg">
              <SettingsItem {...item} bgColor="bg-white" textColor="text-primary" hideArrow={!item.onPress} />
            </View>
          ))}
        </View>

        <TouchableOpacity className="bg-white p-4 rounded-lg mx-5 mt-5 border border-primary" onPress={handleSignOut}>
          <Text className="text-primary text-center font-poppins-bold text-lg">Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const SettingsItem: React.FC<SettingsItemProps> = ({
  icon,
  iconComponent,
  title,
  count,
  bgColor,
  textColor,
  hideArrow = false,
  onPress,
}) => (
  <TouchableOpacity onPress={onPress} disabled={!onPress} className={`flex flex-row items-center justify-between p-4 rounded-lg ${bgColor} shadow-lg`}>
    <View className="flex-row items-center gap-3">
      {iconComponent ? <View className="w-6 h-6">{iconComponent}</View> : icon && <Image source={icon} className="w-6 h-6 opacity-70" />}
      <View>
        <Text className={`text-3xl font-poppins-bold ${textColor}`}>{count}</Text>
        <Text className="text-lg font-poppins-medium text-black opacity-80">{title}</Text>
      </View>
    </View>
    {!hideArrow && <View className="w-5 h-5"><Arrow /></View>}
  </TouchableOpacity>
);

export default Profile;