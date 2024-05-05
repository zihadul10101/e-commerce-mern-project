import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink, useLocation } from 'react-router-dom';

const UserProfile = () => {
  const location = useLocation();
  const userId = location.state?.userId; 

  // State variables
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 


  // Fetch user data
  useEffect(() => {
    if (userId) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`http://localhost:3002/api/user/${userId}`, {
            withCredentials: true,
          });
          const user = response?.data?.payload?.user;
          console.log("USERdata",user);
          setUserData(user);
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching user data:', error);
          setIsLoading(false); 
        }
      };

      fetchUserData();
    }
  }, [userId]);



  return (
    <div className="px-2 py-4 mt-16 flex flex-col justify-center items-center text-center">
      {isLoading ? ( 
        <p>Loading...</p> 
      ) : (
        <>
          <img
            className="inline-flex object-cover border-4 border-indigo-600 rounded-full shadow-[5px_5px_0_0_rgba(0,0,0,1)]"
            src={userData?.image}
            alt={`${userData?.name}'s profile picture`}
            style={{ height: '12rem', width: '12rem' }} 
          />
          <h1 className="text-2xl text-gray-500 font-bold mt-2">{userData?.name}</h1>
          <h2 className="text-base md:text-xl text-gray-500 font-bold">{userData?.email}</h2>
          <h2 className="text-base md:text-xl text-gray-500 font-bold">{userData?.address}</h2>
          <h2 className="text-base md:text-xl text-gray-500 font-bold">{userData?.phone}</h2>

          {/* Buttons */}
          <div className="mt-4">
          <NavLink to="/updated-user-info">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
             
            >
              Update User Info
            </button>
            </NavLink>
          <NavLink to="/updated-password">
          <button
              className="bg-blue-500 ml-5 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
             
            >
              Update Password
            </button>
          </NavLink>

     
          </div>
        </>
      )}
    </div>
  );
};

export default UserProfile;
