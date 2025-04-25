import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router'; // Importing the navigation tool for route management
import AsyncStorage from '@react-native-async-storage/async-storage'; // For storing data persistently on the device
import { jwtDecode, JwtPayload } from 'jwt-decode'; // For decoding JSON Web Tokens (JWTs)

// Extend the JwtPayload interface to include custom fields like role, name, and id
interface CustomJwtPayload extends JwtPayload {
  role: string; // Role of the user (e.g., Supervisor, Guard, Admin, etc.)
  name: string; // Name of the user
  id: string; // User ID
}

// SignIn component definition
const SignIn = () => {
  // States for managing user input
  const [email, setEmail] = useState(''); // Tracks the email entered by the user
  const [password, setPassword] = useState(''); // Tracks the password entered by the user
  const router = useRouter(); // Provides navigation functionality

  // Function to handle the sign-in process
  const handleSignIn = async () => {
    // Validate that both email and password are entered
    if (!email || !password) {
      alert('Please enter email and password.');
      return;
    }

    try {
      // Make a POST request to the login API
      const response = await fetch('http://192.168.26.52:3002/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Specify content type as JSON
        },
        credentials: 'include', // Include credentials for authentication
        body: JSON.stringify({ email, password }), // Send email and password as payload
      });

      const data = await response.json(); // Parse the response JSON
      console.log('Server response:', data); // Log the server response for debugging

      // If login is successful
      if (response.ok) {
        if (data.token) {
          console.log('JWT Token:', data.token); // Log the JWT token

          // Decode the token to extract user information
          const decodedToken = jwtDecode<CustomJwtPayload>(data.token);
          console.log('Decoded Token:', decodedToken); // Log the decoded token

          // Extract user details from the decoded token
          const userRole = decodedToken.role;
          const userName = decodedToken.name;
          const userId = decodedToken.id;

          // Store token and user details in AsyncStorage for persistent access
          await AsyncStorage.setItem('token', data.token);
          await AsyncStorage.setItem('userRole', userRole);
          await AsyncStorage.setItem('userName', userName);
          await AsyncStorage.setItem('userId', userId);

          // Navigate the user to different screens based on their role
          if (
            userRole === 'Supervisor' ||
            userRole === 'WarehouseMan' ||
            userRole === 'Admin'
          ) {
            router.replace('/(supervisor)/profile'); // Navigate to Supervisor profile
          } else if (userRole === 'Guard' || userRole === 'Admin') {
            router.replace('/(guard)/dashboard'); // Navigate to Guard dashboard
          } else {
            alert('Unauthorized role. Please contact the admin.'); // Show error for unauthorized role
          }
        }
      } else {
        console.log('Error message:', data.message); // Log the error message

        // Check for specific errors like unverified accounts
        if (data.error === 'Account not verified. Please verify your email before logging in.') {
          router.push('/EmailVerify'); // Navigate to email verification page
        } else {
          alert(data.message || 'Login failed. Check credentials.'); // Show general error message
        }
      }
    } catch (error) {
      console.error('Login error:', error); // Log any errors that occur during the login attempt
      alert('Failed to connect to server.'); // Show connection error message
    }
  };

  // Function to navigate to the Forgot Password screen
  const navigateToForgotPassword = () => {
    router.push('/PassReset'); // Navigate to the password reset screen
  };

  // Render the login screen
  return (
    <View className="flex-1 justify-center items-center bg-white px-8">
      {/* Display logo */}
      <Image
        source={require('../assets/images/logo.png')} // Path to logo image
        className="w-40 h-40 mb-8"
        resizeMode="contain" // Maintain the aspect ratio of the image
      />

      {/* Login header */}
      <Text className="text-5xl font-poppins-bold text-black">Log In</Text>
      <Text className="text-lg font-poppins-medium text-black mb-4">
        Input your credentials
      </Text>

      {/* Email input field */}
      <View className="w-full">
        <Text className="text-lg font-poppins text-primary mb-1">Email</Text>
        <TextInput
          className="w-full h-12 bg-tabs px-3 pb-2 rounded-lg text-xl" // Style the input field
          placeholder="Enter email" // Placeholder text
          placeholderTextColor="#A9A9A9" // Placeholder text color
          value={email} // Bind email state to the input field
          onChangeText={setEmail} // Update email state on user input
        />
      </View>

      {/* Password input field */}
      <View className="w-full mt-2">
        <Text className="text-lg font-poppins text-primary mb-1">Password</Text>
        <TextInput
          className="w-full h-12 bg-tabs px-3 pb-2 rounded-lg text-xl" // Style the input field
          placeholder="Enter password" // Placeholder text
          placeholderTextColor="#A9A9A9" // Placeholder text color
          secureTextEntry // Hide password characters for security
          value={password} // Bind password state to the input field
          onChangeText={setPassword} // Update password state on user input
        />
      </View>

      {/* Sign In button */}
      <TouchableOpacity
        className="w-full bg-primary p-4 rounded-lg mt-6"
        onPress={handleSignIn} // Trigger the handleSignIn function
      >
        <Text className="text-white text-center font-poppins-bold text-2xl">
          Sign In
        </Text>
      </TouchableOpacity>

      {/* Forgot Password button */}
      <TouchableOpacity
        className="w-full mt-4"
        onPress={navigateToForgotPassword} // Trigger the navigateToForgotPassword function
      >
        <Text className="text-primary text-center font-poppins-bold text-lg">
          Forgot Password?
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignIn; // Export the component for use elsewhere