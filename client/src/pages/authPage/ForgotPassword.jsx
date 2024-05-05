import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword = () => {
    const [formData, setFormData] = useState({
        email: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.post(
                'http://localhost:3002/api/user/forget-password',
                { email: formData.email }
            );

            toast.success(`An email has been sent to ${formData.email} with instructions to reset your password.`);
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to send password reset email. Please try again later.');
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
                <button type="submit" className="px-6 py-2 w-full !mt-8 text-sm font-semibold bg-[#007bff] text-white rounded active:bg-[#006bff]">
                    Submit
                </button>
            </form>

       
        </div>
    );
};

export default ForgotPassword;
