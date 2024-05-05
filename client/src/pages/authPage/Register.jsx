import React, { useState } from 'react';
import axios from 'axios';
import PageTitle from '../../components/PageTitle';
import { toast } from 'react-toastify';
const Register = () => {

  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    image: null, 
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };


 const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      name: formData.firstName,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      address: formData.address,
      image: formData.image,
    };

    axios
      .post('http://localhost:3002/api/user/process-register', userData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        toast.success('Registration successful! Please check your email for account activation.'); // Success toast
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.message || 'Registration failed';
        toast.error(`Error: ${errorMessage}`); // Error toast
      });
  };

  return (
    <>
      <PageTitle title="Register" />
      <div className="min-w-screen min-h-screen bg-gray-900 flex items-center justify-center px-5 py-5">
        <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden max-w-4xl">
          <div className="md:flex w-full">
            <div className="hidden md:block w-1/2 bg-indigo-500 p-10">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 744.84799 747.07702" className="w-full h-auto">

              </svg>
            </div>
            <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
              <div className="text-center mb-10">
                <h1 className="font-bold text-3xl text-gray-900">REGISTER</h1>
                <p>Enter your information to register</p>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-5">
                    <label className="text-xs font-semibold px-1">Name</label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center flex items-center justify-center pointer-events-none">
                        <i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
                      </div>
                      <input
                        type="text"
                        name="firstName"
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                </div>

                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-5">
                    <label className="text-xs font-semibold px-1">Email</label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center flex items-center justify-center pointer-events-none">
                        <i className="mdi mdi-email-outline text-gray-400 text-lg"></i>
                      </div>
                      <input
                        type="email"
                        name="email"
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                        placeholder="johnsmith@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-5">
                    <label className="text-xs font-semibold px-1">Phone</label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center flex items-center justify-center pointer-events-none">
                        <i className="mdi mdi-phone-outline text-gray-400 text-lg"></i>
                      </div>
                      <input
                        type="text"
                        name="phone"
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                        placeholder="123-456-7890"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-5">
                    <label className="text-xs font-semibold px-1">Address</label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center flex items-center justify-center pointer-events-none">
                        <i className="mdi mdi-map-marker-outline text-gray-400 text-lg"></i>
                      </div>
                      <input
                        type="text"
                        name="address"
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                        placeholder="123 Main St."
                        value={formData.address}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-5">
                    <label className="text-xs font-semibold px-1">Image</label>
                    <div className="flex">
                      <input
                        type="file"
                        name="image"
                        required
                       className="w-full pr-3 border-2 py-2 text-gray-500 font-medium text-sm bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-2 file:px-4 file:mr-4 file:bg-gray-800 file:hover:bg-gray-700 file:text-white rounded-lg"
                        // className="w-full pr-3 py-2 border-2 border-gray-200 rounded-lg outline-none focus:border-indigo-500"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-12">
                    <label className="text-xs font-semibold px-1">Password</label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center flex items-center justify-center pointer-events-none">
                        <i className="mdi mdi-lock-outline text-gray-400 text-lg"></i>
                      </div>
                      <input
                        type="password"
                        name="password"
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                        placeholder="************"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-5">
                    <button
                      type="submit"
                      className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"
                    >
                      REGISTER NOW
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register