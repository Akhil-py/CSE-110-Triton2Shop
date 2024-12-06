// client/src/Components/Profile/Profile.tsx
import React, { useEffect, useState } from 'react';

interface Profile {
  profilePicture?: string;
  name: string;
  email: string;
}

const Profile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    fetch('/profile', {
      credentials: 'include'
    })
      .then(response => response.json())
      .then(data => setProfile(data))
      .catch(error => console.error('Error fetching profile:', error));
  }, []);

  if (!profile) {
    return <div>Hmm we encountered a problem...</div>;
  }

  return (
    <div>
      <h1>Profile</h1>
      {profile.profilePicture && <img src={profile.profilePicture} alt="Profile" />}
      <p>Name: {profile.name}</p>
      <p>Email: {profile.email}</p>
    </div>
  );
};

export default Profile;