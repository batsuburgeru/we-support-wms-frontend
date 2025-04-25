import React from 'react';
import EmailResetForm from '@/components/EmailResetForm';

const ForgotPassword = () => {
  // Page-specific data for the forgot password page to be used as props for the EmailResetForm
  const firstDescription = "If you have an existing account, a link will be sent to your inbox with instructions to reset your password.";
  const secondDescription = "Please check your inbox and click the link provided to reset your account password.";
  const buttonText = "Request Reset Link";
  const route = "forgot-password";

  // This page will appear after the user clicks the Forgot Password button in the Login page
  return (
    <div>
        <EmailResetForm
          firstDescription={firstDescription} 
          secondDescription={secondDescription} 
          buttonText={buttonText}
          route={route}
        />
    </div>
  )
}

export default ForgotPassword