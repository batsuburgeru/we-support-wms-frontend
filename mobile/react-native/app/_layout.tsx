import { useEffect } from 'react';
import { SplashScreen, Stack, useRouter } from 'expo-router';
import { useFonts } from 'expo-font';
import "../global.css";

export default function RootLayout() {
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require('../assets/fonts/Poppins-Bold.ttf'),
    "Poppins-ExtraBold": require('../assets/fonts/Poppins-ExtraBold.ttf'),
    "Poppins-ExtraLight": require('../assets/fonts/Poppins-ExtraLight.ttf'),
    "Poppins-Light": require('../assets/fonts/Poppins-Light.ttf'),
    "Poppins-Medium": require('../assets/fonts/Poppins-Medium.ttf'),
    "Poppins-Regular": require('../assets/fonts/Poppins-Regular.ttf'),
    "Poppins-SemiBold": require('../assets/fonts/Poppins-SemiBold.ttf'),
    "Poppins-Thin": require('../assets/fonts/Poppins-Thin.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
      router.replace('/signIn'); // Redirect to Sign In
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return <Stack screenOptions={{ headerShown: false }} />;
}
