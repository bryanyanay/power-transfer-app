import React from 'react'; //idk why we need this
import { useUser } from '@auth0/nextjs-auth0';

export default function Profile() {
  const { user, error, isLoading } = useUser(); // i believe under the hood userUser sends HTTP get to /api/auth/me

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  // i think user && tests whether the user has been authenticated or not?? 
  // it seems that if we're not authenticated yet user is undefined (falsey), but if we are, user is an object with all the profile info
  return (
    user && ( 
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
  /*
  */
}