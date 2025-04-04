import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import { Dashboard, History, QRScan as QRScanIcon, FDashboard, FHistory } from '@/assets/svg/iconsvg';
import { useRouter } from 'expo-router'; // Import useRouter from expo-router

type TabIconProps = {
  focused: boolean;
  Icon: React.FC<any>;
  FocusedIcon: React.FC<any>;
  title: string;
};

const TabIcon: React.FC<TabIconProps> = ({ focused, Icon, FocusedIcon, title }) => (
  <View className='flex-1 flex flex-col items-center'>
    {focused ? <FocusedIcon width={30} height={30} /> : <Icon width={25} height={25} />}
    <Text
      className={`${
        focused ? 'text-primary font-poppins-medium' : 'text-white font-rubik'
      } text-xs w-full text-center mt-1`}
    >
      {title}
    </Text>
  </View>
);

const TabsLayout: React.FC = () => {
  const router = useRouter();

  const handleQRScanPress = () => {
    router.push('/qrscan');
  };

  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBar,
        }}
      >
        <Tabs.Screen
          name='dashboard'
          options={{
            title: 'Dashboard',
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon Icon={Dashboard} FocusedIcon={FDashboard} focused={focused} title='Dashboard' />
            ),
          }}
        />

        <Tabs.Screen
          name="qrscan"
          options={{
            title: 'QR Scan',
            headerShown: false,
            tabBarButton: () => null, 
          }}
        />

        <Tabs.Screen
          name='qrhistory'
          options={{
            title: 'QR History',
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon Icon={History} FocusedIcon={FHistory} focused={focused} title='History' />
            ),
          }}
        />
      </Tabs>

      {/* Floating QR Scan Button */}
      <TouchableOpacity style={styles.qrButton} onPress={handleQRScanPress}>
        <QRScanIcon width={45} height={45} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'black',
    position: 'absolute',
    borderTopColor: '#EB5E28',
    borderTopWidth: 1,
    minHeight: 70,
  },
  qrButton: {
    position: 'absolute',
    bottom: 25,
    alignSelf: 'center',
    backgroundColor: '#EB5E28',
    borderRadius: 40,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#EB5E28',
    shadowOpacity: 0.6,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
});

export default TabsLayout;
