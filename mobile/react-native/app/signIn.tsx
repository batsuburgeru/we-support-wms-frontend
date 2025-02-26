import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from './context/AuthProvider'; // Ensure the correct import path

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { login } = useAuth(); // Now correctly typed

  const handleSignIn = () => {
    if (email && password) {
      login(); // Update Auth State
      router.push("../(tabs)/profile"); // Navigate to profile page
    } else {
      alert("Please enter email and password.");
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-white px-8">
      <Image source={require("../assets/images/logo.png")} className="w-180 h-150 mb-20" resizeMode="contain" />

      <Text className="text-4xl font-bold text-black">Log In</Text>
      <Text className="text-md text-gray-500 mb-4">Input your credentials</Text>

      <View className="w-full">
        <Text className="text-md font-semibold text-primary mb-1">Email</Text>
        <TextInput 
          className="w-full h-12 bg-gray-100 px-3 pb-2 rounded-lg text-xl" 
          placeholder="Enter email" 
          placeholderTextColor="#A0A0A0"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View className="w-full mt-2">
        <Text className="text-md font-semibold text-primary mb-1">Password</Text>
        <TextInput 
          className="w-full h-12 bg-gray-100 px-3 pb-2 rounded-lg text-xl" 
          placeholder="Enter password" 
          placeholderTextColor="#A0A0A0"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <TouchableOpacity className="self-end mt-2">
        <Text className="text-md text-primary">Forgot password?</Text>
      </TouchableOpacity>

      <TouchableOpacity className="w-full bg-primary p-4 rounded-lg mt-6" onPress={handleSignIn}>
        <Text className="text-white text-center font-bold text-2xl">Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignIn;
