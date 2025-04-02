import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignIn = async () => {
    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }
  
    try {
      const response = await fetch("http://172.16.48.90:3002/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", 
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      console.log("Server response:", data); 
  
      if (response.ok) {
        if (data.token) {
          console.log("JWT Token:", data.token); 
        } 
        if (data.user && data.user.name) {
          localStorage.setItem('userName', data.user.name); // Save user's name
        }
        router.replace("/profile");
      } else {
        alert(data.message || "Login failed. Check credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Failed to connect to server.");
    }
  };
  
  return (
    <View className="flex-1 justify-center items-center bg-white px-8">
      <Image 
        source={require("../assets/images/logo.png")} 
        className="w-40 h-40 mb-8" 
        resizeMode="contain" 
      />

      <Text className="text-5xl font-poppins-bold text-black">Log In</Text>
      <Text className="text-lg font-poppins-medium text-black mb-4">Input your credentials</Text>

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
          className="w-full h-12 bg-tabs px-3 pb-2 rounded-lg text-xl font" 
          placeholder="Enter password" 
          placeholderTextColor="#A9A9A9"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {/* <TouchableOpacity className="self-end mt-2">
        <Text className="text-lg text-primary font-poppins">Forgot password?</Text>
      </TouchableOpacity> */}

      {/* Sign In Button */}
      <TouchableOpacity className="w-full bg-primary p-4 rounded-lg mt-6" onPress={handleSignIn}>
        <Text className="text-white text-center font-poppins-bold text-2xl">Sign In</Text>
      </TouchableOpacity>

            {/* or Input */}
      {/* <View className="w-full mt-2">
        <Text className="text-lg font-poppins text-primary mb-1">----------- Or -----------</Text>
        <TouchableOpacity className="w-full bg-primary p-4 rounded-lg mt-6" onPress={handleSignIn}>
        <Text className="text-white text-center font-poppins-bold text-2xl">Sign in with Google</Text>
        </TouchableOpacity>
      </View> */}
      
    </View>
  );
};

export default SignIn;
