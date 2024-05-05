import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink, useLocation } from 'react-router-dom';

const UserProfile = () => {
  const location = useLocation();
  const userId = location.state?.userId; 

  // State variables
  const [userData, setUserData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 
  const [updateData, setUpdateData] = useState({
    name: '',
    address: '',
    phone: '',
  });

  // Fetch user data
  useEffect(() => {
    if (userId) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`http://localhost:3002/api/user/${userId}`, {
            withCredentials: true,
          });
          const user = response?.data?.payload?.user;
          setUserData(user);
          setUpdateData({
            name: user?.name,
            address: user?.address,
            phone: user?.phone,
          });
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching user data:', error);
          setIsLoading(false); 
        }
      };

      fetchUserData();
    }
  }, [userId]);

  // Handle update form submission
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3002/api/user/${userId}`, updateData, {
        withCredentials: true,
      });
      console.log("Data",response);
      if (response?.status === 200) {
        setUserData(response?.data?.payload?.user); // Update the user data
        setIsModalOpen(false); // Close the modal
        setIsLoading(false); // Ensure loading state is reset
      }
    } catch (error) {
      console.error('Error updating user:', error);
      setIsLoading(false); // Reset loading state on error
    }
  };

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
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setIsModalOpen(true)}
            >
              Update User Info
            </button>
          <NavLink to="/updated-password">
          <button
              className="bg-blue-500 ml-5 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
             
            >
              Update Password
            </button>
          </NavLink>

            {/* Modal for updating user info */}
            {isModalOpen && (
              <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-900 bg-opacity-75">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-lg font-bold">Update User Information</h3>
                  <form onSubmit={handleUpdate}>
                    {/* Name Input */}
                    <div className="mt-4">
                      <label className="block text-sm font-bold text-gray-700">Name:</label>
                      <input
                        type="text"
                        value={updateData.name}
                        onChange={(e) => setUpdateData({ ...updateData, name: e.target.value })}
                        className="border rounded px-2 py-1"
                      />
                    </div>

                    {/* Address Input */}
                    <div className="mt-4">
                      <label className="block text-sm font-bold text-gray-700">Address:</label>
                      <input
                        type="text"
                        value={updateData.address}
                        onChange={(e) => setUpdateData({ ...updateData, address: e.target.value })}
                        className="border rounded px-2 py-1"
                      />
                    </div>

                    {/* Phone Input */}
                    <div className="mt-4">
                      <label className="block text-sm font-bold text-gray-700">Phone:</label>
                      <input
                        type="text"
                        value={updateData.phone}
                        onChange={(e) => setUpdateData({ ...updateData, phone: e.target.value })}
                        className="border rounded px-2 py-1"
                      />
                    </div>

                    {/* Submit and Cancel Buttons */}
                    <div className="mt-4 flex justify-between">
                      <button
                        type="submit"
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Update
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsModalOpen(false)} // Close the modal
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default UserProfile;
