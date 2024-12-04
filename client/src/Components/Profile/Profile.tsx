import React, { useEffect, useState } from 'react';
import { fetchCurrentUserId, fetchUserProfile } from '../../utils/listing-utils';

interface Profile {
  name: string;
  email: string;
  profilePicture?: string;
}

const Profile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        // Fetch the current user's ID
        const userId = await fetchCurrentUserId();

        if (!userId) {
          console.error('User is not authenticated.');
          setLoading(false);
          return;
        }

        console.log('User ID:', userId);

        const user = fetchUserProfile(userId);
        setProfile(await user);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile) {
    return <div>User not found or not authenticated.</div>;
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
