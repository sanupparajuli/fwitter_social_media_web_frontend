import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { getUserProfile, updateUserProfile } from "../api/api";
import "./Profile.css";
import profilePic from "../../public/profile.png";

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    bio: "",
    profilePicture: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({ ...user });
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userProfile = await getUserProfile();
        setUser(userProfile);
        setUpdatedProfile(userProfile);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);

  // Handle Profile Update
  const handleUpdate = async () => {
    try {
      await updateUserProfile(updatedProfile);
      setUser(updatedProfile);
      setEditMode(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="profile-container">
      <h2 className="profile-title">Profile Settings</h2>
      
      <div className="profile-card">
        <img src={user.profilePicture || profilePic} alt="Profile" className="profile-pic" />

        {editMode ? (
          <form className="profile-form">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                value={updatedProfile.name}
                onChange={(e) => setUpdatedProfile({ ...updatedProfile, name: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                value={updatedProfile.username}
                onChange={(e) => setUpdatedProfile({ ...updatedProfile, username: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={updatedProfile.email}
                onChange={(e) => setUpdatedProfile({ ...updatedProfile, email: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Bio</label>
              <textarea
                value={updatedProfile.bio}
                onChange={(e) => setUpdatedProfile({ ...updatedProfile, bio: e.target.value })}
              />
            </div>

            <div className="button-group">
              <button type="button" className="save-btn" onClick={handleUpdate}>Save</button>
              <button type="button" className="cancel-btn" onClick={() => setEditMode(false)}>Cancel</button>
            </div>
          </form>
        ) : (
          <div className="profile-details">
            <h3>{user.name}</h3>
            <p className="username">@{user.username}</p>
            <p className="email">{user.email}</p>
            <p className="bio">{user.bio}</p>
            <button className="edit-btn" onClick={() => setEditMode(true)}>Edit Profile</button>
  
          
          </div>
          
        )}
         <div className="profile-details">
            <br></br>
          <button className="edit-btn" onClick={() => navigate(-1)}>← Back</button> 
          </div>
      </div>

      {/* Back Button */}
     
    </div>
  );
};

export default Profile;
