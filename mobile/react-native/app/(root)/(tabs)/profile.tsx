import { View, Text, ScrollView, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import images from '@/constants/images';
import icons from '@/constants/icons';
import { DoneRequests } from '@/components/data/requests';

const Profile = () => {
  const router = useRouter();

  const handleSignOut = () => {
    router.push("/signIn"); 
  };

  const pendingCount = DoneRequests.filter(req => req.status === "Pending").length;
  const approvedCount = DoneRequests.filter(req => req.status === "Approved").length;
  const deniedCount = DoneRequests.filter(req => req.status === "Denied").length;
  const cancelledCount = DoneRequests.filter(req => req.status === "Cancelled").length;

  interface SettingsItemProps {
    icon: ImageSourcePropType;
    title: string;
    count: number;
    bgColor: string;
    textColor: string;
    arrowColor?: string;
    onPress?: () => void;
  }

  const SettingsItem = ({ icon, title, count, bgColor, textColor, arrowColor, onPress }: SettingsItemProps) => (
    <TouchableOpacity 
      onPress={onPress} 
      className={`flex flex-row items-center justify-between p-4 rounded-lg ${bgColor}`}
    >
      <View className="flex-row items-center gap-3">
        <Image source={icon} className="w-6 h-6 opacity-70" />
        <View>
          <Text className={`text-3xl font-poppins-bold ${textColor}`}>{count}</Text>
          <Text className={`text-lg font-poppins-medium ${textColor} opacity-80`}>{title}</Text>
        </View>
      </View>
      <Image source={icons.arrow} className="w-5 h-5" style={{ tintColor: arrowColor }} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10, paddingHorizontal: 0 }}
      >
        {/* Profile Header */}
        <View className="flex-row items-center bg-white flex-1">
          <Image 
            source={images.avatar} 
            className="w-12 h-12 mx-5 my-5 rounded-full" 
          />
          <Text className="text-2xl font-poppins-bold">
            Hi, [user]
          </Text>
        </View>

        {/* Activity Section */}
        <View className="bg-gray-100 p-5 rounded-lg">
          <Text className="text-2xl font-poppins-bold mb-4">Your Activity</Text>
          <View className="p-2 rounded-lg">
            <SettingsItem 
              title="Total requests" 
              count={pendingCount + approvedCount + deniedCount + cancelledCount} 
              icon={icons.total}
              bgColor="bg-white" 
              textColor="text-black"
              arrowColor='white' 
            />
          </View>

          <View className="p-2 rounded-lg">
            <SettingsItem 
              title="Pending requests" 
              count={pendingCount}  
              icon={icons.pending} 
              bgColor="bg-primary" 
              textColor="text-white" 
              arrowColor="white"
              onPress={() => router.push('/')}
            />
          </View>

          <View className="p-2 rounded-lg">
            <SettingsItem 
              title="Approved requests" 
              count={approvedCount} 
              icon={icons.approved} 
              bgColor="bg-tertiary" 
              textColor="text-black"
              onPress={() => router.push({ pathname: "/history", params: { status: "Approved" } })}
            />
          </View>

          <View className="p-2 rounded-lg">
            <SettingsItem 
              title="Denied requests" 
              count={deniedCount}
              icon={icons.denied} 
              bgColor="bg-quarternary" 
              textColor="text-black"
              onPress={() => router.push({ pathname: "/history", params: { status: "Denied" } })}
            />
          </View>

          <View className="p-2 rounded-lg">
            <SettingsItem 
              title="Cancelled requests" 
              count={cancelledCount}
              icon={icons.cancel} 
              bgColor="bg-gray" 
              textColor="text-secondary" 
              arrowColor="#F97333"
              onPress={() => router.push({ pathname: "/history", params: { status: "Cancelled" } })}
            />
          </View>
        </View>

        <TouchableOpacity className="bg-white p-4 rounded-lg mx-5 mt-5 border border-black" onPress={handleSignOut}>
          <Text className="text-black text-center font-poppins text-lg">
            Sign Out
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
