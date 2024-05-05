import axios from 'axios';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';


const UpdatePassword = () => {
    const location = useLocation();
    const userId = location.state?.userId;
    console.log("userId",userId);
    const storedUserId = localStorage.getItem('userId');
    const [userIdToFetch, setUserIdToFetch] = useState(storedUserId || userId);
    console.log("userId", userIdToFetch);
    const [formData, setFormData] = useState({
        email: '',
        oldPassword: '',
        newPassword: '',
        confirmedPassword: ''
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:3002/api/user/updated-password/${userIdToFetch}`, formData, {
                withCredentials: true 
            });
            console.log("response",response.data);
            toast.success(response.data.message);
           

        } catch (error) {
           
            toast.error(`Error: ${error.response.data.message}`);
        }
    };

    return (
        <div className="p-40">
            <form onSubmit={handleSubmit} className="space-y-4 font-[sans-serif] text-[#333] max-w-md mx-auto">
                <div className="relative flex items-center">
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter Email"
                        className="px-4 py-3 bg-[#f0f1f2] w-full text-sm border outline-[#007bff] rounded"
                        required
                    />
                </div>
                <div className="relative flex items-center">
                    <input
                        type="password"
                        name="oldPassword"
                        value={formData.oldPassword}
                        onChange={handleInputChange}
                        placeholder="Old Password"
                        className="px-4 py-3 bg-[#f0f1f2] w-full text-sm border outline-[#007bff] rounded"
                        required
                    />
                </div>
                <div className="relative flex items-center">
                    <input
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                        placeholder="New Password"
                        className="px-4 py-3 bg-[#f0f1f2] w-full text-sm border outline-[#007bff] rounded"
                        required
                    />
                </div>
                <div className="relative flex items-center">
                    <input
                        type="password"
                        name="confirmedPassword"
                        value={formData.confirmedPassword}
                        onChange={handleInputChange}
                        placeholder="Confirm New Password"
                        className="px-4 py-3 bg-[#f0f1f2] w-full text-sm border outline-[#007bff] rounded"
                        required
                    />
                </div>
                <button type="submit" className="px-6 py-2 w-full !mt-8 text-sm font-semibold bg-[#007bff] text-white rounded active:bg-[#006bff]">
                    Submit
                </button>
            </form>
          
        </div>
    );
};

export default UpdatePassword;
