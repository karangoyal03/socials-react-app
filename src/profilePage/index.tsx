import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProfile } from '../userPage/client';
import { Profile } from '../userPage/types';
import './index.css';

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem('userId'); // Ensure userId is stored in localStorage
        if (!userId) {
          navigate('/users');
          return;
        }
        const userProfile = await fetchProfile(userId);
        setProfile(userProfile);
      } catch (error) {
        console.error("Error fetching profile", error);
        navigate('/users');
      }
    };

    fetchData();
  }, [navigate]);

  if (!profile) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="profile-page">
      <header>
        <h1>{profile.username}'s Profile</h1>
      </header>
      <section>
        <h2>Personal Information</h2>
        <p><strong>Username:</strong> {profile.username}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Phone:</strong> {profile.phone}</p>
        <p><strong>Bio:</strong> {profile.bio}</p>
      </section>
      <section>
        <h2>Following</h2>
        <ul>
          {profile.following.map(follow => (
            <li key={follow}>{follow}</li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Followers</h2>
        <ul>
          {profile.followers.map(follower => (
            <li key={follower}>{follower}</li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Bookmarks</h2>
        <ul>
          {profile.bookmarks.map(bookmark => (
            <li key={bookmark}>{bookmark}</li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Comments</h2>
        <ul>
          {profile.comments.map(comment => (
            <li key={comment}>{comment}</li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Reviews</h2>
        <ul>
          {profile.reviews.map(review => (
            <li key={review}>{review}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default ProfilePage;
