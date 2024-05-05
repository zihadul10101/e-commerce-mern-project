import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {  toast } from 'react-toastify';


const ResetPassword = () => {
  const { token } = useParams(); 
 // console.log("token",token);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:3002/api/user/reset-password`, // Make sure this endpoint matches your backend
        { password, token }
      );
     //console.log("Datttt",response);
      toast.success("Password has been reset successfully!");
    } catch (error) {
      console.error('Error:', error);
      toast.error("Failed to reset password. Please try again.");
    }
  };

  return (
    <div className="p-40">
      <form onSubmit={handleSubmit} className="space-y-4 font-[sans-serif] text-[#333] max-w-md mx-auto">
        <div className="relative flex items-center">
          <input
            type="password"
            placeholder="Enter New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-3 bg-[#f0f1f2] w-full text-sm border outline-[#007bff] rounded"
            required
          />
        </div>
        <div className="relative flex items-center">
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="px-4 py-3 bg-[#f0f1f2] w-full text-sm border outline-[#007bff] rounded"
            required
          />
        </div>
        <button type="submit" className="px-6 py-2 w-full !mt-8 text-sm font-semibold bg-[#007bff] text-white rounded active:bg-[#006bff]">
          Reset Password
        </button>
      </form>

    </div>
  );
};

export default ResetPassword;
