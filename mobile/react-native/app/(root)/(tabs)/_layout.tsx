import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'

import icons from '@/constants/icons'

const TabIcon = ({ 
    focused, 
    icon, 
    focusedIcon,
    title
}: { 
    focused: boolean; 
    icon: any; 
    focusedIcon: any;
    title: string;
}) => (
    <View className='flex-1 mt-3 flex flex-col items-center'>
        <Image
          source={focused ? focusedIcon : icon}
        />
        <Text
          className={`${
            focused
              ? "text-primary font-poppins-medium"
              : "text-black-200 font-rubik"
          } text-xs w-full text-center mt-1`}
        >
          {title}
        </Text>
    </View>
);

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#F7F8F9',
          position: 'absolute',
          borderTopColor: "#EB5E28",
          borderTopWidth: 1,
          minHeight: 70,
        }
      }}
    >
      <Tabs.Screen
        name="profile"
        options={{
          title: "Dashboard",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center' }}>
              <View style={{
                height: 3,
                width: '400%',
                backgroundColor: focused ? "#EB5E28" : "transparent",
                position: "absolute",
                top: -8, 
              }} />
              <TabIcon 
                icon={icons.dash} 
                focusedIcon={icons.dashfoc} 
                focused={focused} 
                title="Dashboard" 
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="index"
        options={{
          title: "Requests",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center' }}>
              <View style={{
                height: 3,
                width: '400%',
                backgroundColor: focused ? "#EB5E28" : "transparent",
                position: "absolute",
                top: -8,
              }} />
              <TabIcon 
                icon={icons.request} 
                focusedIcon={icons.reqfoc} 
                focused={focused} 
                title="Requests" 
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center' }}>
              <View style={{
                height: 3,
                width: '400%',
                backgroundColor: focused ? "#EB5E28" : "transparent",
                position: "absolute",
                top: -8,
              }} />
              <TabIcon 
                icon={icons.history} 
                focusedIcon={icons.hisfoc}
                focused={focused} 
                title="History" 
              />
            </View>
          ),
        }}
      /> 
    </Tabs>
  )
}

export default TabsLayout;
