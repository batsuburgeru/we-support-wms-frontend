import { View, Text, ScrollView, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import images from '@/constants/images';
import { DoneRequests } from '@/components/data/requests';
import { Arrow, CancelledRequest, DeniedRequest, ApprovedRequest, PendingRequest, TotalRequest } from '@/assets/svg/iconsvg';

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
    icon?: ImageSourcePropType;
    iconComponent?: JSX.Element;
    title: string;
    count: number;
    bgColor: string;
    textColor: string;
    hideArrow?: boolean;
    onPress?: () => void;
  }

  const SettingsItem = ({
    icon,
    iconComponent,
    title,
    count,
    bgColor,
    textColor,
    hideArrow = false,
    onPress,
  }: SettingsItemProps) => (
    <TouchableOpacity 
      onPress={onPress} 
      disabled={!onPress} 
      className={`flex flex-row items-center justify-between p-4 rounded-lg ${bgColor} shadow-lg`}
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5, // Android shadow
      }}
    >
      <View className="flex-row items-center gap-3">
        {iconComponent ? (
          <View className="w-6 h-6">{iconComponent}</View>
        ) : (
          icon && <Image source={icon} className="w-6 h-6 opacity-70" style={{ tintColor: "#F97333" }} />
        )}
        <View>
          <Text className={`text-3xl font-poppins-bold ${textColor}`}>{count}</Text>
          <Text className={`text-lg font-poppins-medium text-black opacity-80`}>{title}</Text>
        </View>
      </View>
      {!hideArrow && (
        <View className="w-5 h-5">
          <Arrow />
        </View>
      )}
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
              iconComponent={<TotalRequest />}
              bgColor="bg-white" 
              textColor="text-primary"
              hideArrow={true}
            />
          </View>

          <View className="p-2 rounded-lg">
            <SettingsItem 
              title="Pending requests" 
              count={pendingCount}  
              iconComponent={<PendingRequest />}
              bgColor="bg-white" 
              textColor="text-primary"
              onPress={() => router.push('/')}
            />
          </View>

          <View className="p-2 rounded-lg">
            <SettingsItem 
              title="Approved requests" 
              count={approvedCount} 
              iconComponent={<ApprovedRequest />}
              bgColor="bg-white" 
              textColor="text-primary"
              onPress={() => router.push({ pathname: "/history", params: { status: "Approved" } })}
            />
          </View>

          <View className="p-2 rounded-lg">
            <SettingsItem 
              title="Denied requests" 
              count={deniedCount}
              iconComponent={<DeniedRequest />} 
              bgColor="bg-white" 
              textColor="text-primary"
              onPress={() => router.push({ pathname: "/history", params: { status: "Denied" } })}
            />
          </View>

          <View className="p-2 rounded-lg">
            <SettingsItem 
              title="Cancelled requests" 
              count={cancelledCount}
              iconComponent={<CancelledRequest/>} 
              bgColor="bg-white" 
              textColor="text-primary"
              onPress={() => router.push({ pathname: "/history", params: { status: "Cancelled" } })}
            />
          </View>
        </View>

        <TouchableOpacity className="bg-white p-4 rounded-lg mx-5 mt-5 border border-primary" onPress={handleSignOut}>
          <Text className="text-primary text-center font-poppins-bold text-lg">
            Sign Out
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
