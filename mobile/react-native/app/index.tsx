import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode, JwtPayload } from 'jwt-decode';

interface CustomJwtPayload extends JwtPayload {
  role: string;
  name: string;
  id: string;
}

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignIn = async () => {
    if (!email || !password) {
      alert('Please enter email and password.');
      return;
    }
  
    try {
      const response = await fetch('http://192.168.1.11:3002/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      console.log('Server response:', data);
  
      if (response.ok) {
        if (data.token) {
          console.log('JWT Token:', data.token);
  
          const decodedToken = jwtDecode<CustomJwtPayload>(data.token);
          console.log('Decoded Token:', decodedToken);
  
          const userRole = decodedToken.role;
          const userName = decodedToken.name;
          const userId = decodedToken.id;
  
          await AsyncStorage.setItem('token', data.token);
          await AsyncStorage.setItem('userRole', userRole);
          await AsyncStorage.setItem('userName', userName);
          await AsyncStorage.setItem('userId', userId);
  
          if (
            userRole === 'Supervisor' ||
            userRole === 'WarehouseMan' ||
            userRole === 'Admin'
          ) {
            router.replace('/(supervisor)/profile');
          } else if (userRole === 'Guard' || userRole === 'Admin') {
            router.replace('/(guard)/dashboard');
          } else {
            alert('Unauthorized role. Please contact the admin.');
          }
        }
      } else {
        console.log('Error message:', data.message);
  
        if (data.error === 'Account not verified. Please verify your email before logging in.') {
          router.push('/EmailVerify');
        } else {
          alert(data.message || 'Login failed. Check credentials.');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Failed to connect to server.');
    }
  };

  const navigateToForgotPassword = () => {
    router.push('/PassReset'); // Route to your Forgot Password screen
  };

  return (
    <View className="flex-1 justify-center items-center bg-white px-8">
      <Image
        source={require('../assets/images/logo.png')}
        className="w-40 h-40 mb-8"
        resizeMode="contain"
      />

      <Text className="text-5xl font-poppins-bold text-black">Log In</Text>
      <Text className="text-lg font-poppins-medium text-black mb-4">
        Input your credentials
      </Text>

      {/* Email Input */}
      <View className="w-full">
        <Text className="text-lg font-poppins text-primary mb-1">Email</Text>
        <TextInput
          className="w-full h-12 bg-tabs px-3 pb-2 rounded-lg text-xl"
          placeholder="Enter email"
          placeholderTextColor="#A9A9A9"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      {/* Password Input */}
      <View className="w-full mt-2">
        <Text className="text-lg font-poppins text-primary mb-1">Password</Text>
        <TextInput
          className="w-full h-12 bg-tabs px-3 pb-2 rounded-lg text-xl"
          placeholder="Enter password"
          placeholderTextColor="#A9A9A9"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {/* Sign In Button */}
      <TouchableOpacity
        className="w-full bg-primary p-4 rounded-lg mt-6"
        onPress={handleSignIn}
      >
        <Text className="text-white text-center font-poppins-bold text-2xl">
          Sign In
        </Text>
      </TouchableOpacity>

      {/* Forgot Password Button */}
      <TouchableOpacity
        className="w-full mt-4"
        onPress={navigateToForgotPassword}
      >
        <Text className="text-primary text-center font-poppins-bold text-lg">
          Forgot Password?
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignIn;