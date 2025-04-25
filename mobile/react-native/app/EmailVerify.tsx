import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { MailCheck } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const EmailVerificationForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<boolean>(false);
  const [loadingMsg, setLoadingMsg] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<boolean>(false);
  const [noEmail, setNoEmail] = useState<boolean>(false);
  const [resendTimer, setResendTimer] = useState<number>(0);
  const [resendDisabled, setResendDisabled] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    if (resendTimer > 0) {
      const interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setResendDisabled(false);
    }
  }, [resendTimer]);

  const handleSubmit = async () => {
    if (!email) {
      setNoEmail(true);
      return;
    }

    setLoadingMsg(true);
    setNoEmail(false);
    setErrorMsg(false);

    try {
      const response = await fetch(`http://192.168.26.52:3002/users/resend-verification-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const result = await response.json();

      if (result?.message) {
        setSuccessMsg(true);
        setLoadingMsg(false);
      } else {
        setErrorMsg(true);
        setLoadingMsg(false);
      }
    } catch (error) {
      console.log('Error:', error);
      setErrorMsg(true);
      setLoadingMsg(false);
    }
  };

  return (
    <View className="flex-1">
      {!successMsg ? (
        <View className="flex-1 justify-center items-center bg-white px-8">
          <Image
            source={require('../assets/images/logo.png')}
            className="w-40 h-40 mb-8"
            resizeMode="contain"
          />
          <Text className="text-5xl font-poppins-bold text-black text-center mb-4">Email Verification</Text>
          <Text className="text-lg font-poppins-medium text-black text-center mb-4">
            Enter your email address to receive a verification link.
          </Text>

          <View className="w-full">
            <Text className="text-lg font-poppins text-primary mb-1">Email</Text>
            <TextInput
              className="w-full h-12 bg-tabs px-3 pb-2 rounded-lg text-xl"
              placeholder="Enter your email"
              placeholderTextColor="#A9A9A9"
              value={email}
              onChangeText={(value) => setEmail(value)}
              keyboardType="email-address"
            />
          </View>

          <TouchableOpacity
            className={`w-full bg-primary p-4 rounded-lg mt-6 ${loadingMsg ? 'opacity-50' : ''}`}
            onPress={handleSubmit}
            disabled={loadingMsg}
          >
            <Text className="text-white text-center font-poppins-bold text-2xl">
              Request Verification Link
            </Text>
          </TouchableOpacity>

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

          <TouchableOpacity onPress={() => router.push('/')} className="mt-4">
            <Text className="text-primary text-center font-poppins-bold text-lg">
              Back to Login
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View className="flex-1 justify-center items-center bg-white px-8">
          <MailCheck size={60} strokeWidth={2.25} color="#EB5E28" />

          <Text className="text-5xl font-poppins-bold text-black text-center mt-5">
            Email Sent!
          </Text>
          <Text className="text-lg font-poppins-medium text-black text-center mt-2">
            Please check your inbox for the verification link.
          </Text>

          <TouchableOpacity
            onPress={() => router.push('/')}
            className="w-full bg-primary p-4 rounded-lg mt-6"
          >
            <Text className="text-white text-center font-poppins-bold text-2xl">
              Back to Login
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              handleSubmit();
              setResendDisabled(true);
              setResendTimer(30);
            }}
            disabled={resendDisabled}
            className={`mt-4 underline text-primary ${resendDisabled ? 'opacity-50' : ''}`}
          >
            <Text className="text-lg font-poppins">Didn't receive an email? Resend it</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default EmailVerificationForm;