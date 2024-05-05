import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UpdatedUserInfo = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId'); // Ensure userId is correct and secure
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    image: null,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/api/user/${userId}`, {
          withCredentials: true,
        });
        const user = response.data.payload;
        setFormData({
          name: user.name,
          address: user.address,
          phone: user.phone,
          image: null, // Initially no image selected
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Could not fetch user data. Please try again later.');
      }
    };

    if (userId) {
      fetchUserData();
    } else {
      toast.error('User ID not found. Please log in again.');
      navigate('/login'); // Redirect to login if no user ID is found
    }
  }, [userId, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      toast.error('User ID not found. Cannot update user.');
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('address', formData.address);
    formDataToSend.append('phone', formData.phone);
    
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    try {
      await axios.put(
        `http://localhost:3002/api/user/${userId}`,
        formDataToSend,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true,
        }
      );
      toast.success('User information updated successfully!');
    //  navigate(`/user-profile/${userId}`); // Navigate to updated user profile
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error updating user';
      toast.error(`Error: ${errorMessage}`);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Update User Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="border rounded w-full p-2"
            required // Make sure fields are required where necessary
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Profile Picture</label>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            className="border rounded w-full p-2"
          />
        </div>
        <div className="mt-6">
          <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatedUserInfo;
