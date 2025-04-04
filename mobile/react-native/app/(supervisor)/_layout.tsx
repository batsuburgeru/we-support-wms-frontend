import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Dashboard, History, Requests, FDashboard, FHistory, FRequests } from '@/assets/svg/iconsvg'

const TabIcon = ({ 
    focused, 
    Icon, 
    FocusedIcon, 
    title 
}: { 
    focused: boolean; 
    Icon: React.FC<any>; 
    FocusedIcon: React.FC<any>; 
    title: string; 
}) => (
    <View className='flex-1 mt-3 flex flex-col items-center'>
        {focused ? <FocusedIcon width={30} height={30} /> : <Icon width={25} height={25} />}
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
                Icon={Dashboard} 
                FocusedIcon={FDashboard} 
                focused={focused} 
                title="Dashboard" 
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="request"
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
                Icon={Requests} 
                FocusedIcon={FRequests} 
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
                Icon={History} 
                FocusedIcon={FHistory} 
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
