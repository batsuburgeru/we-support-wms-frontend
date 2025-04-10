import React from 'react';
import EmailResetForm from '@/components/EmailResetForm';

const VerifyEmail = () => {
  const firstDescription = "The account you just logged in has not been verified yet. Please re-enter your email address to receive the verification link.";
  const secondDescription = "Please check your inbox and click the link provided to verify your account.";
  const buttonText = "Request Verification Link";
  const route = "resend-verification-email";

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