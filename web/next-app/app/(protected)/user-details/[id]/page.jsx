import React from 'react';
import UserDetailsPage from '@/components/UserDetailsPage';

const UserDetails = ({ params }) => {
  
  // Serves as the page that renders the User Details page component
  return (
    <UserDetailsPage params={params}/>
  )
}

export default UserDetails