import React from 'react';
import EmailResetForm from '@/components/EmailResetForm';

const VerifyEmail = () => {
  // Page-specific data for the Verify Email form which will be used as props for the EmailResetForm component
  const firstDescription = "The account you just logged in has not been verified yet. Please re-enter your email address to receive the verification link.";
  const secondDescription = "Please check your inbox and click the link provided to verify your account.";
  const buttonText = "Request Verification Link";
  const route = "resend-verification-email";

  // This page appears when the user logs in an account with an unverified email
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

export default VerifyEmail