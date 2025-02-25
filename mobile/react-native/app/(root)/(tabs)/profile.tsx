import { View, Text, ScrollView, Image, TouchableOpacity, ImageSourcePropType } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '@/constants/images'
import icons from '@/constants/icons'

interface SettingsItemProps {
  icon: ImageSourcePropType;
  title: string;
  onPress?: () => void;
  textStyle?: string;
  showArrow?: boolean;
}

const SettingsItem = ({ icon, title, onPress, textStyle, showArrow = true}: SettingsItemProps) => (
  <TouchableOpacity>
    <View>
      <Image source={icon} />
      <Text>{title}</Text>
    </View>
  </TouchableOpacity>
)

const profile = () => {
  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32, paddingHorizontal: 20 }}
      >
        {/* Avatar and Text side by side */}
        <View className="flex-row items-center mt-5">
          <Image 
            source={images.avatar} 
            className="w-16 h-16 rounded-full" 
          />
          <Text className="text-xl font-poppins-bold ml-4">
            Hi user!
          </Text>
        </View>

        <View className='flex-col flex mt-10'>
          <Text>Your Activity</Text>
          <SettingsItem icon={icons.approved} title="Total Request"/>
          <SettingsItem icon={icons.approved} title="Pending Request"/>
          <SettingsItem icon={icons.approved} title="Approved Request"/>
          <SettingsItem icon={icons.approved} title="Denied Request"/>
          <SettingsItem icon={icons.approved} title="Cancel Request"/>
        </View>

        <View>
                <TouchableOpacity className="w-full bg-primary p-4 rounded-lg mt-6">
                  <Text className="text-white text-center font-poppins-bold text-2xl">Sign In</Text>
                </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default profile