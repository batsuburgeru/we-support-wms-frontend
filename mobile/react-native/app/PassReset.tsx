import React, { useState, useEffect } from 'react'; 
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'; 
import { MailCheck } from 'lucide-react-native'; // Importing an SVG icon
import { useRouter } from 'expo-router'; // Navigation hook for routing

// Interface for defining expected props (not used explicitly but demonstrates flexibility for reusability)
interface EmailResetFormProps {
  route: string;
  firstDescription: string;
  secondDescription: string;
  buttonText: string;
}

// Functional component for the email reset form
const EmailResetForm: React.FC<EmailResetFormProps> = () => {
  // States for managing email input, messages, loading, and timers
  const [email, setEmail] = useState<string>(''); // Tracks the entered email
  const [successMsg, setSuccessMsg] = useState<boolean>(false); // Indicates if the email was sent successfully
  const [loadingMsg, setLoadingMsg] = useState<boolean>(false); // Indicates if a request is in progress
  const [errorMsg, setErrorMsg] = useState<boolean>(false); // Indicates if an error occurred
  const [noEmail, setNoEmail] = useState<boolean>(false); // Indicates if the email field is empty
  const [resendTimer, setResendTimer] = useState<number>(0); // Timer for resend functionality
  const [resendDisabled, setResendDisabled] = useState<boolean>(false); // Indicates if the resend button is disabled

  const router = useRouter(); // For navigation between screens

  // Effect for handling the countdown timer for resending emails
  useEffect(() => {
    if (resendTimer > 0) {
      const interval = setInterval(() => {
        setResendTimer((prev) => prev - 1); // Decrease the timer by 1 every second
      }, 1000);
      return () => clearInterval(interval); // Clear the interval to prevent memory leaks
    } else {
      setResendDisabled(false); // Enable the resend button once the timer hits 0
    }
  }, [resendTimer]);

  // Function to handle the submission of the email reset request
  const handleSubmit = async () => {
    if (!email) { // If email field is empty
      setNoEmail(true); // Show "no email" error message
      return;
    }

    // Reset states and show the loading message
    setLoadingMsg(true);
    setNoEmail(false);
    setErrorMsg(false);

    try {
      // API request to send the password reset email
      const response = await fetch(`http://192.168.1.22:3002/users/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Indicate JSON content
        },
        body: JSON.stringify({ email }), // Send the email in the request body
      });

      const result = await response.json(); // Parse the server response

      if (result?.message) { // If the response contains a success message
        setSuccessMsg(true); // Show success message
        setLoadingMsg(false); // Hide loading
      } else {
        setErrorMsg(true); // Show error message if the server response is not as expected
        setLoadingMsg(false);
      }
    } catch (error) {
      console.log('Error:', error); // Log any errors that occur during the request
      setErrorMsg(true); // Show error message
      setLoadingMsg(false); // Hide loading
    }
  };

  return (
    <View className="flex-1">
      {!successMsg ? ( // If the email was not successfully sent, show the form
        <View className="flex-1 justify-center items-center bg-white px-8">
          {/* Display the logo */}
          <Image
            source={require('../assets/images/logo.png')} // Path to the logo file
            className="w-40 h-40 mb-4"
            resizeMode="contain" // Maintain the aspect ratio of the image
          />
          {/* Header text */}
          <Text className="text-5xl font-poppins-bold text-black text-center my-8">Password Reset</Text>
          <Text className="text-lg font-poppins-medium text-black text-center mb-4">
            Enter your email address to receive a password reset link.
          </Text>

          {/* Email input field */}
          <View className="w-full">
            <Text className="text-lg font-poppins text-primary mb-1">Email</Text>
            <TextInput
              className="w-full h-12 bg-tabs px-3 pb-2 rounded-lg text-xl" // Input styling
              placeholder="Enter your email" // Placeholder text
              placeholderTextColor="#A9A9A9" // Placeholder text color
              value={email} // Bind to the email state
              onChangeText={(value) => setEmail(value)} // Update email state on input
              keyboardType="email-address" // Set keyboard type to email
            />
          </View>

          {/* Submit button */}
          <TouchableOpacity
            className={`w-full bg-primary p-4 rounded-lg mt-6 ${loadingMsg ? 'opacity-50' : ''}`} // Adjust button style when loading
            onPress={handleSubmit} // Trigger form submission
            disabled={loadingMsg} // Disable button while loading
          >
            <Text className="text-white text-center font-poppins-bold text-2xl">
              Request Reset Link
            </Text>
          </TouchableOpacity>

          {/* Loading message */}
          {loadingMsg && (
            <Text className="text-orange-600 font-poppins-medium text-center pt-2">
              Sending email. Please wait...
            </Text>
          )}
          {/* Error message */}
          {errorMsg && (
            <Text className="text-red-600 font-poppins-medium text-center pt-2">
              This email address is not associated with an account.
            </Text>
          )}
          {/* Empty email error message */}
          {noEmail && (
            <Text className="text-red-600 font-poppins-medium text-center pt-2">
              Please enter your email address.
            </Text>
          )}

          {/* Navigate back to login */}
          <TouchableOpacity onPress={() => router.push('/')} className="mt-4">
            <Text className="text-primary text-center font-poppins-bold text-lg">
              Back to Login
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        // If the email was successfully sent, show a success message
        <View className="flex-1 justify-center items-center bg-white px-8">
          <MailCheck size={60} strokeWidth={2.25} color="#EB5E28" /> {/* Success icon */}

          {/* Success header */}
          <Text className="text-5xl font-poppins-bold text-black text-center mt-5">
            Email Sent!
          </Text>
          <Text className="text-lg font-poppins-medium text-black text-center mt-2">
            Please check your inbox for the password reset link.
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

          {/* Resend email button */}
          <TouchableOpacity
            onPress={() => {
              handleSubmit(); // Resend the email
              setResendDisabled(true); // Disable the button
              setResendTimer(30); // Set the timer to 30 seconds
            }}
            disabled={resendDisabled} // Disable the button while the timer is active
            className={`mt-4 underline text-primary ${resendDisabled ? 'opacity-50' : ''}`} // Style adjustment when disabled
          >
            <Text className="text-lg font-poppins">Didn't receive an email? Resend it</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default EmailResetForm; // Export the component for use