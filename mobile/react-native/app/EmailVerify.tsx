import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { MailCheck } from 'lucide-react-native'; // Icon for success message
import { useRouter } from 'expo-router'; // Navigation hook for routing

// EmailVerificationForm is a functional component
const EmailVerificationForm: React.FC = () => {
  // State variables
  const [email, setEmail] = useState<string>(''); // State for the email input field
  const [successMsg, setSuccessMsg] = useState<boolean>(false); // Tracks whether the email verification link was successfully sent
  const [loadingMsg, setLoadingMsg] = useState<boolean>(false); // Tracks if the request is being processed
  const [errorMsg, setErrorMsg] = useState<boolean>(false); // Tracks if an error occurred during the request
  const [noEmail, setNoEmail] = useState<boolean>(false); // Tracks if the email field is empty
  const [resendTimer, setResendTimer] = useState<number>(0); // Tracks the countdown timer for resending the email
  const [resendDisabled, setResendDisabled] = useState<boolean>(false); // Tracks if the resend button is disabled

  const router = useRouter(); // Navigation hook for routing

  // Effect for handling the countdown timer for the resend button
  useEffect(() => {
    if (resendTimer > 0) {
      const interval = setInterval(() => {
        setResendTimer((prev) => prev - 1); // Decrease timer by 1 second
      }, 1000); // Set interval to 1 second
      return () => clearInterval(interval); // Cleanup the interval on component unmount or timer completion
    } else {
      setResendDisabled(false); // Enable the resend button when the timer hits 0
    }
  }, [resendTimer]);

  // Function to handle submitting the email for verification
  const handleSubmit = async () => {
    if (!email) { // If the email field is empty
      setNoEmail(true); // Show "no email" error
      return;
    }

    // Reset state and show loading message
    setLoadingMsg(true);
    setNoEmail(false);
    setErrorMsg(false);

    try {
      // Make a POST request to the email verification endpoint
      const response = await fetch(`http://192.168.1.19:3002/users/resend-verification-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Specify content type as JSON
        },
        body: JSON.stringify({ email }), // Pass the email in the request body
      });

      const result = await response.json(); // Parse the response JSON

      if (result?.message) { // If the response contains a success message
        setSuccessMsg(true); // Set success message
        setLoadingMsg(false); // Stop the loading message
      } else {
        setErrorMsg(true); // Set error message if the response is not as expected
        setLoadingMsg(false);
      }
    } catch (error) {
      console.log('Error:', error); // Log errors during the request
      setErrorMsg(true); // Set error message
      setLoadingMsg(false); // Stop the loading message
    }
  };

  // Render the UI
  return (
    <View className="flex-1">
      {!successMsg ? ( // If successMsg is false, show the email input form
        <View className="flex-1 justify-center items-center bg-white px-8">
          {/* Display logo */}
          <Image
            source={require('../assets/images/logo.png')} // Path to the logo image
            className="w-40 h-40 mb-8"
            resizeMode="contain" // Maintain the aspect ratio of the image
          />
          {/* Header and description */}
          <Text className="text-5xl font-poppins-bold text-black text-center mb-4">Email Verification</Text>
          <Text className="text-lg font-poppins-medium text-black text-center mb-4">
            Enter your email address to receive a verification link.
          </Text>

          {/* Email input field */}
          <View className="w-full">
            <Text className="text-lg font-poppins text-primary mb-1">Email</Text>
            <TextInput
              className="w-full h-12 bg-tabs px-3 pb-2 rounded-lg text-xl" // Styling for the input field
              placeholder="Enter your email" // Placeholder text
              placeholderTextColor="#A9A9A9" // Placeholder text color
              value={email} // Bind the input value to the email state
              onChangeText={(value) => setEmail(value)} // Update email state on input
              keyboardType="email-address" // Set keyboard type to email
            />
          </View>

          {/* Submit button */}
          <TouchableOpacity
            className={`w-full bg-primary p-4 rounded-lg mt-6 ${loadingMsg ? 'opacity-50' : ''}`} // Adjust opacity when loading
            onPress={handleSubmit} // Handle form submission
            disabled={loadingMsg} // Disable the button while loading
          >
            <Text className="text-white text-center font-poppins-bold text-2xl">
              Request Verification Link
            </Text>
          </TouchableOpacity>

          {/* Loading, error, and empty email messages */}
          {loadingMsg && (
            <Text className="text-orange-600 font-poppins-medium text-center pt-2">
              Sending email. Please wait...
            </Text>
          )}
          {errorMsg && (
            <Text className="text-red-600 font-poppins-medium text-center pt-2">
              This email address is not associated with an account.
            </Text>
          )}
          {noEmail && (
            <Text className="text-red-600 font-poppins-medium text-center pt-2">
              Please enter your email address.
            </Text>
          )}

          {/* Button to navigate back to login */}
          <TouchableOpacity onPress={() => router.push('/')} className="mt-4">
            <Text className="text-primary text-center font-poppins-bold text-lg">
              Back to Login
            </Text>
          </TouchableOpacity>
        </View>
      ) : ( // If successMsg is true, show the success message
        <View className="flex-1 justify-center items-center bg-white px-8">
          <MailCheck size={60} strokeWidth={2.25} color="#EB5E28" /> {/* Success icon */}

          {/* Success message */}
          <Text className="text-5xl font-poppins-bold text-black text-center mt-5">
            Email Sent!
          </Text>
          <Text className="text-lg font-poppins-medium text-black text-center mt-2">
            Please check your inbox for the verification link.
          </Text>

          {/* Back to login button */}
          <TouchableOpacity
            onPress={() => router.push('/')}
            className="w-full bg-primary p-4 rounded-lg mt-6"
          >
            <Text className="text-white text-center font-poppins-bold text-2xl">
              Back to Login
            </Text>
          </TouchableOpacity>

          {/* Resend verification link button */}
          <TouchableOpacity
            onPress={() => {
              handleSubmit(); // Resend the email
              setResendDisabled(true); // Disable the button
              setResendTimer(30); // Set a 30-second timer
            }}
            disabled={resendDisabled} // Disable the button if resendDisabled is true
            className={`mt-4 underline text-primary ${resendDisabled ? 'opacity-50' : ''}`} // Adjust style when disabled
          >
            <Text className="text-lg font-poppins">Didn't receive an email? Resend it</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default EmailVerificationForm; // Export the component for use